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
  return newTime.getHours() +':' + newTime.getMinutes() + ':' + newTime.getSeconds() + " " +  newTime.getDate() + '/' + (newTime.getMonth() + 1) + '/' + newTime.getFullYear();
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

export const formatCurrency =(number: any)=>{
  if (!number) return '0';
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
