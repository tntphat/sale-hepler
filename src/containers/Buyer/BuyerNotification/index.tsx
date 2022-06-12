import React from 'react';
import { Box } from '../../../components/common';
import './BuyerNotification.scss';

export const BuyerNotification = () => {
  return (
    <Box title="Thông báo" maxWidth={650}>
      {[1, 2, 3].map((item) => (
        <div className="noti noti--active" key={item}>
          <img src="https://cdn.pixabay.com/photo/2022/02/20/09/34/animal-7024072__340.png" />
          <div className="noti__detai">
            <p>
              <b>Fat To</b> đã thêm một bài viết có từ khóa <b>Iphone</b>
            </p>
            <span>Vừa xong</span>
          </div>
        </div>
      ))}
    </Box>
  );
};
