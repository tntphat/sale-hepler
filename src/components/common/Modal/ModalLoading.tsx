import React from 'react';
import { SvgClose } from '../../../assets/svg';
import { Loader } from '../Loader/Loader';
import './Modal.scss';

export const ModalLoading: React.FC<IModal> = ({ isOpen, isSmall, isBlue }) => {
  return (
    <div className={`modal ${isSmall ? 'modal--small' : ''} ${isOpen ? 'modal--open' : ''}`}>
      <Loader className={`${isBlue ? 'blue' : ''}`} />
    </div>
  );
};
