import React, { useEffect } from 'react';

import { Box } from '../../components/common/Box/Box';
import { ModalLoading } from '../../components/common/Modal';
import { Scrollbar } from '../../components/common/Srollbar/Scrollbar';
import { ConversationUser } from '../../components/ConversationUser/ConversationUser';
import { Leftbar } from '../../components/Leftbar/Leftbar';
import { OrderInformation } from '../../components/OrderInformation/OrderInformation';
import { useAppSelector } from '../../redux';
import './Message.scss';

export const Message = () => {
  const { selectedChat, loading, loadingMessage } = useAppSelector((state) => state.messagesSlice);

  return (
    <Box classname="d-flex message-wrapper">
      {/* {loadingMessage ? (
        <ModalLoading isSmall={true} isOpen={false} isBlue={true} />
      ) : ( */}
      <>
        <Leftbar />
        {selectedChat !== null ? (
          <ConversationUser />
        ) : (
          <Scrollbar classname="scrollbar__conversation">
            <ModalLoading isSmall={true} isOpen={loading} isBlue={true} />
          </Scrollbar>
        )}

        <OrderInformation />
      </>
      {/* )} */}
    </Box>
  );
};

{
  /* <ConversationUser /> */
}
