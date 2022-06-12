import { axiosMain } from '../..';

const baseUrl = 'orders/';

export const apiOrder = {
  createOrder: (data: any) => {
    return axiosMain.post(baseUrl, data);
  },
  getOrders:() => {
    return axiosMain.get(baseUrl);
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
