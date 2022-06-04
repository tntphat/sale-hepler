import React from 'react';
import { Link } from 'react-router-dom';

import './UserInfo.scss';

interface ProfileImageProps {
  chatUserDetails: any;
}

export const UserInfo = ({ chatUserDetails }: ProfileImageProps) => {
  const name = chatUserDetails?.name;
  const avatar = chatUserDetails?.data?.url;

  return (
    <div className="user-info">
      <img src={avatar} className="user-info__avatar avatar" alt="" />
      <span className="user-info__name">
        <Link to="#" className="">
          {name}
        </Link>
      </span>
    </div>
  );
};
