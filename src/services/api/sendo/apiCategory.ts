import { axiosMain } from '../..';

const baseUrl = 'sendo/category/';
export const apiSendoCategory = {
  getRoot: () => {
    const url = baseUrl + 'root';
    return axiosMain.get(url);
  },
  getCategoryById: (id: number | string) => {
    const url = baseUrl + id;
    return axiosMain.get(url);
  },
};
