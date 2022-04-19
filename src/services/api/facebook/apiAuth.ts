import { axiosMain } from '../..';

const baseUrl = 'facebook/auth/';
export const apiFbAuth = {
  login: (accessToken: string) => {
    const url = baseUrl;
    return axiosMain.post(url, { accessToken });
  },
  connect: (accessToken: string) => {
    const url = baseUrl + 'connection';
    return axiosMain.post(url, { accessToken });
  },
};
