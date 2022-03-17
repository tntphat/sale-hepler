import React from 'react';
import { SvgClose } from '../../../assets/svg';
import { Loader } from '../Loader/Loader';
import './Modal.scss';

export const ModalLoading: React.FC<IModal> = ({ isOpen }) => {
  return (
    <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
      <Loader />
    </div>
  );
};
