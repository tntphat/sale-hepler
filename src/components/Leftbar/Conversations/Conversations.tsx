import React, { useEffect } from 'react';
import { ChatUser } from '../ChatUser/ChatUser';

interface ConversationsProp {
  conversations: any;
  selectedChat: string | number | null;
  onSelectChat: (id: string | number) => void;
}

export const Conversations = ({ conversations, selectedChat, onSelectChat }: ConversationsProp) => {
  useEffect(() => {
    if (conversations) {
      const lastestConversation = conversations[0];
      console.log(lastestConversation);
    }
    // dispatch(changeSelectedChat(lastestConversation));
  }, []);

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
