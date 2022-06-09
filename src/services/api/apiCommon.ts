import { axiosMain } from '..';
import { objToFormData } from '../../helpers/api';

const baseUrl = 'common/';
export const apiCommon = {
  getLinkImage: (params: any) => {
    const url = baseUrl + 'getLinkImage';
    // const imgUrls = params.images.filter(img => typeof(img) === 'string');
    const imgUrls = [];
    const imgFiles = [];
    params.images.forEach((img) => {
      typeof img === 'string' ? imgUrls.push(img) : imgFiles.push(img);
    });
    return axiosMain.post(url, objToFormData({ images: imgFiles })).then((res) => {
      return Promise.resolve({ data: [...res.data, ...imgUrls] });
    });
  },
};
