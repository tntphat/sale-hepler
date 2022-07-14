export const objToFormData = (object: any): FormData => {
  const fd = new FormData();
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) {
        object[key].forEach((file) => {
          fd.append(key, file);
        });
      } else fd.append(key, object[key]);
    }
  }
  return fd;
};

export const objToQuery = (obj: any): string => {
  if (!obj) return '';

  const query = [];

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      query.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
    }
  }

  return '?' + query.join('&');
};
