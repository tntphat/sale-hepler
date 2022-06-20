import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarAdmin } from '../../components/admin';
import { Header } from '../../components/Header/Header';
import './AdminLayout.scss';

export const AdminLayout: React.FC<ISidebarLayout> = ({ children, header, sidebar }) => {
  const sidebars = sidebar ?? <SidebarAdmin />;
  const headers = header ?? <Header />;
  return (
    <div className="admin-layout">
      <div className="admin-layout__header">{headers}</div>
      <div className="admin-layout__container">
        <div className="admin-layout__left">{sidebars}</div>
        <div className="admin-layout__center">{children}</div>
      </div>
    </div>
  );
};
