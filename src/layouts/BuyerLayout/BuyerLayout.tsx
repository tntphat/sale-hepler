import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SidebarBuyer } from '../../components/buyer';
import { Header } from '../../components/Header/Header';
import { Notification } from '../../components/Notification/Notification';
import { useAppSelector } from '../../redux';
import './BuyerLayout.scss';

export const BuyerLayout: React.FC<ISidebarLayout> = ({ children, header, sidebar }) => {
  const [list, setList] = useState<any[]>([]);
  const [noti, setNoti] = useState<any>(null);
  const { user } = useAppSelector((state) => state.authSlice);
  const sidebars = sidebar ?? <SidebarBuyer noti={noti} />;
  const headers = header ?? <Header />;
  let toastProperties: any = null;

  const showToast = (title: string, description: string) => {
    toastProperties = {
      id: list.length + 1,
      title: title,
      description: description,
    };
    setList((pre) => [...pre, toastProperties]);
  };
  const baseURL =
    (process.env.NODE_ENV === 'development' ? process.env.URL_API_LOCAL : process.env.URL_API) + '';
  const socket = io(baseURL);
  const receiveNotifications = useCallback(() => {
    if (user.id) {
      socket.on('interesting post', (data) => {
        console.log(data);
        if (data.userId === user.id && data.posts[0]) {
          const noti = data.posts;
          const poster = noti[0].from?.name || '';
          const group = noti[0].groupInfo.name || '';
          const description =
            poster + ' đã thêm bài viết trong ' + group + ' chứa từ khóa bạn quan tâm';
          showToast('Bài viết mới', description);
          setNoti(data);
        }
      });
    }
  }, [user.id]);

  useEffect(() => {
    receiveNotifications();
  }, [receiveNotifications]);

  return (
    <>
      <div className="buyer-layout">
        <div className="buyer-layout__header">{headers}</div>
        <div className="buyer-layout__container">
          <div className="buyer-layout__left">{sidebars}</div>
          <div className="buyer-layout__center">{children}</div>
        </div>
        <Notification toastlist={list} setList={setList} />
      </div>
    </>
  );
};
