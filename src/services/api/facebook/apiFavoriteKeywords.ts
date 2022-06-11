import { axiosMain } from '../..';
import { objToQuery } from '../../../helpers/api';

const baseUrl = 'facebook/favoriteKeywords/';
export const apiFavoriteKeywords = {
  createKeyword: (content: string) => {
    const url = baseUrl;
    return axiosMain.post(url, { content });
  },
  getListKeyword: (page: string | number) => {
    const url = baseUrl;
    return axiosMain.get(url + objToQuery({ page }));
  },
  deleteKeyword: (id: string | number) => {
    const url = baseUrl + id;
    return axiosMain.delete(url);
  },
};
