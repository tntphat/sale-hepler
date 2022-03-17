import { axiosMain } from '..';

const baseUrl = 'groups/';
export const apiGroups = {
  getAll: () => {
    const url = baseUrl + 'all';
    return axiosMain.get(url);
  },
};
