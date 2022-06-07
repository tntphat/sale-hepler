import { axiosTikiMain } from '../..';
import { objToQuery } from '../../../helpers/api';
import { axiosTiki } from '../../axios/axiosTiki';

const baseUrl = 'tiki/category/';
export const apiCategory = {
  getAllCategory: () => {
    const url = baseUrl + 'all';
    return axiosTiki.get(url);
  },
  getCategory: () => {
    const url = baseUrl + 'root';
    return axiosTiki.get(url);
  },
  getCategorySpecified: (id: number | string) => {
    const url = baseUrl + id;
    return axiosTiki.get(url);
  },
  getCategoryChild: (id: number | string) => {
    const url = baseUrl + id + '/child';
    return axiosTiki.get(url);
  },
  getAttributesOfCategory: (id: number | string) => {
    const url = baseUrl + id + '/attributes';
    return axiosTiki.get(url);
  },
  getValuesOfAttributeCategory: (id: number | string, params: IParamsPaganation) => {
    const url = baseUrl + 'attributes/' + id + '/values';
    return axiosTiki.get(url + objToQuery(params));
  },
  getOptionsLabel: (id: number | string) => {
    const url = baseUrl + id + '/optionLabels';
    return axiosTiki.get(url);
  },
};
