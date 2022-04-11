import { axiosMain } from '..';
import { setCookie } from '../../helpers';

const signup = (name: string, email: string, password: string, confirm_password: string) => {
  const data = {
    email,
    password,
    confirm_password,
  };
  return axiosMain.post('auth/sign-up', data);
};

const login = async (email: string, password: string) => {
  const data = { email, password };
  await axiosMain.post('auth/sign-in', data).then((response: any) => {
    if (response?.data) {
      const token = response.data.data.token;
      setCookie(60,token,"token")
      return response.data.user;
    } else {
      return null;
    }
  });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfor');
};

export const authService = {
  signup,
  login,
  logout,
};
