import { axiosAdmin } from '../../axios';

export const apiAdminAuth = {
  signIn: (params: { username: string; password: string }) => {
    return axiosAdmin.post('auth/sign-in', params);
  },
};
