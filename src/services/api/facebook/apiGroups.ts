import { axiosMain } from '../..';

const baseUrl = 'facebook/groups/';
export const apiFbGroups = {
  getAll: () => {
    const url = baseUrl + 'all';
    return axiosMain.get(url);
  },
};
