import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '../../components/common';
import './SellCommon.scss';

export const SellCommon = () => {
  const navigate = useNavigate();
  const navigateRoute = (path) => {
    return () => {
      navigate(path);
    };
  };
  return (
    <Box title="Chọn sàn">
      <div className="select">
        <div className="sell-common__text sell-common__text--fb" onClick={navigateRoute('fb')}>
          Facebook
        </div>
        <div className="sell-common__text sell-common__text--tiki" onClick={navigateRoute('tiki')}>
          Tiki
        </div>
        <div
          className="sell-common__text sell-common__text--sendo"
          onClick={navigateRoute('sendo')}
        >
          Sendo
        </div>
      </div>
    </Box>
  );
};
