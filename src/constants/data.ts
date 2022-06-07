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
      {
        title: 'Sendo',
        link: '/sendo',
      },
    ],
  },
  {
    title: 'Tương tác',
    link: '/interact',
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

export const dataHeaderTableProduct = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã sản phẩm',
    width: '80px',
  },
  {
    title: 'Tên Sản phẩm',
    // minWidth: '300px',
  },
  {
    title: 'Loại',
    width: '140px',
  },
  {
    title: 'Số lượng',
    width: '60px',
  },
  {
    title: 'Giá',
    width: '80px',
  },
  {
    title: 'Ngày tạo',
    width: '80px',
  },
  {
    title: 'Trạng thái',
    width: '120px',
  },
  {
    title: 'Hành động',
    width: '80px',
  },
];

export const dataHeaderTableOrder = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã đơn hàng',
    width: '120px',
  },
  {
    title: 'Tên Khách hàng',
    width: '250px',
  },
  {
    title: 'Sản phẩm',
  },
  {
    title: 'Sàn',
    width: '100px',
  },
  {
    title: 'Tổng tiền',
    width: '150px',
  },
  {
    title: 'Ngày đặt',
    width: '120px',
  },
  {
    title: 'Trạng thái',
    width: '160px',
  },
  {
    title: 'Hành động',
    width: '80px',
  },
];

export const dataHeaderTableManagePost = [
  // {
  //   title: '',
  //   width: '50px',
  // },
  {
    title: 'Mã bài đăng',
    width: '100px',
  },
  {
    title: 'Bài đăng',
  },
  {
    title: 'Sản phẩm',
    width: '250px',
  },
  {
    title: 'Nhóm đăng',
    width: '200px',
  },
  {
    title: 'Ngày đăng',
    width: '120px',
  },
  {
    title: 'Hành động',
    width: '80px',
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
  branch: 'Thương hiệu',
  inventoryNumber: 'Loại hàng',
  images: 'Hình ảnh',
  isAllowSell: 'Cho phép bán',
};

const dataFieldsTemplateReverse2 = {};

Object.keys(dataFieldsTemplate).forEach((item) => {
  dataFieldsTemplateReverse2[dataFieldsTemplate[item]] = item;
});

export const dataFieldsTemplateReverse = dataFieldsTemplateReverse2;
