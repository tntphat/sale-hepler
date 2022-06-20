import React from 'react';
import './Button.scss';

export const Button: React.FC<IButton> = ({
  children,
  size,
  onClick,
  isDisabled,
  className,
  isSecondary,
  ...props
}) => {
  return (
    <div
      onClick={isDisabled ? () => false : onClick}
      className={`button ${isDisabled ? 'button--disabled' : ''} ${className || ''} ${
        isSecondary ? 'button--secondary' : ''
      } ${className || ''}`}
      style={{ ...props }}
    >
      {children}
    </div>
  );
};
