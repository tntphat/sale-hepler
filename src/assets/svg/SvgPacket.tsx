import React from 'react';

export const SvgPacket: React.FC<ISvg> = (props) => {
  return (
    <svg
      isStroke="true"
      width="25"
      height="25"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5 8.75L15 2.5L2.5 8.75V21.25L15 27.5L27.5 21.25V8.75Z"
        stroke={props?.color || '#0A69E1'}
        stroke-width="4"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 8.75L15 15"
        stroke={props?.color || '#0A69E1'}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 27.5V15"
        stroke={props?.color || '#0A69E1'}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.5 8.75L15 15"
        stroke={props?.color || '#0A69E1'}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.25 5.625L8.75 11.875"
        stroke={props?.color || '#0A69E1'}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
