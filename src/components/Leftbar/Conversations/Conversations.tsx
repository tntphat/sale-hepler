import React, { useEffect } from 'react';
import { ChatUser } from './ChatUser/ChatUser';

interface ConversationsProp {
  conversations: any;
  selectedChat: string | number | null;
  onSelectChat: (id: string | number) => void;
}

export const Conversations = ({ conversations, selectedChat, onSelectChat }: ConversationsProp) => {
  return (
    <>
      <div className="">
        <ul className="">
          {(conversations || []).map((conversation: any, key: number) => (
            <ChatUser
              conversation={conversation}
              key={key}
              selectedChat={selectedChat}
              onSelectChat={onSelectChat}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
