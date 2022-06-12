import React from 'react';
import './ToggleButton.scss';

interface IButton {
  handleToggle: () => void;
  isChecked: boolean;
}

export const ToggleButton = ({ handleToggle, isChecked }: IButton) => {
  return (
    <label className="switch">
      <input checked={isChecked} type="checkbox" onClick={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};
