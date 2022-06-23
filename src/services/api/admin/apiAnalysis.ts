import { objToQuery } from '../../../helpers/api';
import { axiosAdmin } from '../../axios';

export const apiAdminAnalysis = {
  getAllAnalysis: (params: IParamsGetProduct) => {
    return axiosAdmin.get('analysis' + objToQuery(params));
  },

  getAnalysisByUser: (userId: number) => {
    return axiosAdmin.get('analysis/' + userId);
  },
};
