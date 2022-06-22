import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgBell, SvgSearch } from '../../assets/svg';
import { ImageDefaultAvatar, ImageLogo } from '../../constants/images';
import { logout } from '../../helpers';
import { useAppSelector } from '../../redux';
import { AvatarUser, Dropdown } from '../common';
import './Header.scss';

export const Header = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__logo" onClick={() => navigate('/')}>
        <img src={ImageLogo} />
      </div>
      <div className="header__right">
        {/* <div className="header__search">
          <SvgSearch />
          <input placeholder="Tim kiem..." />
        </div>
        <div className="header__bell">
          <SvgBell />
        </div> */}
        {/* <div onClick={logout}>Log out</div> */}
        <div className="header__user">
          <AvatarUser img={user.picture} />
          <Dropdown options={[{ text: 'Đăng xuất', cb: logout }, { text: 'Hồ sơ' }]}>
            <p>{user?.name}</p>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
