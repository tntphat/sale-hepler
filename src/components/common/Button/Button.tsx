import React from 'react';
import './Button.scss';

export const Button: React.FC<IButton> = ({ children, size, onClick, ...props }) => {
  return (
    <div onClick={onClick} className="button" style={{ ...props }}>
      {children}
    </div>
  );
};
