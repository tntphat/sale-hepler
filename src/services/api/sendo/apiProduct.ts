import { axiosMain } from '../..';

const baseUrl = 'sendo/product/';
export const apiSendoProduct = {
  postProduct: (params: any) => {
    const url = baseUrl + '';
    return axiosMain.post(url, params);
  },
  getUnit: () => {
    const url = baseUrl + 'enums/unit';
    return axiosMain.get(url);
  },
  getType: () => {
    const url = baseUrl + 'enums/type';
    return axiosMain.get(url);
  },
  getStatus: () => {
    const url = baseUrl + 'enums/status';
    return axiosMain.get(url);
  },
  getProducts: (params: any) => {
    const url = baseUrl + 'search';
    return axiosMain.post(url, params);
  },
  getLinkProduct: (sku: string) => {
    const url = baseUrl + sku + '/link';
    return axiosMain.get(url);
  },
};
