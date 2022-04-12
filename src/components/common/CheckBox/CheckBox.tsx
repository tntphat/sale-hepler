import React, { useState } from 'react';
import { SvgTick } from '../../../assets/svg';
import './CheckBox.scss';
export const CheckBox: React.FC<ICheckBox> = ({ isActive, handleClick }) => {
  //   const [isActive, setIsActive] = useState(false);
  return (
    <div className={`checkbox ${isActive ? 'checkbox--active' : ''}`} onClick={handleClick}>
      {isActive ? <SvgTick /> : null}
    </div>
  );
};
