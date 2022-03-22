import axios from 'axios';
// const API_URL = process.env.URL_API;
const API_URL = 'http://localhost:8080/api/';
// const API_URL = 'https://follclassroom-api.herokuapp.com/api/';
const signup = (name: string, email: string, password: string, confirm_password: string) => {
  const data = {
    name,
    email,
    password,
    confirm_password,
  };
  return axios.post(API_URL + 'sign-up', data);
};

const login = async (email: string, password: string) => {
  const data = { email, password };
  await axios.post(API_URL + 'sign-in', data).then((response: any) => {
    console.log(response);
    if (response?.data?.authorization) {
      const token = response.data.authorization;
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
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
