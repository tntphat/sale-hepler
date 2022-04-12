import React from 'react';
import './Button.scss';

export const Button: React.FC<IButton> = ({ children, size, onClick, className, ...props }) => {
  return (
    <div onClick={onClick} className={`button ${className || ''}`} style={{ ...props }}>
      {children}
    </div>
  );
};
