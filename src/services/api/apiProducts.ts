import { axiosMain } from '..';
import { objToQuery } from '../../helpers/api';

const baseUrl = 'sales/products/';
export const apiProducts = {
  createProduct: (params: any) => {
    const url = baseUrl;
    return axiosMain.post(url, params);
  },
  getProducts: (params: IParamsGetProduct) => {
    const url = baseUrl;
    return axiosMain.get(url + objToQuery(params));
  },
  getCategories: () => {
    const url = baseUrl + 'enums/categories';
    return axiosMain.get(url);
  },
  deleteProducts: (params: number[]) => {
    const url = baseUrl;
    return axiosMain.delete(url, { data: { productIds: params } });
  },
  getInfoProduct: (params: number) => {
    const url = baseUrl + params;
    return axiosMain.get(url);
  },
  deleteProduct: (params: number) => {
    const url = baseUrl + params;
    return axiosMain.delete(url);
  },
  updateProduct: ({ _id, ...prod }: any) => {
    const url = baseUrl + _id;
    return axiosMain.patch(url, prod);
  },
  getPostsProduct: (params: string) => {
    const url = baseUrl + params + '/posts';
    return axiosMain.get(url);
  },
};
