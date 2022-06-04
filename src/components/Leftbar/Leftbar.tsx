import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { SvgSearch, SvgSetting } from '../../assets/svg';
import { useAppSelector } from '../../redux';
import { Conversations } from './Conversations/Conversations';
import {
  getAllConversations,
  getChatUserConversations,
  changeSelectedChat,
} from '../../redux/slice/apiSlice/messagesSlice';
import './Leftbar.scss';
import { Scrollbar } from '../common/Srollbar/Scrollbar';

export const Leftbar = () => {
  const dispatch = useDispatch();
  const { directMessages, selectedChat } = useAppSelector((state) => state.messagesSlice);
  const { data } = directMessages;
  const socket = io('https://social-sales-helper.herokuapp.com/');

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch]);

  // useEffect(() => {
  //   if (directMessages) {
  //     const lastestConversation = directMessages[0];
  //     console.log(lastestConversation);
  //   }
  //   // dispatch(changeSelectedChat(lastestConversation));
  // }, []);

  const onSelectChat = (id: string | number) => {
    dispatch(getChatUserConversations(id));
    dispatch(changeSelectedChat(id));
  };

  useEffect(() => {
    socket.on('get message', (data) => {
      dispatch(getAllConversations());
    });
  }, [socket]);

  return (
    <div className="left-bar">
      <div className="search-box">
        <div className="search-box__header">
          <h4 className="search-box__title ">Hộp thư</h4>
          <SvgSetting />
        </div>
        <form>
          <div className="search-box__input">
            <SvgSearch />
            <input placeholder="Tìm kiếm..." />
          </div>
        </form>
      </div>

      <Scrollbar classname="scrollbar__chat-list chat-room-list">
        <Conversations
          conversations={data}
          selectedChat={selectedChat}
          onSelectChat={onSelectChat}
        />
      </Scrollbar>
    </div>
  );
};
