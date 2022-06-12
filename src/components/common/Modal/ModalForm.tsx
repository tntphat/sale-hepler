import React from 'react';
import { SvgClose } from '../../../assets/svg';
import './Modal.scss';

export const ModalForm: React.FC<IModalForm> = ({
  isOpen,
  setIsOpen,
  children,
  handleSubmit,
  agreeText,
}) => {
  const hanldeClose = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`modal ${isOpen ? 'modal--open' : ''}`}
      // onClick={() => setIsOpen && setIsOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        {children}
        <div className="modal__close-wrapper" onClick={() => setIsOpen && setIsOpen(false)}>
          <SvgClose />
        </div>
        <div className="modal__button">
          <button onClick={hanldeClose} className="modal__button--cancel">
            Hủy
          </button>
          <button type="submit" onClick={handleSubmit} className="modal__button--ok">
            {agreeText || 'Hoàn tất'}
          </button>
        </div>
      </div>
    </div>
  );
};
