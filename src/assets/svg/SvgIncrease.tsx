import React from 'react';

type Props = {
  className?: string;
};

export const SvgIncrease: React.FC<Props> = ({ className }) => {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.2588 8.46154H0.741208C0.0821786 8.46154 -0.247854 7.38075 0.218142 6.74868L4.97693 0.293864C5.26579 -0.0979545 5.73419 -0.0979545 6.02306 0.293864L10.7818 6.74868C11.2479 7.38075 10.9178 8.46154 10.2588 8.46154Z"
        fill="black"
      />
    </svg>
  );
};
