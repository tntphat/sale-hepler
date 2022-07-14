import { axiosMain } from '../..';

const baseUrl = 'auth/facebook/';
export const apiFbAuth = {
  login: (accessToken: string) => {
    const url = baseUrl + 'oauth';
    return axiosMain.post(url, { accessToken });
  },
  connect: (accessToken: string) => {
    const url = baseUrl + 'connection';
    return axiosMain.post(url, { accessToken });
  },
};
