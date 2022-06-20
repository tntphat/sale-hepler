import {
  SvgInteract,
  SvgManagePost,
  SvgMedia,
  SvgOrder,
  SvgPacket,
  SvgPost,
  SvgRp,
  SvgTemplate,
} from '../assets/svg';

export const COLOR = {
  PRIMARY: '#003ad2',
  FACEBOOK: '#0a69e1',
  TIKI: '#1a94ff',
  SENDO: '#d9292a',
};

export const dataSidebar = [
  {
    title: 'Đăng bán',
    link: '/sell',
    icon: SvgPost,
    children: [
      {
        title: 'Tiki',
        link: '/tiki',
      },
      {
        title: 'Facebook',
        link: '/fb',
      },
      {
        title: 'Sendo',
        link: '/sendo',
      },
    ],
  },
  {
    title: 'Tin nhắn',
    link: '/messenger',
    icon: SvgInteract,
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
    link: '/connect',
    icon: SvgMedia,
  },
  {
    title: 'Bài viết mẫu',
    link: '/templates',
    icon: SvgTemplate,
  },
  {
    title: 'Bài đăng',
    link: '/manage',
    icon: SvgManagePost,
    children: [
      {
        title: 'Facebook',
        link: '/fb',
      },
      {
        title: 'Tiki',
        link: '/tiki',
      },
      {
        title: 'Sendo',
        link: '/sendo',
      },
    ],
  },
  {
    title: 'Sản phẩm',
    link: '/product',
    icon: SvgPacket,
  },
  {
    title: 'Đơn hàng',
    link: '/order',
    icon: SvgOrder,
  },
];

export const LIMIT_DATA = 15;

export const dataHeaderTableProductCore = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã sản phẩm',
    // width: '80px',
    width: '13%',
  },
  {
    title: 'Tên Sản phẩm',
    // minWidth: '300px',
  },
  {
    title: 'Loại',
    // width: '140px',
    width: '10%',
  },
  {
    title: 'Số lượng',
    // width: '60px',
    width: '8%',
  },
  {
    title: 'Giá',
    // width: '100px',
    width: '10%',
  },
  {
    title: 'Sàn',
    // width: '100px',
    width: '8%',
  },
  {
    title: 'Ngày tạo',
    // width: '100px',
    width: '11%',
  },
  {
    title: 'Trạng thái',
    // width: '120px',
    width: '11%',
  },
  {
    title: 'Hành động',
    // width: '80px',
    width: '8%',
  },
];

export const dataHeaderTableProduct = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã sản phẩm',
    // width: '80px',
    width: '13%',
  },
  {
    title: 'Tên Sản phẩm',
    // minWidth: '300px',
  },
  {
    title: 'Loại',
    // width: '140px',
    width: '13%',
  },
  {
    title: 'Số lượng',
    // width: '60px',
    width: '12%',
  },
  {
    title: 'Giá',
    // width: '100px',
    width: '12%',
  },
  {
    title: 'Ngày tạo',
    // width: '100px',
    width: '11%',
  },
  {
    title: 'Trạng thái',
    // width: '120px',
    width: '11%',
  },
  {
    title: 'Hành động',
    // width: '80px',
    width: '10%',
  },
];

export const dataHeaderTableOrder = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã đơn hàng',
    width: '10%',
  },
  {
    title: 'Tên Khách hàng',
    width: '12%',
  },
  {
    title: 'Sản phẩm',
  },
  {
    title: 'Sàn',
    width: '10%',
  },
  {
    title: 'Tổng tiền',
    width: '12%',
  },
  {
    title: 'Ngày đặt',
    width: '11%',
  },
  {
    title: 'Trạng thái',
    width: '12%',
  },
  {
    title: 'Hành động',
    width: '8%',
  },
];

export const dataHeaderTableManagePost = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã bài đăng',
    width: '10%',
  },
  {
    title: 'Bài đăng',
  },
  {
    title: 'Sản phẩm',
    width: '15%',
  },
  {
    title: 'Nhóm đăng',
    width: '13%',
  },
  {
    title: 'Ngày đăng',
    width: '10%',
  },
  {
    title: 'Hành động',
    width: '10%',
  },
];
export const dataCategory = [
  'Thiết bị điện tử',
  'Áo quần',
  'Giày dép',
  'Mũ nón',
  'Phụ kiện',
  'Phụ tùng xe',
  'Đồ gia dụng',
  'Thức ăn',
  'Đồ uống',
  'Đồ dùng học tập',
  'Sách',
].map((item, index) => ({ title: item, id: index + 1 }));

export const dataUnit = [
  {
    id: 1,
    title: 'kg',
  },
  {
    id: 2,
    title: 'gam',
  },
  {
    id: 3,
    title: 'tấn',
  },
];

export const dataUnitDimension = [
  {
    id: 1,
    title: 'cm',
  },
  {
    id: 2,
    title: 'mm',
  },
  {
    id: 3,
    title: 'm',
  },
];

export const dataBranch = [
  {
    id: 1,
    title: 'Nike',
  },
  {
    id: 2,
    title: 'Adidas',
  },
  {
    id: 3,
    title: 'Apple',
  },
  {
    id: 4,
    title: 'Samsung',
  },
  {
    id: 4,
    title: 'Xiaomi',
  },
];

export const dataFieldsTemplate = {
  name: 'Tên',
  sku: 'Mã sku',
  weight: 'Khối lượng',
  weightUnit: 'Đơn vị',
  importPrice: 'Giá nhập',
  exportPrice: 'Giá bán',
  type: 'Loại sản phẩm',
  description: 'Mô tả sản phẩm',
  // branch: 'Thương hiệu',
  // inventoryNumber: 'Loại hàng',
  // images: 'Hình ảnh',
  // isAllowSell: 'Cho phép bán',
};

const dataFieldsTemplateReverse2 = {};

Object.keys(dataFieldsTemplate).forEach((item) => {
  dataFieldsTemplateReverse2[dataFieldsTemplate[item]] = item;
});

export const dataFieldsTemplateReverse = dataFieldsTemplateReverse2;
