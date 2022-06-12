import React from 'react';

type Prop = {
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
};

export const SvgCheck: React.FC<Prop> = ({ onClick, isActive }) => {
  return isActive ? (
    <svg
      onClick={onClick}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 0C5.51088 0 3.60322 0.790176 2.1967 2.1967C0.790176 3.60322 0 5.51088 0 7.5V22.5C0 24.4891 0.790176 26.3968 2.1967 27.8033C3.60322 29.2098 5.51088 30 7.5 30H22.5C24.4891 30 26.3968 29.2098 27.8033 27.8033C29.2098 26.3968 30 24.4891 30 22.5V7.5C30 5.51088 29.2098 3.60322 27.8033 2.1967C26.3968 0.790176 24.4891 0 22.5 0H7.5ZM20.595 13.026C20.7297 12.8822 20.8348 12.7133 20.9043 12.5289C20.9737 12.3444 21.0062 12.1482 20.9998 11.9512C20.9934 11.7543 20.9482 11.5605 20.8669 11.381C20.7856 11.2015 20.6698 11.0397 20.526 10.905C20.3822 10.7703 20.2133 10.6652 20.0289 10.5957C19.8444 10.5263 19.6482 10.4938 19.4512 10.5002C19.2543 10.5066 19.0605 10.5518 18.881 10.6331C18.7015 10.7144 18.5397 10.8302 18.405 10.974L13.7805 15.909L11.496 13.8795C11.1967 13.6307 10.8124 13.5079 10.4242 13.5372C10.0361 13.5665 9.67457 13.7455 9.41598 14.0364C9.15739 14.3273 9.02201 14.7074 9.03843 15.0963C9.05486 15.4852 9.2218 15.8524 9.504 16.1205L12.879 19.1205C13.171 19.3799 13.5527 19.5152 13.9429 19.4975C14.3331 19.4799 14.7011 19.3107 14.9685 19.026L20.5935 13.026H20.595Z"
        fill="#1A94FF"
      />
    </svg>
  ) : (
    <svg
      onClick={onClick}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 1.5H7.5C4.18629 1.5 1.5 4.18629 1.5 7.5V22.5C1.5 25.8137 4.18629 28.5 7.5 28.5H22.5C25.8137 28.5 28.5 25.8137 28.5 22.5V7.5C28.5 4.18629 25.8137 1.5 22.5 1.5Z"
        stroke="#1A94FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 15L13.875 18L19.5 12"
        stroke="#1A94FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
