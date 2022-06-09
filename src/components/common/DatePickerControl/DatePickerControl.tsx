import React from 'react';
import DatePicker from 'react-datepicker';

export const DatePickerControl: React.FC<any> = ({ error, label, onChange, value }) => {
  return (
    <div className="form-field">
      <label className="inputs__label">{label}</label>

      <DatePicker onChange={onChange} selected={value || new Date()} />

      {error && <span className="inputs__err">{error}</span>}
    </div>
  );
};
