import React, { useEffect, useState } from 'react';
import { ChartBar } from '../../components/Bar/ChartBar';
import { LineBar } from '../../components/Bar/LineBar';
import { Box } from '../../components/common';
import { BoxStatisticsReport } from './BoxStatisticsReport';
import './Report.scss';
import DatePicker from 'react-datepicker';
import { apiReport } from '../../services/api';

export const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    apiReport.getReportSales({ year: 2022, type: 'ARRIVED', month: 6 });
  }, []);
  return (
    <div className="report">
      <div className="report__grid-4">
        <BoxStatisticsReport />
        <BoxStatisticsReport />
        <BoxStatisticsReport />
        <BoxStatisticsReport />
      </div>
      <Box>
        <div className="row">
          <p className="box__title">Doanh số bán hàng</p>
          <DatePicker
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        {/* <ChartBar /> */}
        <LineBar />
      </Box>
    </div>
  );
};
