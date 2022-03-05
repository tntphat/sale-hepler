import { SvgInteract, SvgMedia, SvgPost, SvgRp } from '../assets/svg';

export const dataSidebar = [
  {
    title: 'Đăng bán',
    link: '/sell',
    icon: SvgPost,
    children: [
      {
        title: 'Sàn TMDT',
        link: '/ecommerce',
      },
      {
        title: 'Facebook',
        link: '/fb',
      },
    ],
  },
  {
    title: 'Tương tác',
    link: '/sell',
    icon: SvgInteract,
    children: [
      {
        title: 'Tin nhắn',
        link: '/mess',
      },
      {
        title: 'Bình luận',
        link: '/comment',
      },
    ],
  },
  {
    title: 'Báo cáo',
    link: '/report',
    icon: SvgRp,
    children: [
      {
        title: 'Báo cáo bán hàng',
        link: '/sale',
      },
      {
        title: 'Báo cáo bài đăng',
        link: '/post',
      },
    ],
  },
  {
    title: 'Kênh bán hàng',
    link: '/channel',
    icon: SvgMedia,
  },
];
