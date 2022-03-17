import React from 'react';
import './Divider.scss';

export const Divider: React.FC<IDivider> = ({ className, ...props }) => {
  return <div className={`divider ${className || ''}`} style={{ ...props }} />;
};
