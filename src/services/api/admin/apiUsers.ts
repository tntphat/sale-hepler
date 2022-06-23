import { objToQuery } from '../../../helpers/api';
import { axiosAdmin } from '../../axios';

export const apiAdminUsers = {
  getAllUsers: (params: IParamsGetProduct) => {
    return axiosAdmin.get('users' + objToQuery(params));
  },

  getUsersByUser: (userId: number) => {
    return axiosAdmin.get('users/' + userId);
  },
};
