import { SvgBell, SvgGroups, SvgHome, SvgPost, SvgSetting } from '../assets/svg';
import { BuyerHome } from '../containers/Buyer';

export const dataSidebarBuyer = [
  {
    title: 'Thông báo',
    link: '/notification',
    icon: SvgBell,
    cpn: BuyerHome,
  },
  {
    title: 'Trang chủ',
    link: '',
    icon: SvgHome,
  },
  {
    title: 'Cài đặt',
    link: '/setting',
    icon: SvgSetting,
  },
  {
    title: 'Quản lý nhóm',
    link: '/groups',
    icon: SvgGroups,
  },
  {
    title: 'Đăng bài',
    link: '/post',
    icon: SvgPost,
  },
];
