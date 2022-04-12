import React from 'react';
import './InputText.scss';

const ComponentInputText = (
  {
    name,
    type,
    placeholder,
    classNameInput,
    classNameLabel,
    onChange,
    onkeypress,
    value,
    id,
    isLabel,
    label,
    HTMLFor,
    autoComplete,
    onFocus,
    autoFocus,
    subLabel,
    className,
    error,
    marginTop,
  }: IInput,
  ref: any,
) => {
  return (
    <div className={`inputs-container form-field ${className || ''}`} style={{ marginTop }}>
      {label ? (
        <label htmlFor={HTMLFor} className={`inputs__label ${classNameLabel}`}>
          {label}
        </label>
      ) : (
        ''
      )}

      {subLabel ? <p className="inputs__sub-label">{subLabel}</p> : ''}

      <input
        id={id}
        className={`inputs ${classNameInput}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onkeypress}
        onFocus={onFocus}
        value={value}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        ref={ref}
      />
      {error ? <span className="inputs__err">{error}</span> : null}
    </div>
  );
};
export const InputText = React.forwardRef(ComponentInputText);
