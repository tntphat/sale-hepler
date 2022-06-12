import React from 'react';

type Props = {
  className?: string;
};

export const SvgDecrease: React.FC<Props> = ({ className }) => {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.741223 -0.000112534H10.2588C10.9178 -0.000112534 11.2479 1.08067 10.7819 1.71275L6.02307 8.16756C5.73421 8.55938 5.26581 8.55938 4.97694 8.16756L0.218158 1.71275C-0.247875 1.08067 0.0821943 -0.000112534 0.741223 -0.000112534Z"
        fill="black"
      />
    </svg>
  );
};
