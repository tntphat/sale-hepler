import moment from 'moment';
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

export const convertFullTime = (time: string) => {
  const newTime = new Date(time);
  return (
    newTime.getHours().toString().padStart(2, '0') +
    ':' +
    newTime.getMinutes().toString().padStart(2, '0') +
    ':' +
    newTime.getSeconds().toString().padStart(2, '0') +
    ' ' +
    newTime.getDate().toString().padStart(2, '0') +
    '/' +
    (newTime.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    newTime.getFullYear()
  );
};

export const convertWeightByUnit = (value: number, unitFrom: string, unitTo: string) => {
  console.log(value, unitFrom, unitTo);

  if (unitFrom === unitTo) return value;
  let gamValue;
  switch (unitFrom) {
    case 'tấn':
      gamValue = value * 1000 * 1000;
      break;
    case 'kg':
      gamValue = value * 1000;
      break;
    default:
      gamValue = value;
  }

  switch (unitTo) {
    case 'tấn':
      return gamValue / 1000 / 1000;
    case 'kg':
      return gamValue / 1000;
    default:
      return gamValue;
  }
};

export const formatCurrency = (number: any) => {
  if (!number) return '0';
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const fromNowTranslation = (date = moment().fromNow(), now: any) => {
  const result = moment(date).from(moment(now));

  let output = date.format('DD/MM/YYYY HH:mm');
  if (result.indexOf('a few seconds') >= 0 || result.indexOf('in a minute') >= 0) {
    output = 'Vừa đăng';
  }

  if (result.indexOf('a minute ago') >= 0) output = result.replace('a minute ago', '1 phút trước');

  if (result.indexOf('minutes ago') >= 0) output = result.replace('minutes ago', 'phút trước');

  if (result.indexOf('an hour ago') >= 0) output = result.replace('an hour ago', '1 giờ trước');

  if (result.indexOf('hours ago') >= 0) output = result.replace('hours ago', 'giờ trước');

  if (result.indexOf('a day ago') >= 0) output = result.replace('a day ago', 'hôm qua');

  // if (result.indexOf('days ago') >= 0) output = result.replace('days ago', 'ngày trước');

  // if (result.indexOf('a month ago') >= 0) output = result.replace('a month ago', '1 tháng trước');

  // if (result.indexOf('months ago') >= 0) output = result.replace('months ago', 'tháng trước');

  // if (result.indexOf('a year ago') >= 0) output = result.replace('a year ago', '1 năm trước');

  // if (result.indexOf('years ago') >= 0) output = result.replace('years ago', 'năm trước');

  return capitalizeFirstLetter(output);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
