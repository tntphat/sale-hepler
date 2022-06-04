import React from 'react';
import './Message.scss';

interface MessageProps {
  message: MessageType;
  chatUserDetails: any;
  myInfo: any;
}

export const Message = ({ message, chatUserDetails, myInfo }: MessageProps) => {
  const isFromMe = message?.from?.id === myInfo?.id;
  const receiverAvatar = chatUserDetails.data.url;
  // const receiverAvatar =
  //   'https://png.pngtree.com/png-clipart/20190619/original/pngtree-cartoon-style-hand-drawing-hand-drawn-avatar-boy-with-glasses-png-image_3963092.jpg' ||
  //   'chatUserDetails.data.url';
  return (
    <>
      {message.message && (
        <li className={`chat-item ${isFromMe ? 'chat-item--right' : ''}`}>
          <div className="wrapper">
            <div className={`chat-item__avatar ${isFromMe ? 'chat-item__my-avatar' : ''}`}>
              <img src={receiverAvatar} alt="avatar" />
            </div>

            <div className="chat-item__content">
              <p className="">{message.message}</p>
            </div>
          </div>
        </li>
      )}
    </>
  );
};
