import React from 'react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import './SidebarLayout.scss';

export const SidebarLayout: React.FC<ISidebarLayout> = ({ children, header, sidebar }) => {
  const sidebars = sidebar ?? <Sidebar />;
  const headers = header ?? <Header />;
  return (
    <div className="sidebar-layout">
      <div className="sidebar-layout__header">{headers}</div>
      <div className="sidebar-layout__container">
        <div className="sidebar-layout__left">{sidebars}</div>
        <div className="sidebar-layout__center">{children}</div>
      </div>
    </div>
  );
};
