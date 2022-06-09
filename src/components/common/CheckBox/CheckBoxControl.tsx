import React from 'react';
import { CheckBox } from './CheckBox';

export const CheckBoxControl: React.FC<any> = ({ label, onChange, value, error, isRow }) => {
  return (
    <div
      className={`form-field ${isRow ? 'checkbox-control-row' : ''}`}
      onClick={() => {
        onChange(!value);
      }}
    >
      <label className="inputs__label">{label}</label>

      <CheckBox
        isActive={value}
        handleClick={(e) => {
          e.stopPropagation();
          onChange(!value);
        }}
      />
      {error ? <span className="inputs__err">{error}</span> : null}
    </div>
  );
};
