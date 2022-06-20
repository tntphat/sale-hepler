import React from 'react';
import { Header } from '../../components/Header/Header';
import './HeaderLayout.scss';

export const HeaderLayout: React.FC<ISidebarLayout> = ({ children, header }) => {
  const headers = header ?? <Header />;
  return (
    <div className="header-layout">
      <div className="header-layout__header">{headers}</div>
      <div className="header-layout__container">
        <div className="header-layout__center">{children}</div>
      </div>
    </div>
  );
};
