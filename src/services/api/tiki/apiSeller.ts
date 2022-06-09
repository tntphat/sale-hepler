import { axiosMain } from '../..';
import { objToQuery } from '../../../helpers/api';

const baseUrl = 'tiki/seller/';
export const apiTikiSeller = {
  getInfo: () => {
    const url = baseUrl + 'me';
    return axiosMain.get(url);
  },
  getWareHouses: (params: IParamsPaganation) => {
    const url = baseUrl + 'warehouses';
    return axiosMain.get(url + objToQuery(params));
  },
};
