import axios, { AxiosError, AxiosResponse } from 'axios';
import { LOCAL_TOKEN } from '../../constants';
import { readCookie } from '../../helpers';

const baseURL = process.env.URL_API;
const token = readCookie(LOCAL_TOKEN);

const axiosMain = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: token || 'a',
  },
});
axiosMain.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    if (res.data.result === 0) {
    }
    return res;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
    }
    throw err;
  }
);
export { axiosMain };
