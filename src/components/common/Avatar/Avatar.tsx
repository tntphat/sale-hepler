import React from 'react';
import './Avatar.scss';

export const Avatar: React.FC<IAvatar> = ({
  image,
  className,
  width,
  border,
  borderRadius,
  onClick,
  isOval,
}) => {
  return (
    <div
      className={`avatar ${isOval ? 'avatar--oval' : ''} ${className ? className : ''}`}
      style={{
        backgroundImage: `url(${image})`,
        width,
        height: width,
        borderRadius,
        border,
      }}
      onClick={onClick}
    />
  );
};
