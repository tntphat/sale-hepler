import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgCart, SvgStore } from '../../assets/svg';
import { ChartBar } from '../../components/Bar/ChartBar';
import { Box, Button, FileDropzone } from '../../components/common';
import { COLOR } from '../../constants';
import { apiCategory, apiTikiProduct, apiTikiSeller, apiTikiState } from '../../services/api';
import { apiCommon } from '../../services/api/apiCommon';

export const Home = () => {
  const navigate = useNavigate();
  const navigateRoute = (path: string) => {
    return () => {
      navigate(path);
    };
  };
  return (
    <Box title="Bạn là ?">
      <div className="select">
        <div className="sell-common__text sell-common__text--fb" onClick={navigateRoute('/sell')}>
          <SvgStore color={COLOR.PRIMARY} />
          Người bán
        </div>
        <div
          className="sell-common__text sell-common__text--sendo"
          onClick={navigateRoute('/buyer')}
        >
          <SvgCart color={COLOR.SENDO} />
          Người mua
        </div>
      </div>
    </Box>
  );
};
