import { axiosMain } from '../..';

const baseUrl = 'facebook/report/';
export const apiFbAuth = {
  getReportSales: (params: IParamReportSales) => {
    const url = baseUrl;
    return axiosMain.get(url, params);
  },
};
