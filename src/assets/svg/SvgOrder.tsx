import React from 'react';

export const SvgOrder: React.FC<ISvg> = ({ color }) => {
  return (
    <svg width="15" height="20" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.5807 6.35742L16.7169 0.423828C16.4474 0.151367 16.082 0 15.6987 0H15.3333V7.75H23V7.38066C23 6.99922 22.8503 6.62988 22.5807 6.35742ZM13.4167 8.23438V0H1.4375C0.640885 0 0 0.647852 0 1.45312V29.5469C0 30.3521 0.640885 31 1.4375 31H21.5625C22.3591 31 23 30.3521 23 29.5469V9.6875H14.8542C14.0635 9.6875 13.4167 9.03359 13.4167 8.23438ZM3.83333 4.35938C3.83333 4.09176 4.04776 3.875 4.3125 3.875H9.10417C9.36891 3.875 9.58333 4.09176 9.58333 4.35938V5.32812C9.58333 5.59574 9.36891 5.8125 9.10417 5.8125H4.3125C4.04776 5.8125 3.83333 5.59574 3.83333 5.32812V4.35938ZM3.83333 9.20312V8.23438C3.83333 7.96676 4.04776 7.75 4.3125 7.75H9.10417C9.36891 7.75 9.58333 7.96676 9.58333 8.23438V9.20312C9.58333 9.47074 9.36891 9.6875 9.10417 9.6875H4.3125C4.04776 9.6875 3.83333 9.47074 3.83333 9.20312ZM12.4583 25.1802V26.6406C12.4583 26.9082 12.2439 27.125 11.9792 27.125H11.0208C10.7561 27.125 10.5417 26.9082 10.5417 26.6406V25.1699C9.86544 25.1348 9.20779 24.8963 8.66273 24.4827C8.42914 24.3053 8.41716 23.9517 8.62859 23.7477L9.33237 23.069C9.49828 22.9091 9.74505 22.9019 9.93911 23.0248C10.1709 23.1713 10.4339 23.25 10.707 23.25H12.3907C12.78 23.25 13.0974 22.8916 13.0974 22.4514C13.0974 22.0911 12.8812 21.7739 12.5721 21.6806L9.87682 20.8632C8.76336 20.5254 7.98531 19.4452 7.98531 18.2361C7.98531 16.7515 9.12633 15.5454 10.5411 15.5073V14.0469C10.5411 13.7793 10.7555 13.5625 11.0202 13.5625H11.9786C12.2433 13.5625 12.4577 13.7793 12.4577 14.0469V15.5176C13.134 15.5527 13.7916 15.7906 14.3367 16.2048C14.5703 16.3822 14.5822 16.7358 14.3708 16.9398L13.667 17.6185C13.5011 17.7784 13.2543 17.7856 13.0603 17.6627C12.8285 17.5156 12.5655 17.4375 12.2924 17.4375H10.6087C10.2194 17.4375 9.90198 17.7959 9.90198 18.2361C9.90198 18.5964 10.1182 18.9136 10.4273 19.0069L13.1226 19.8243C14.236 20.1621 15.0141 21.2423 15.0141 22.4514C15.0141 23.9366 13.8731 25.1421 12.4583 25.1802Z"
        fill={color || '#1A94FF'}
      />
    </svg>
  );
};
