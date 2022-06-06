import React from 'react';

import { useAppSelector } from '../../redux';
import { ChatInput } from './Conversation/ChatInputSection/ChatInput';
import { Conversation } from './Conversation/Conversation';
import { UserHead } from './UserHead/UserHead';
import './ConversationUser.scss';

export const ConversationUser = () => {
  // const [chatUserConversation, setChatUserConversations] = useState<any>(null);
  const { chatUserDetails, chatUserConversations } = useAppSelector((state) => state.messagesSlice);

  // useEffect(() => {
  //   console.log('aaaa');
  //   const fetchDetailConversations = async () => {
  //     const chatUserConversations = await apiMessages.getConversationDetail(selectedChat);
  //     console.log(chatUserConversations.data);
  //     setChatUserConversations(chatUserConversations?.data);
  //   };
  //   fetchDetailConversations();
  // }, [selectedChat, loading]);

  return (
    <div className="conversation-user">
      <UserHead chatUserDetails={chatUserDetails} />
      <Conversation
        chatUserConversations={chatUserConversations}
        chatUserDetails={chatUserDetails}
      />
      <ChatInput chatUserDetails={chatUserDetails} />
    </div>
  );
};
