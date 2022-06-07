import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarBuyer } from '../../components/buyer';
import { Header } from '../../components/Header/Header';
import './BuyerLayout.scss';

export const BuyerLayout: React.FC<ISidebarLayout> = ({ children, header, sidebar }) => {
  const sidebars = sidebar ?? <SidebarBuyer />;
  const headers = header ?? <Header />;
  return (
    <div className="buyer-layout">
      <div className="buyer-layout__header">{headers}</div>
      <div className="buyer-layout__container">
        <div className="buyer-layout__left">{sidebars}</div>
        <div className="buyer-layout__center">{children}</div>
      </div>
    </div>
  );
};
