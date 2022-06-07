import { axiosMain } from '../../';
import { objToFormData, objToQuery } from '../../../helpers/api';

const baseUrl = '/facebook/templatePost/';
export const apiFbPostTemplates = {
  generatePost: (templateId: number, productId: number) => {
    const url = baseUrl + templateId + '/products/' + productId;
    return axiosMain.get(url);
  },
  createTemplatePost: (params: IParamCreateTemplatePost) => {
    const url = baseUrl;
    return axiosMain.post(url, params);
  },
  getListTemplate: (params) => {
    const url = baseUrl;
    return axiosMain.get(url + objToQuery(params));
  },
  getSpecificTemplate: (params: number) => {
    const url = baseUrl + params;

    return axiosMain.get(url);
  },
  deleteTemplate: (params: number) => {
    const url = baseUrl + params;

    return axiosMain.delete(url);
  },
  deleteMultipleTemplate: (params: number[]) => {
    const url = baseUrl;

    return axiosMain.delete(url, { data: { productIds: params } });
  },
  editTemplate: (params: IParamCreateTemplatePost & { id: number }) => {
    const { id, ...rest } = params;
    const url = baseUrl + id;

    return axiosMain.patch(url, { ...rest });
  },
};
