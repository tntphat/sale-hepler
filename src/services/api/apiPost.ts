import { axiosMain } from '..';

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
  postMultiple: (params: IParamsPostReq[]) => {
    const url = baseUrl + 'post/multiple';
    return axiosMain.post(url, { postReqList: params });
  },
};
