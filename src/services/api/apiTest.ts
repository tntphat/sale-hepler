import { axiosMain } from '..';

const baseUrl = 'courses/';
export const apiTest = {
  test: () => {
    const url = baseUrl;
    return axiosMain.get(url);
  },
};
