import React, { useEffect, useMemo, useState } from 'react';
import { ChartBar } from '../../components/Bar/ChartBar';
import { LineBar } from '../../components/Bar/LineBar';
import { Box, Button, Table } from '../../components/common';
import { BoxStatisticsReport } from './BoxStatisticsReport';
import './Report.scss';
import DatePicker from 'react-datepicker';
import { apiReport } from '../../services/api';
import { Loader } from '../../components/common/Loader/Loader';

export const ReportPost = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [hasMonth, setHasMonth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataReport, setDataReport] = useState();
  useEffect(() => {
    const month = startDate.getMonth() + 1;
    const year = startDate.getFullYear();
    setLoading(true);
    // apiReport.getReportPost({ year, ...(hasMonth && { month }) });
    apiReport.getReportPost({ year, ...(hasMonth && { month }) }).then((res) => {
      setDataReport(res.data.data);
      setLoading(false);
    });
  }, [startDate, hasMonth]);

  const memoizedChartData = useMemo(() => {
    if (!dataReport) return null;
    return dataReport.chartData
      .sort((a, b) => (hasMonth ? a._id - b._id : a._id.month - b._id.month))
      .map((data) => ({
        name: hasMonth ? 'Ngày' + new Date(data._id).getDate() : 'Tháng ' + data._id.month,
        value: data.interactions,
        value2: data.noOfPosts,
      }));
  }, [dataReport]);
  return (
    <div className="report">
      <div className="report__grid-4">
        <BoxStatisticsReport
          title="Số bài viết đã đăng"
          count={dataReport?.publishedPosts}
          color="#FA582E"
        />
        <BoxStatisticsReport
          title="Số lượt tương tác"
          count={dataReport?.interactions}
          color="#0163DE"
        />
        {/* <BoxStatisticsReport
          title="Sản phẩm tồn kho"
          count={dataReport?.inventories}
          color="#0FBB59"
        />
        <BoxStatisticsReport
          title="Sản phẩm đến tay người dùng"
          count={dataReport?.deliveries}
          color="#7828DC"
        /> */}
      </div>
      <Box marginTop={20}>
        <div className="row">
          <p className="box__title">Doanh số bán hàng</p>
          <div style={{ display: 'flex' }}>
            <Button
              width="fit-content"
              backgroundColor={hasMonth ? '' : '#b2bec3'}
              cursor={hasMonth ? 'default' : ''}
              onClick={() => setHasMonth(true)}
            >
              Theo tháng, năm
            </Button>
            <Button
              margin="0 10px"
              backgroundColor={!hasMonth ? '' : '#b2bec3'}
              onClick={() => setHasMonth(false)}
              cursor={!hasMonth ? 'default' : ''}
            >
              Theo năm
            </Button>
            <DatePicker
              showYearPicker={!hasMonth}
              showMonthYearPicker={hasMonth}
              dateFormat={hasMonth ? 'MMMM yyyy' : 'yyyy'}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>
        </div>
        {/* <ChartBar /> */}
        {loading ? (
          <Loader />
        ) : (
          memoizedChartData && (
            <LineBar
              data={memoizedChartData}
              nameValue="Số bài post"
              nameValue2="Số lượt tương tác"
            />
          )
        )}
      </Box>
    </div>
  );
};
