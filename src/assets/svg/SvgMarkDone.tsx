import React from 'react';

type Props = {
  className?: string;
};

export const SvgMarkDone: React.FC<Props> = ({ className }) => {
  return (
    <svg width="41" height="27" viewBox="0 0 61 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="61" height="46.2121" rx="10" fill="#00D215" />
      <path
        d="M26.7929 30.6213L20.2929 24.1213C19.9024 23.7308 19.9024 23.0976 20.2929 22.7071L21.7071 21.2929C22.0976 20.9023 22.7308 20.9023 23.1213 21.2929L27.5 25.6715L36.8787 16.2929C37.2692 15.9024 37.9024 15.9024 38.2929 16.2929L39.7071 17.7071C40.0976 18.0976 40.0976 18.7308 39.7071 19.1213L28.2071 30.6214C27.8166 31.0119 27.1834 31.0119 26.7929 30.6213Z"
        fill="white"
      />
    </svg>
  );
};
