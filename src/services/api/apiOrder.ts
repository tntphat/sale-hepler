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
  createOrder: (data: any) => {
    return axiosMain.post(baseUrl, data);
  },
  getOrders:() => {
    const url = baseUrl + 'all';
    return axiosMain.get(url);
  },
  getOrderStates:() => {
    const url =baseUrl + 'enums/state'  ;
    return axiosMain.get(url);
  },
  updateOrder: (data: any, orderId: number | string) => {
    const url =  baseUrl + orderId;
    return axiosMain.patch(url, data);
  }  
};
