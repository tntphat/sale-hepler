import { axiosMain } from '..';
import { objToFormData, objToQuery } from '../../helpers/api';

const baseUrl = 'posts/';
export const apiPosts = {
  getAll: (params: any) => {
    const url = baseUrl;
    return axiosMain.get(url + objToQuery(params));
  },
  getSpecificPost: (params: string) => {
    const url = baseUrl + params;
    return axiosMain.get(url);
  },
  post: (params: IParamPost) => {
    const url = baseUrl + 'post';
    return axiosMain.post(url, params);
  },
  postMultiple: (params: IParamsPostMultiple) => {
    const url = baseUrl + 'post/multiple';
    return axiosMain.post(url, objToFormData(params));
  },
  postTest: (params: any) => {
    const url = baseUrl + 'test';
    const fd = objToFormData(params);

    return axiosMain.post(url, fd);
  },
};
