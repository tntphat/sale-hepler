import React, { useEffect, useState } from 'react';
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
  // const { pageId } = useAppSelector((state) => state.pageSlice);
  const pageId = '110681441599820';
  const [inputSearch, setInputSearch] = useState<string>('');
  const baseURL = process.env.URL_MESSAGE + '';
  const socket = io(baseURL);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllConversations(pageId));
  }, []);

  useEffect(() => {
    setConversations(directMessages);
  }, [directMessages]);

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

  const handleSearchChange = (e: any) => {
    setInputSearch(e.target.value);
    const data = directMessages.filter((data: any) =>
      data.participants.data[0].name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setConversations(data);
  };

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
        <div className="search-box__input">
          <SvgSearch />
          <input onChange={handleSearchChange} value={inputSearch} placeholder="Tìm kiếm..." />
        </div>
      </div>

      <Scrollbar classname="scrollbar__chat-list chat-room-list">
        <Conversations
          conversations={conversations}
          selectedChat={selectedChat}
          onSelectChat={onSelectChat}
        />
      </Scrollbar>
    </div>
  );
};
