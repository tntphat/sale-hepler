import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { useRef, useState } from 'react';

import { SvgAttach, SvgEmoji } from '../../../../assets/svg';
import { useOnClickOutside } from '../../../../hooks';
import './StartButtons.scss';

interface StartButtonsProps {
  refText: React.RefObject<HTMLInputElement>;
  refImage: any;
  onClickEmoji: (e: React.MouseEvent, emoji: IEmojiData) => void;
}
export const StartButtons = ({ onClickEmoji, refImage, refText }: StartButtonsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const handleClickOutside = () => {
    setShowEmoji(false);
  };
  useOnClickOutside(handleClickOutside, ref);
  return (
    <>
      <div ref={ref} className="start-buttons">
        <div className="start-buttons__attach" onClick={() => refImage.current?.click()}>
          <SvgAttach />
        </div>
        <div className="start-buttons__picker-container">
          <div ref={refText} className="emoji" onClick={() => setShowEmoji((val) => !val)}>
            <SvgEmoji />
          </div>
          <div className="start-buttons__emoji">
            {showEmoji && (
              <div className=" picker">
                <Picker
                  disableSearchBar
                  pickerStyle={{
                    height: '300px',
                    zIndex: '1000',
                    boxShadow: 'none',
                  }}
                  onEmojiClick={onClickEmoji}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
