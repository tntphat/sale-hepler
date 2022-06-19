import { axiosMain } from '../..';

const baseUrl = 'notifications/';
export const apiBuyerNotification = {
  getAllNotifications: () => {
    return axiosMain.get(baseUrl);
  },
  markReadAllNotifications: () => {
    const url = baseUrl + 'markReadAll';
    return axiosMain.post(url);
  },
  markReadNotification: (data: any) => {
    const url = baseUrl + 'markRead';
    return axiosMain.post(url, data);
  },
  getPageNotification: (page: any) => {
    const url = baseUrl + '?page=' + page;
    return axiosMain.get(url);
  },
};
