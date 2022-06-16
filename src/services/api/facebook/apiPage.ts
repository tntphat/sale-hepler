import { axiosMain } from '../../';

const baseUrl = '/facebook/pages/';
export const apiPages = {
  getAll: () => {
    const url = baseUrl + 'all';
    return axiosMain.get(url);
  },
  getConnectedPages: () => {
    return axiosMain.get(baseUrl);
  },
  connectPage: (data: any) => {
    const url = baseUrl + 'connect';
    return axiosMain.post(url, data);
  },
};
