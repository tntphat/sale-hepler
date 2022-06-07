import axios, { AxiosError, AxiosResponse } from 'axios';
import { LOCAL_TOKEN } from '../../constants';
import { readCookie } from '../../helpers';

const baseURL =
  (process.env.NODE_ENV === 'development' ? process.env.URL_API_LOCAL : process.env.URL_API) +
  'api/';

const token = readCookie(LOCAL_TOKEN);

const axiosTiki = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
    // 'I16Xw4Lp5OlxgyKXEy-pV-MZRMcqc9Sx4QKh-od5QK0.HxpIG_kCOkxynvyZfORTjk48Z_8ZjWVU8Xe3khiaRuQ',
    // '9G2HGnpUBikWte6mcp5SxHPv9VKdi1jsmYnuLZe_NPY.g6CssFhEsuZWh0-MNc5WSu1eLNsDpckI9EZr2nMNDqY',
    // 'lcLTHbm0ogcBLctqNrhZlQdKToNdtH0fbHZu-S-Vago.49CPG32xPh8xiiJFFWhWOqu4STg0ULfP-rVXGCbH0ZQ',
  },
});
axiosTiki.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    if (res.data.result === 0) {
    }
    return res;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
    }
    throw err;
  },
);
export { axiosTiki };
