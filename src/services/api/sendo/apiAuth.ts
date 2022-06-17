import { axiosMain } from '../..';

const baseUrl = 'sendo/auth/';
export const apiSendoAuth = {
  connection: (params: IParamConnectionSendo) => {
    const url = baseUrl + 'connection';
    return axiosMain.post(url, params);
  },
  getConnection: () => {
    const url = baseUrl + 'connection';
    return axiosMain.get(url);
  },
};
