export const getParameterByName = (name: string, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const convertTime = (time: string) => {
  const newTime = new Date(time);
  return newTime.getDate() + '/' + (newTime.getMonth() + 1) + '/' + newTime.getFullYear();
};
