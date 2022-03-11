import React, { useEffect, useState } from 'react';
import { SvgList, SvgPlus } from '../../../assets/svg';
import { Box } from '../../common/Box/Box';
import './Select.scss';

export const Select: React.FC<ISelect> = ({ onClickSelect1, svg1: Svg1 }) => {
  return (
    <Box width="100%" height="fit-content" title="Chọn sản phẩm">
      <div className="select">
        <div onClick={onClickSelect1}>
          {Svg1}
          <p>Chọn sản phẩm có sẵn</p>
        </div>
        <div>
          <SvgPlus />
          <p>Tạo sản phẩm mới</p>
        </div>
      </div>
    </Box>
  );
};
