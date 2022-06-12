import Picker, { IEmojiData, SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import React, { useRef, useState } from 'react';
import { SvgEmoji } from '../../../assets/svg';
import { useOnClickOutside } from '../../../hooks';
interface IEmojiPicker {
  onClickEmoji: (e: React.MouseEvent, emoji: IEmojiData) => void;
  className?: string;
  refArea?: React.RefObject<HTMLDivElement>;
}

export const EmojiPicker: React.FC<IEmojiPicker> = ({ onClickEmoji, refArea }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = () => {
    setShowEmoji(false);
  };
  useOnClickOutside(handleClickOutside, ref);
  //   const onEmojiClick = (e, emoji) => console.log(emoji);
  return (
    <div
      onClick={() => {
        setShowEmoji(!showEmoji);
        refArea?.current?.focus();
      }}
      ref={ref}
    >
      <SvgEmoji />
      {showEmoji ? (
        <Picker
          onEmojiClick={onClickEmoji}
          disableSearchBar
          pickerStyle={{
            height: '300px',
            zIndex: '1000',
            boxShadow: 'none',
          }}
        />
      ) : null}
    </div>
  );
};
