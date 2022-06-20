import { SvgBell, SvgGroups, SvgHome, SvgPost, SvgSetting } from '../assets/svg';
import {
  BuyerGroups,
  BuyerHome,
  BuyerNotification,
  BuyerPost,
  BuyerSetting,
} from '../containers/Buyer';

export const dataSidebarBuyer = [
  {
    title: 'Thông báo',
    link: '/notification',
    icon: SvgBell,
    cpn: BuyerNotification,
  },
  {
    title: 'Trang chủ',
    link: '',
    icon: SvgHome,
    cpn: BuyerHome,
  },
  {
    title: 'Cài đặt',
    link: '/setting',
    icon: SvgSetting,
    cpn: BuyerSetting,
  },
  {
    title: 'Quản lý nhóm',
    link: '/groups',
    icon: SvgGroups,
    cpn: BuyerGroups,
  },
  {
    title: 'Đăng bài',
    link: '/post',
    icon: SvgPost,
    cpn: BuyerPost,
  },
];
