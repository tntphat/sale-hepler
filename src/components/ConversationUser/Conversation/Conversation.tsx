import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import { Message } from './Message/Message';
import './Conversation.scss';
import { Scrollbar } from '../../common/Srollbar/Scrollbar';
import { useAppSelector } from '../../../redux';
import { getChatUserConversations } from '../../../redux/slice/apiSlice/messagesSlice';
import { useDispatch } from 'react-redux';
import { ModalLoading } from '../../common/Modal';

interface ConversationProps {
  chatUserConversations: any;
  chatUserDetails: any;
}

export const Conversation = ({ chatUserConversations, chatUserDetails }: ConversationProps) => {
  const dispatch = useDispatch();
  const { isMessageSent, selectedChat, loading } = useAppSelector((state) => state.messagesSlice);
  const { myInfo } = useAppSelector((state) => state.messagesSlice);
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement | any>(null);
  const socket = io('https://social-sales-helper.herokuapp.com/');

  useEffect(() => {
    dispatch(getChatUserConversations(selectedChat));
  }, [isMessageSent]);

  useEffect(() => {
    const conversations = chatUserConversations?.data;
    if (conversations) {
      const reverseMessage = [...conversations].reverse();
      setMessages(reverseMessage);
    }
  }, [chatUserConversations.data]);

  useEffect(() => {
    socket.on('get message', (data) => {
      dispatch(getChatUserConversations(selectedChat));
    });
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      {loading ? (
        <Scrollbar classname="scrollbar__conversation">
          <ModalLoading isSmall={true} isOpen={loading} isBlue={true} />
        </Scrollbar>
      ) : (
        <Scrollbar classname="scrollbar__conversation">
          <ul className="conversation">
            {(messages || []).map((message: MessageType, key: number) => {
              return (
                <div className="message" key={key} ref={scrollRef}>
                  <Message message={message} chatUserDetails={chatUserDetails} myInfo={myInfo} />
                </div>
              );
            })}
          </ul>
        </Scrollbar>
      )}
    </>
  );
};
