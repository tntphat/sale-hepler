import React from 'react';
import './Box.scss';

export const Box: React.FC<IBox> = ({ classname, children, title, onClick, ...props }) => {
  return (
    <div onClick={onClick} className={`box ${classname || ''}`} style={{ ...props }}>
      {title ? <p className="box__title">{title}</p> : null}
      {children}
    </div>
  );
};
