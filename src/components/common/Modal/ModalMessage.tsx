import React from 'react';
import { SvgClose } from '../../../assets/svg';
import './Modal.scss';

export const ModalMessage: React.FC<IModal & { message: string }> = ({
  isOpen,
  setIsOpen,
  message,
}) => {
  return (
    <div
      className={`modal modal--message ${isOpen ? 'modal--open' : ''}`}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        <p>{message}</p>
        <div className="modal__close-wrapper" onClick={() => setIsOpen && setIsOpen(false)}>
          <SvgClose />
        </div>
      </div>
    </div>
  );
};
