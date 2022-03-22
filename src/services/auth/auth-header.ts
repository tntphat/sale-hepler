export default function authHeader() {
  const user = localStorage.getItem('user');
  if (user) {
    const accessToken = JSON.parse(user);
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return {};
  }
}
