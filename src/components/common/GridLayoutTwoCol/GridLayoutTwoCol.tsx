import React from 'react';
import './GridLayoutTwoCol.scss';

export const GridLayoutTwoCol: React.FC<any> = ({ children, className }) => {
  return <div className={`grid-layout-two-col ${className || ''}`}>{children}</div>;
};
