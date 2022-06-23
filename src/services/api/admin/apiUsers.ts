import { objToQuery } from '../../../helpers/api';
import { axiosAdmin } from '../../axios';

export const apiAdminUsers = {
  getAllUsers: (params: IParamsGetProduct) => {
    return axiosAdmin.get('users' + objToQuery(params));
  },

  getUsersByUser: (userId: number) => {
    return axiosAdmin.get('users/' + userId);
  },
  blockUser: (userId: string) => {
    return axiosAdmin.post('users/block', { userId });
  },
  unBlockUser: (userId: string) => {
    return axiosAdmin.post('users/unBlock', { userId });
  },
};
