import axios from 'axios';
const API_URL = process.env.URL_API;
const signup = (name: string, email: string, password: string, confirm_password: string) => {
  const data = {
    email,
    password,
    confirm_password,
  };
  return axios.post(API_URL + 'api/auth/sign-up', data);
};

const login = async (email: string, password: string) => {
  const data = { email, password };
  await axios.post(API_URL + 'api/auth/sign-in', data).then((response: any) => {
    if (response?.data) {
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
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
