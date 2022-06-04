import React from 'react';
import { Link } from 'react-router-dom';
import { SvgMark, SvgMarkDone, SvgMarkUnread, SvgReport } from '../../../assets/svg';
import { UserInfo } from './UserInfo/UserInfo';
import './UserHead.scss';

interface UserHeadProps {
  chatUserDetails: any;
}

export const UserHead = ({ chatUserDetails }: UserHeadProps) => {
  return (
    <div className="chat-header">
      <div className="chat-header__info">
        <UserInfo chatUserDetails={chatUserDetails} />
      </div>
      <div className="chat-header__action">
        <ul className="chat-header__item-list list-inline user-chat-nav text-end mb-0">
          <li className="chat-header__item">
            <SvgReport />
          </li>
          <li className="chat-header__item">
            <SvgMark />
          </li>
          <li className="chat-header__item">
            <SvgMarkUnread />
          </li>
          <li className="chat-header__item">
            <SvgMarkDone />
          </li>
        </ul>
      </div>
    </div>
  );
};
