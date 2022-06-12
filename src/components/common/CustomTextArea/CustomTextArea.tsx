import React from 'react';
import './CustomTextArea.scss';
export const CustomTextArea = ({
  id,
  placeholder,
  className,
  value,
  error,
  onChange,
}: ICustomTextArea) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        className={`custom-text-area ${className}`}
        placeholder={placeholder}
      />
      {error ? <span className="inputs__err">{error}</span> : null}
    </div>
  );
};
