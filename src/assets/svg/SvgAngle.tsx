import React from 'react';

export const SvgAngle: React.FC<ISvg> = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.99996 6.00148L0.756958 1.75848L2.17196 0.344482L4.99996 3.17348L7.82796 0.344482L9.24296 1.75848L4.99996 6.00148Z"
        fill={color || '#717A8A'}
      />
    </svg>
  );
};
