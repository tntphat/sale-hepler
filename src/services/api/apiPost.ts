import { axiosMain } from '..';
import { objToFormData } from '../../helpers/api';

const baseUrl = 'posts/';
export const apiPosts = {
  getAll: (param: number) => {
    const url = baseUrl + 'all/' + param;
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
