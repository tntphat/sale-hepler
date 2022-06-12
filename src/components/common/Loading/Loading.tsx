import React from 'react';
import { Loader } from '../Loader/Loader';
import './Loading.scss';

export const ModalLoading: React.FC<IModal> = ({ isOpen, isSmall }) => {
  return (
    <div className={`modal ${isSmall ? 'modal--small' : ''} ${isOpen ? 'modal--open' : ''}`}>
      <Loader />
    </div>
  );
};
