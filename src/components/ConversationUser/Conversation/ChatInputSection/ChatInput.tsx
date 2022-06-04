import { IEmojiData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../redux';
import {
  getChatUserConversations,
  sendMessage,
} from '../../../../redux/slice/apiSlice/messagesSlice';

import { EndButtons } from '../EndButton/EndButtons';
import { InputSection } from '../InputSection/InputSection';
import { StartButtons } from '../StartButtons/StartButtons';
import './ChatInput.scss';

interface ChatInputProps {
  chatUserDetails: any;
}

export const ChatInput = ({ chatUserDetails }: ChatInputProps) => {
  const refText = useRef<HTMLInputElement | any>(null);
  const refImage = useRef<HTMLInputElement | any>(null);

  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<any>([]);
  const [cursorPos, setCursorPos] = useState('');
  const dispatch = useDispatch();
  const { selectedChat } = useAppSelector((state) => state.messagesSlice);

  const handleClickEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    event.stopPropagation();
    refText.current?.focus();

    const ref = refText.current;
    const start = ref.value.substring(0, ref.selectionStart);
    const end = ref.value.substring(ref.selectionStart);
    const finalText = start + emojiObject.emoji + end;
    setText(finalText);
    setCursorPos(start.length + emojiObject.emoji.length);
  };

  const handleSend = () => {
    dispatch(
      sendMessage({
        receiverId: chatUserDetails.id,
        messageText: text,
        messageAttachment: images,
      }),
    );
    setImages([]);
    setText('');
    dispatch(getChatUserConversations(selectedChat));
  };

  useEffect(() => {
    refText.current.selectionEnd = cursorPos;
  }, [cursorPos]);

  return (
    <div className="chat-input">
      <form
        className="chat-input__form"
        onSubmit={(e: any) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="chat-input__content row g-0 align-items-center">
          <div className="col-auto">
            <StartButtons refImage={refImage} refText={refText} onClickEmoji={handleClickEmoji} />
          </div>
          <div className="chat-input__input col">
            <InputSection
              refImage={refImage}
              refText={refText}
              images={images}
              setImages={setImages}
              value={text}
              setText={setText}
            />
          </div>
          <div className="chat-input__button col-auto">
            <EndButtons />
          </div>
        </div>
      </form>
    </div>
  );
};