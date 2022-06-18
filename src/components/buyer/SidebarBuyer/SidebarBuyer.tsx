import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dataSidebarBuyer } from '../../../constants';
import { logout } from '../../../helpers';
import { useAppSelector } from '../../../redux';
import { AvatarUser, Box } from '../../common';
import './SidebarBuyer.scss';

const ItemSidebar: React.FC<{ item: any; handleNavToLink: any }> = ({ item, handleNavToLink }) => {
  const location = useLocation();
  return (
    <div className="sidebar__item">
      <div
        className={`sidebar__link ${'/buyer' + item.link === location.pathname ? 'active' : ''}`}
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
    </div>
  );
};

export const SidebarBuyer = () => {
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
          <ItemSidebar item={item} key={ind} handleNavToLink={handleNavToLink} />
        ))}
      </Box>
    </div>
  );
};
