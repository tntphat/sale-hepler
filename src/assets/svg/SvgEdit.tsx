import React from 'react';

type Props = {
  className?: string;
};

export const SvgEdit: React.FC<Props> = ({ className }) => {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" rx="6" fill="#C0D736" />
      <path
        d="M24.5794 11.7186L28.2103 15.3502C28.3633 15.5032 28.3633 15.7528 28.2103 15.9058L19.4188 24.6991L15.6832 25.1138C15.1841 25.1702 14.7614 24.7474 14.8178 24.2481L15.2324 20.5118L24.0239 11.7186C24.1769 11.5656 24.4264 11.5656 24.5794 11.7186ZM31.1006 10.7966L29.1362 8.83179C28.5243 8.21981 27.53 8.21981 26.9142 8.83179L25.4891 10.2571C25.3362 10.4101 25.3362 10.6597 25.4891 10.8127L29.1201 14.4443C29.273 14.5973 29.5226 14.5973 29.6756 14.4443L31.1006 13.019C31.7125 12.403 31.7125 11.4086 31.1006 10.7966ZM23.8307 22.3075V26.4062H10.9493V13.5223H20.1997C20.3286 13.5223 20.4493 13.47 20.5419 13.3814L22.1521 11.7709C22.458 11.4649 22.2406 10.9456 21.8099 10.9456H10.3053C9.23851 10.9456 8.37305 11.8112 8.37305 12.8781V27.0504C8.37305 28.1173 9.23851 28.983 10.3053 28.983H24.4747C25.5415 28.983 26.4069 28.1173 26.4069 27.0504V20.697C26.4069 20.2662 25.8877 20.0528 25.5817 20.3548L23.9716 21.9653C23.883 22.0579 23.8307 22.1787 23.8307 22.3075Z"
        fill="white"
      />
    </svg>
  );
};