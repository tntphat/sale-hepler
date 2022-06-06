import React, { useEffect } from 'react';

import { Box } from '../../components/common/Box/Box';
import { ConversationUser } from '../../components/ConversationUser/ConversationUser';
import { Leftbar } from '../../components/Leftbar/Leftbar';
import { OrderInformation } from '../../components/OrderInformation/OrderInformation';
import { useAppSelector } from '../../redux';
import './Message.scss';

export const Message = () => {
  const { selectedChat } = useAppSelector((state) => state.messagesSlice);
  return (
    <Box classname="d-flex message-wrapper">
      <Leftbar />
      {selectedChat !== null ? <ConversationUser /> : <div className="item-2">Hello World</div>}
      <OrderInformation />
    </Box>
  );
};
