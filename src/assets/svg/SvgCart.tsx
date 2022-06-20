import React from 'react';

export const SvgCart = ({ color }) => {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7H18.79C19.0694 7.00001 19.3457 7.05857 19.6011 7.17191C19.8565 7.28524 20.0854 7.45083 20.2729 7.65801C20.4603 7.86519 20.6023 8.10936 20.6897 8.37478C20.777 8.64019 20.8078 8.92097 20.78 9.199L20.18 15.199C20.1307 15.6925 19.8997 16.1501 19.532 16.4829C19.1642 16.8157 18.686 17 18.19 17H8.64C8.17747 17.0002 7.72918 16.84 7.37144 16.5469C7.01371 16.2537 6.76866 15.8456 6.678 15.392L5 7Z"
        stroke={color || 'black'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 21H18M5 7L4.19 3.757C4.13583 3.54075 4.01095 3.34881 3.83521 3.21166C3.65946 3.0745 3.44293 3.00001 3.22 3H2L5 7ZM8 21H10H8Z"
        stroke={color || 'black'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
