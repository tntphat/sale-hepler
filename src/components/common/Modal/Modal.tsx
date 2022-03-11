import React from 'react';
import './Modal.scss';

export const Modal: React.FC<IModal> = ({ isOpen, setIsOpen, children }) => {
  return (
    <div className={`modal ${isOpen ? 'modal--open' : ''}`} onClick={() => setIsOpen(false)}>
      <div className="modal__container">{children}</div>
    </div>
  );
};
