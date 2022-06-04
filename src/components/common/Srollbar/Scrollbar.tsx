import React from 'react';
import './Scrollbar.scss';

interface ScrollbarProps {
  classname?: string;
  children: any;
}

export const Scrollbar = ({ classname, children }: ScrollbarProps) => {
  return (
    <div id="bar">
      <div className={`scrollbar ${classname || ''} `}>{children}</div>
    </div>
  );
};
