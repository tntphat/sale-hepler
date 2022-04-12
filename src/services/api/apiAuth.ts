import { axiosMain } from '..';

const baseUrl = 'auth/';
export const apiAuth = {
  facebook: (accessToken?: string) => {
    const url = baseUrl + 'facebook';
    return axiosMain.post(url, { accessToken });
  },
};
