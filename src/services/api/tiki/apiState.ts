import { axiosMain } from '../..';
import { objToQuery } from '../../../helpers/api';

const baseUrl = 'tiki/state/';
export const apiTikiState = {
  getAll: () => {
    const url = baseUrl + 'all';
    return axiosMain.get(url);
  },
};
