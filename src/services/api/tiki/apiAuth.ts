import { axiosMain } from '../..';

const baseUrl = 'tiki/auth/';
export const apiTikiAuth = {
  connection: (code?: string) => {
    const url = baseUrl + 'connection';
    return axiosMain.post(url, { code });
  },
  getConnection: () => {
    const url = baseUrl + 'connection';
    return axiosMain.get(url);
  },
};
