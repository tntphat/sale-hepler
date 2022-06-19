import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SvgDot } from '../../../assets/svg';
import { dataSidebarBuyer } from '../../../constants';
import { logout } from '../../../helpers';
import { useAppSelector } from '../../../redux';
import { apiBuyerNotification } from '../../../services/api';
import { AvatarUser, Box } from '../../common';
import './SidebarBuyer.scss';

const ItemSidebar: React.FC<{ item: any; handleNavToLink: any; noti: any }> = ({
  item,
  handleNavToLink,
  noti,
}) => {
  const location = useLocation();
  const [unSeen, setUnSeen] = useState<boolean>(false);

  useEffect(() => {
    apiBuyerNotification.getAllNotifications().then((res) => {
      const notifications = res.data.data.notifications;
      console.log('noticcc: ', notifications);
      const isUnSeen = notifications.some((notification: any) => {
        return notification.isRead === false;
      });
      console.log('isUnSeen: ', isUnSeen);
      isUnSeen && setUnSeen(true);
    });
  }, [noti]);

  return (
    <div className="sidebar-buyer__item">
      <div
        className={`sidebar-buyer__link ${
          '/buyer' + item.link === location.pathname ? 'active' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <>{item.icon()}</>
        <span
          onClick={(e) => {
            handleNavToLink(item.link);
            e.stopPropagation();
          }}
        >
          {item.title}
        </span>
      </div>
      {unSeen && item.title === 'Thông báo' ? (
        <div className="sidebar-buyer__unseen">
          <SvgDot />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export const SidebarBuyer = ({ noti }: { noti: any }) => {
  const navigate = useNavigate();
  const handleNavToLink = (link: string, sublink?: string) => {
    navigate('/buyer' + link);
  };
  const { user } = useAppSelector((state) => state.authSlice);

  return (
    <div className="sidebar-buyer">
      <Box classname="sidebar-top">
        <p>Facebook Account</p>
        <AvatarUser img={user?.picture} />
        <p>{user?.name}</p>
        <span onClick={logout}>Log out</span>
      </Box>
      <Box marginTop={20}>
        {dataSidebarBuyer.map((item, ind) => (
          <ItemSidebar item={item} key={ind} handleNavToLink={handleNavToLink} noti={noti} />
        ))}
      </Box>
    </div>
  );
};
