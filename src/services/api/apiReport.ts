import { axiosMain } from '..';

const baseUrl = 'report/';
export const apiReport = {
  getReportSales: (params: IParamReportSales) => {
    const url = baseUrl + 'reportSales';
    return axiosMain.get(url, params);
  },
  getReportPost: (params: IParamReportPost) => {
    const url = baseUrl + 'reportPost';
    return axiosMain.get(url, params);
  },
};
