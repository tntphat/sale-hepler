import axios, { AxiosError, AxiosResponse } from 'axios';
import { LOCAL_TOKEN } from '../../constants';
import { readCookie } from '../../helpers';

const baseURL =
  (process.env.NODE_ENV === 'development' ? process.env.URL_API_LOCAL : process.env.URL_API) +
  'api/';
const token = readCookie(LOCAL_TOKEN);

const axiosMain = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});
axiosMain.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    // if (res.data.meta === false) {
    // }
    return res;
  },
  (err: AxiosError) => {
    // if (err.response?.status === 401) {
    // }
    throw err;
  },
);
export { axiosMain };
