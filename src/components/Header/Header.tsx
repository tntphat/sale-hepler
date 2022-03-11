import React from 'react';
import { SvgBell, SvgSearch } from '../../assets/svg';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">LOGO</div>
      <div className="header__right">
        <div className="header__search">
          <SvgSearch />
          <input placeholder="Tim kiem..." />
        </div>
        <div className="header__bell">
          <SvgBell />
        </div>
        <div className="header__user">
          <img src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg" />
          <p>Phat To</p>
        </div>
      </div>
    </div>
  );
};
