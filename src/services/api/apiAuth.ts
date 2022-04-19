import { axiosMain } from '..';
import { LOCAL_TOKEN } from '../../constants';
import { login, setCookie } from '../../helpers';

export const apiAuth = {
  signup: (params: IParamsSignUp) => {
    return axiosMain.post('auth/sign-up', params);
  },

  login: async (params: IParamsSignIn) => {
    await axiosMain.post('auth/sign-in', params).then((response: any) => {
      if (response?.data) {
        const token = response.data.data.token;
        // setCookie(60, token, LOCAL_TOKEN);
        login(token);
        return response.data.user;
      } else {
        return null;
      }
    });
  },

  getUserInfo: () => {
    return axiosMain.get('auth/user/info');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfor');
  },
};

// export const authService = {
//   signup,
//   login,
//   logout,
// };
