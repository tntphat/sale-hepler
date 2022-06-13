import React from 'react';
import { Box } from '../../components/common';

export const BoxStatisticsReport: React.FC<any> = ({ title, count, color }) => {
  return (
    <Box classname="box-statistics-report">
      <p className="box-statistics-report__title" style={{ color }}>
        {title}
      </p>
      <p className="box-statistics-report__count">{count}</p>
    </Box>
  );
};
