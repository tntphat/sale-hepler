import React from 'react';
import { Type } from 'typescript';
import { SvgPlusRound } from '../../../assets/svg/SvgPlusRound';
import { Box } from '../../common';
import './BoxStatistics.scss';

type TypeBoxStatistics = {
  color?: string;
  onClick?: () => void;
  count?: number;
  channel?: string;
};

export const BoxStatistics: React.FC<TypeBoxStatistics> = ({ color, onClick, count, channel }) => {
  return (
    <Box color={color} classname="box-statistics">
      <p>Đã kết nối</p>
      <p>{count}</p>
      <p>Tài khoản {channel}</p>
      <SvgPlusRound className="box-statistics__add" onClick={onClick} />
    </Box>
  );
};
