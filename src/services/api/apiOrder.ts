import { axiosMain } from '..';
import { objToQuery } from '../../helpers/api';

const baseUrl = 'orders/';
export const apiOrder = {
  getAllOrders: (page: number) => {
    const url = baseUrl;
    return axiosMain.get(url + objToQuery({ page }));
  },
  getOneOrder: (param: any) => {
    const url = baseUrl + param;
    return axiosMain.get(url);
  },
};
