import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dataSidebarAdmin, dataSidebarBuyer } from '../../../constants';
import { logout } from '../../../helpers';
import { useAppSelector } from '../../../redux';
import { AvatarUser, Box } from '../../common';
import './SidebarAdmin.scss';

const ItemSidebar: React.FC<{ item: any; handleNavToLink: any }> = ({ item, handleNavToLink }) => {
  const location = useLocation();
  return (
    <div className="sidebar__item">
      <div
        className={`sidebar__link ${'/admin' + item.link === location.pathname ? 'active' : ''}`}
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

export const SidebarAdmin = () => {
  const navigate = useNavigate();
  const handleNavToLink = (link: string, sublink?: string) => {
    navigate('/admin' + link);
  };

  return (
    <div className="sidebar-admin">
      {dataSidebarAdmin.map((item, ind) => (
        <ItemSidebar item={item} key={ind} handleNavToLink={handleNavToLink} />
      ))}
    </div>
  );
};
