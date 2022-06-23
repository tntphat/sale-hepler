import { SvgAnalysis, SvgGroups } from '../assets/svg';
import { AdminAnalysis, AdminUsers } from '../containers/Admin';

export const dataSidebarAdmin = [
  {
    title: 'Kết nối sàn',
    link: '/users',
    icon: SvgGroups,
    cpn: AdminUsers,
  },
  {
    title: 'Thống kê',
    link: '/analysis',
    icon: SvgAnalysis,
    cpn: AdminAnalysis,
  },
];
