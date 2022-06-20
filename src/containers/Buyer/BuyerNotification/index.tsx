import React, { useEffect, useState } from 'react';
import { Box } from '../../../components/common';
import { convertFullTime, handleLinkToFbPost } from '../../../helpers';
import { apiBuyerNotification } from '../../../services/api';
import './BuyerNotification.scss';

export const BuyerNotification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<any>(null);
  const [hasNextPage, setHasNextPage] = useState<any>(null);

  useEffect(() => {
    apiBuyerNotification.getAllNotifications().then((res) => {
      const pagination = res.data.data.pagination;
      const hasNextPage = pagination.hasNextPage;
      setHasNextPage(hasNextPage);
      hasNextPage && setNextPage(pagination.nextPage);
      setNotifications(res.data.data.notifications);
    });
  }, []);

  const handleMarkReadAll = () => {
    apiBuyerNotification.markReadAllNotifications().then((res) => {
      const noties = notifications.map((noti) => {
        return {
          ...noti,
          isRead: true,
        };
      });
      setNotifications(noties);
    });
  };

  const handleGetPageNotification = () => {
    apiBuyerNotification.getPageNotification(nextPage).then((res) => {
      const pagination = res.data.data.pagination;
      const hasNextPage = pagination.hasNextPage;
      setHasNextPage(hasNextPage);
      hasNextPage && setNextPage(pagination.nextPage);
      setNotifications([...notifications, ...res.data.data.notifications]);
    });
  };

  const handleReadNotifications = (item: any) => {
    const payload = {
      notificationId: item._id,
    };
    handleLinkToFbPost(item.data.id);
    apiBuyerNotification.markReadNotification(payload);
    const noties = notifications.map((noti) => {
      return noti._id === item._id
        ? {
            ...noti,
            isRead: true,
          }
        : noti;
    });
    setNotifications(noties);
  };

  return (
    <Box title="Thông báo" maxWidth={650}>
      {notifications.length === 0 ? (
        <p>Không có thông báo</p>
      ) : (
        <div
          className="noti__mark-read "
          onClick={() => {
            handleMarkReadAll();
          }}
        >
          <p>Đánh dấu đã đọc</p>
        </div>
      )}
      {notifications.map((item, index) => (
        <div
          onClick={() => {
            handleReadNotifications(item);
          }}
          className={`noti ${item.isRead ? '' : 'noti--active'}`}
          key={index}
        >
          <img src={item.data.from?.picture || ''} />
          <div className="noti__detai">
            <p>
              <b>{item.data.from?.name}</b> đã thêm bài viết trong <b>{item.data.groupInfo.name}</b>{' '}
              có chứa từ khóa bạn quan tâm
            </p>
            <span>{convertFullTime(item.data.created_time)}</span>
          </div>
        </div>
      ))}
      {hasNextPage ? (
        <div
          className="noti__mark-read "
          onClick={() => {
            handleGetPageNotification();
          }}
        >
          <p>Xem thêm</p>
        </div>
      ) : null}
    </Box>
  );
};
