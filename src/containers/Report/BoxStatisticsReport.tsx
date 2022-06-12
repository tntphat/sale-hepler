import React from 'react';
import { Box } from '../../components/common';

export const BoxStatisticsReport: React.FC<any> = ({ title, count }) => {
  return (
    <Box classname="box-statistics-report">
      <p className="box-statistics-report__title">{title}</p>
      <p className="box-statistics-report__count">{count}</p>
    </Box>
  );
};
