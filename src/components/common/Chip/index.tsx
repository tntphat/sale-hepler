import React from 'react';
import { SvgClose } from '../../../assets/svg';
import './Chip.scss';

export const Chip: React.FC<any> = ({ text, onClick, className }) => {
  return (
    <div className={`chip ${className}`}>
      <p className="chip__text">{text}</p>
      <div className="chip__close" onClick={onClick}>
        {/* <img src={ImageClose} className="chip__close-icon" /> */}
        <SvgClose />
      </div>
    </div>
  );
};
