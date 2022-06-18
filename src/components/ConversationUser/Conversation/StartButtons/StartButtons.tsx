import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';

import { SvgAttach, SvgEmoji, SvgSample } from '../../../../assets/svg';
import { QuickReplyItem } from '../../../../containers/MessageSetting/QuickReply/QuickReplyItem/QuickReplyItem';
import { useOnClickOutside } from '../../../../hooks';
import { useAppSelector } from '../../../../redux';
import { apiMessages } from '../../../../services/api';
import { Modal, ModalForm } from '../../../common/Modal';
import './StartButtons.scss';

interface StartButtonsProps {
  refText: React.RefObject<HTMLInputElement>;
  refImage: any;
  onClickEmoji: (e: React.MouseEvent, emoji: IEmojiData) => void;
}
export const StartButtons = ({ onClickEmoji, refImage, refText }: StartButtonsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quickReplies, setQuickReplies] = useState<any[]>([]);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const handleClickOutside = () => {
    setShowEmoji(false);
  };
  useOnClickOutside(handleClickOutside, ref);

  useEffect(() => {
    const fetchAutoReplies = async () => {
      const quickReplies = await apiMessages.getQuickReply(pageId);
      setQuickReplies(quickReplies.data.data);
    };
    fetchAutoReplies();
  }, []);

  return (
    <>
      <div ref={ref} className="start-buttons">
        <div className="start-buttons__sample" onClick={() => setIsOpen(true)}>
          <SvgSample />
        </div>
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {quickReplies.map((quickReply, id) => {
          return (
            <QuickReplyItem
              key={id}
              quickReply={quickReply}
              isSample={true}
              setIsOpen={setIsOpen}
            />
          );
        })}
      </Modal>
    </>
  );
};
