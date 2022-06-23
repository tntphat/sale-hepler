import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgBell, SvgSearch } from '../../../assets/svg';
import { ImageDefaultAvatar, ImageLogo } from '../../../constants/images';
import { logout } from '../../../helpers';
import { AvatarUser, Dropdown } from '../../common';
export const HeaderAdmin = () => {
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
        </div> */}
        <div className="header__bell">
          <SvgBell />
        </div>
        {/* <div onClick={logout}>Log out</div> */}
        <div className="header__user">
          <AvatarUser />
          <Dropdown options={[{ text: 'Đăng xuất', cb: logout }, { text: 'Hồ sơ' }]}>
            <p>Admin</p>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
