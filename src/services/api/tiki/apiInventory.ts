import { axiosMain } from '../..';

const baseUrl = 'tiki/inventory/';
export const apiTikiInventory = {
  getAll: () => {
    const url = baseUrl + 'all';
    return axiosMain.get(url);
  },
};
