import React from 'react';
import './Message.scss';
import defaultAvatar from '../../../../assets/images/default-user-image.png';

interface MessageProps {
  message: any;
  chatUserDetails: any;
  myInfo: any;
}

export const Message = ({ message, chatUserDetails, myInfo }: MessageProps) => {
  const isFromMe = message?.from?.id === myInfo?.id;
  const receiverAvatar = chatUserDetails.data?.url;

  return (
    <>
      {message.message && (
        <li className={`chat-item ${isFromMe ? 'chat-item--right' : ''}`}>
          <div className="wrapper">
            <div className={`chat-item__avatar ${isFromMe ? 'chat-item__my-avatar' : ''}`}>
              {receiverAvatar ? (
                <img src={receiverAvatar} className="avatar" />
              ) : (
                <img src={defaultAvatar} className="avatar" />
              )}
            </div>

            <div className="chat-item__content">
              <p className="">{message.message}</p>
            </div>
          </div>
        </li>
      )}
      {message.attachments && (
        <li
          className={`chat-item chat-item__attachment-wrapper ${
            isFromMe ? 'chat-item--right' : ''
          }`}
        >
          <div className="wrapper">
            <div className={`chat-item__avatar ${isFromMe ? 'chat-item__my-avatar' : ''}`}>
              {/* {receiverAvatar ? (
                <img src={receiverAvatar} className="avatar" />
              ) : ( */}
              <img src={defaultAvatar} className="avatar" />
              {/* )} */}
              {/* <img src={receiverAvatar} alt="avatar" /> */}
            </div>

            <div
              className={`chat-item__image-wrapper ${
                isFromMe ? 'chat-item__image-wrapper--right' : ''
              }`}
            >
              {message?.attachments?.data?.map((att: any, id: any) => {
                return (
                  <a target="_blank" href={att.image_data.url} key={id}>
                    <img
                      src={att.image_data.url}
                      className={` ${
                        isFromMe ? 'chat-item__image chat-item__image--right' : 'chat-item__image'
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </li>
      )}
    </>
  );
};
