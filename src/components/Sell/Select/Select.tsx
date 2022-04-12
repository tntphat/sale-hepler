import React, { useEffect, useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import { SvgList, SvgPlus } from '../../../assets/svg';
import { Box } from '../../common/Box/Box';
import './Select.scss';

export const Select: React.FC<ISelect> = ({ onClickSelect1, svg1: Svg1 }) => {
  const navigate = useNavigate();
  return (
    <Box width="100%" height="fit-content" title="Chọn sản phẩm">
      <div className="select">
        <div onClick={onClickSelect1}>
          {Svg1}
          <p>Chọn sản phẩm có sẵn</p>
        </div>
        <div onClick={() => navigate('/create-product')}>
          <SvgPlus />
          <p>Tạo sản phẩm mới</p>
        </div>
      </div>
    </Box>
  );
};
