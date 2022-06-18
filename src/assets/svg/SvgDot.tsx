import React from 'react';

type Props = {
  className?: string;
};

export const SvgDot: React.FC<Props> = ({ className }) => {
  return (
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 3.5C2.39782 3.5 2.77936 3.34196 3.06066 3.06066C3.34196 2.77936 3.5 2.39782 3.5 2C3.5 1.60218 3.34196 1.22064 3.06066 0.93934C2.77936 0.658035 2.39782 0.5 2 0.5C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2C0.5 2.39782 0.658035 2.77936 0.93934 3.06066C1.22064 3.34196 1.60218 3.5 2 3.5V3.5Z"
        fill="#0A69FF"
      />
    </svg>
  );
};
