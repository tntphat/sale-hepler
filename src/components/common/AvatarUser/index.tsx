import React, { useRef } from 'react';
import { ImageDefaultAvatar } from '../../../constants/images';

export const AvatarUser: React.FC<any> = ({ img, className }) => {
  const ref = useRef();
  const handleErr = () => {
    ref.current.src = ImageDefaultAvatar;
  };
  return (
    <img
      ref={ref}
      src={img || ImageDefaultAvatar}
      className={className || ''}
      onError={handleErr}
    />
  );
};
