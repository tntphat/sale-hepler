import React from 'react';
import { SvgClose } from '../../../assets/svg';
import './Modal.scss';

export const Modal: React.FC<IModal> = ({ isOpen, setIsOpen, children }) => {
  return (
    <div className={`modal ${isOpen ? 'modal--open' : ''}`} onClick={() => setIsOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        {children}
        <div className="modal__close-wrapper" onClick={() => setIsOpen(false)}>
          <SvgClose />
        </div>
      </div>
    </div>
  );
};
