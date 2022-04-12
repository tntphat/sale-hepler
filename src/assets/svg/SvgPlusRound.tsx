import React from 'react';

export const SvgPlusRound: React.FC<ISvg> = ({ className, color, onClick }) => {
  return (
    <svg
      className={className || ''}
      onClick={onClick}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2C20.6 2 26 7.4 26 14C26 20.6 20.6 26 14 26C7.4 26 2 20.6 2 14C2 7.4 7.4 2 14 2ZM14 0C6.3 0 0 6.3 0 14C0 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0Z"
        fill={color || '#017DF6'}
      />
      <path d="M22 13H15V6H13V13H6V15H13V22H15V15H22V13Z" fill={color || '#017DF6'} />
    </svg>
  );
};
