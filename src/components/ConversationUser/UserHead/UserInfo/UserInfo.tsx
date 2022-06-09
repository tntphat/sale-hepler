import React from 'react';
import { Link } from 'react-router-dom';

import './UserInfo.scss';
import defaultAvatar from '../../../../assets/images/default-user-image.png';

interface ProfileImageProps {
  chatUserDetails: any;
}

export const UserInfo = ({ chatUserDetails }: ProfileImageProps) => {
  const name = chatUserDetails?.name;
  const avatar = chatUserDetails?.data?.url;

  return (
    <div className="user-info">
      {avatar ? (
        <img src={avatar} className="user-info__avatar avatar" alt="" />
      ) : (
        <img src={defaultAvatar} className="avatar" />
      )}
      {/* <span className="user-info__name"> */}
      <Link to="#" className="user-info__name">
        {name}
      </Link>
      {/* </span> */}
    </div>
  );
};
