import { objToQuery } from '../../../helpers/api';
import { axiosTiki } from '../../axios/axiosTiki';

const baseUrl = 'tiki/product/';
export const apiTikiProduct = {
  requestProduct: (params: IParamsProductRequest) => {
    const url = baseUrl + 'request';
    return axiosTiki.post(url, { product: params });
  },
  getProducts: (params: IParamsPaganation) => {
    const url = baseUrl + 'request';
    return axiosTiki.get(url + objToQuery(params));
  },
  getTracking: () => {
    const url = baseUrl + 'tracking';
    return axiosTiki.get(url);
  },
  getProductRequest: (param: string) => {
    const url = baseUrl + 'request/' + param;
    return axiosTiki.get(url);
  },
  deleteProductRequest: (param: string) => {
    const url = baseUrl + 'request/' + param;
    return axiosTiki.delete(url);
  },
  replayProductRequest: (param: string) => {
    const url = baseUrl + 'request/' + param + '/replay';
    return axiosTiki.post(url);
  },
};
