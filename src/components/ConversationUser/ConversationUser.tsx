import React from 'react';

import { useAppSelector } from '../../redux';
import { ChatInput } from './Conversation/ChatInputSection/ChatInput';
import { Conversation } from './Conversation/Conversation';
import { UserHead } from './UserHead/UserHead';
import './ConversationUser.scss';

export const ConversationUser = () => {
  const { chatUserDetails, chatUserConversations } = useAppSelector((state) => state.messagesSlice);

  return (
    <div className="conversation-user">
      <UserHead chatUserDetails={chatUserDetails} />
      <Conversation
        chatUserConversations={chatUserConversations}
        // chatUserDetails={chatUserDetails}
      />
      <ChatInput chatUserDetails={chatUserDetails} />
    </div>
  );
};
