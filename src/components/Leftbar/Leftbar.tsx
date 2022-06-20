import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';

import { SvgDot, SvgSearch, SvgSetting } from '../../assets/svg';
import { useAppSelector } from '../../redux';
import { Conversations } from './Conversations/Conversations';
import {
  getAllConversations,
  getChatUserConversations,
  changeSelectedChat,
  toggleLoadingConversation,
} from '../../redux/slice/apiSlice/messagesSlice';
import './Leftbar.scss';
import { Scrollbar } from '../common/Srollbar/Scrollbar';
import { apiMessages } from '../../services/api';

export const Leftbar = () => {
  const dispatch = useDispatch();
  const { directMessages, selectedChat, unSeen } = useAppSelector((state) => state.messagesSlice);
  const { pageId } = useAppSelector((state) => state.pageSlice);
  // const pageId = '110681441599820';
  const data = directMessages;
  const baseURL =
    (process.env.NODE_ENV === 'development' ? process.env.URL_API_LOCAL : process.env.URL_API) + '';
  const socket = io(baseURL);

  useEffect(() => {
    dispatch(getAllConversations(pageId));
  }, []);

  useEffect(() => {
    let allConversations: any[] = [];
    apiMessages.getAllConversations(pageId).then((res) => {
      allConversations = [...res.data.data];
      const firstConversation = allConversations[0]?.id;
      dispatch(changeSelectedChat(firstConversation));
    });
  }, []);

  const onSelectChat = (id: string | number) => {
    const selectChat = async () => {
      dispatch(changeSelectedChat(id));
      dispatch(toggleLoadingConversation());
      await dispatch(getChatUserConversations(id));
      dispatch(toggleLoadingConversation());
    };

    selectChat();
  };

  useEffect(() => {
    if (pageId) {
      socket.on('get message', (data) => {
        if (data.recipientId === pageId) {
          dispatch(getAllConversations(pageId));
        }
      });
      return () => {
        socket.off('get message');
      };
    }
  }, [pageId]);

  return (
    <div className="left-bar">
      <div className="search-box">
        <div className="search-box__header">
          <div className="search-box__title-wrapper">
            <h4 className="search-box__title ">Hộp thư</h4>
            {unSeen ? <SvgDot /> : <></>}
          </div>
          <Link to="/messenger-setting">
            <SvgSetting />
          </Link>
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
