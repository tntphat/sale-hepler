import React from 'react';
import { SvgClose } from '../../../assets/svg';
import './Modal.scss';

export const ModalMedia: React.FC<IModal & { media: any }> = ({ isOpen, media, setIsOpen }) => {
  return (
    <div
      className={`modal ${isOpen ? 'modal--open' : ''}`}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      <img src={media} />
      <div className="modal__close-wrapper" onClick={() => setIsOpen && setIsOpen(false)}>
        <SvgClose />
      </div>
    </div>
  );
};
