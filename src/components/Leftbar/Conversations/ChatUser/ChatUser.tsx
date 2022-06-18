import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ChatUser.scss';
import defaultAvatar from '../../../../assets/images/default-user-image.png';
import { SvgDot } from '../../../../assets/svg';

interface ChatUserProps {
  conversation: any;
  selectedChat: string | number | null;
  onSelectChat: (id: number | string) => void;
}

export const ChatUser = ({ conversation, selectedChat, onSelectChat }: ChatUserProps) => {
  const userInfo = conversation.participants.data[0];
  const avatar = userInfo.data?.url;
  const name = userInfo.name;
  const threadId = conversation.id;
  const isSelectedChat: boolean = selectedChat && selectedChat === conversation.id ? true : false;
  const onClick = () => {
    onSelectChat(threadId);
  };
  const isRead = conversation.isRead;

  return (
    <div className="chat-list-item">
      <li className={isSelectedChat ? 'active' : ''} onClick={onClick}>
        <Link to="#" className={'unread-msg-user'}>
          <div className="chat-item">
            <div className="chat-item__info">
              <div className="chat-item__img">
                {avatar ? (
                  <img src={avatar} className="avatar" />
                ) : (
                  <img src={defaultAvatar} className="avatar" />
                )}
              </div>
              <div
                className={`${!isRead ? 'chat-item__fullname--bold' : ''}  chat-item__fullname `}
              >
                <p>{name}</p>
              </div>
            </div>
            <div
              className={`${isRead ? 'chat-item__unread-sign--hide ' : ''} chat-item__unread-sign`}
            >
              <SvgDot />
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
};
