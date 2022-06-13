import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../../components/common';
import './Interact.scss';

export const Interact = () => {
  return (
    <Box title="Chọn loại tương tác">
      <div className="select">
        <div>
          <Link className="interact__text" to="./messenger">
            Tin nhắn
          </Link>
        </div>
        <div>
          <Link className="interact__text" to="./messenger-setting">
            Bình luận
          </Link>
        </div>
      </div>
    </Box>
  );
};
