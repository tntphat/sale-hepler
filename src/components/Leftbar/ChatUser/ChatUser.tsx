import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ChatUser.scss';
import defaultAvatar from '../../../assets/images/default-user-image.png';

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
  console.log(selectedChat);
  const isSelectedChat: boolean = selectedChat && selectedChat === conversation.id ? true : false;
  const onClick = () => {
    onSelectChat(threadId);
  };

  return (
    <div className="chat-list-item">
      <li className={isSelectedChat ? 'active' : ''} onClick={onClick}>
        <Link to="#" className={'unread-msg-user'}>
          <div className="chat-item">
            <div className="chat-item__img">
              {avatar ? (
                <img src={avatar} className="avatar" />
              ) : (
                <img src={defaultAvatar} className="avatar" />
              )}
            </div>
            <div className="chat-item__fullname">
              <p>{name}</p>
            </div>
          </div>
        </Link>
      </li>
    </div>
  );
};
