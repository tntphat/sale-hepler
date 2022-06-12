import React, { useEffect, useState } from 'react';
import { Box, Button } from '../../components/common';
import { apiOrder } from '../../services/api';
import './DetailOrder.scss';

export const DetailOrder = () => {
  useEffect(() => {
    apiOrder.getAllOrders(1).then(console.log);
  }, []);
  const [detailOrder, setDetailOrder] = useState({
    _id: '629b41505c1bf44494627a98',
    products: [
      {
        product: {
          _id: '62774fb0f984fe5b09744429',
          name: 'iPhone 11 Pro Max',
          sku: '0001',
          weight: 0.5,
          weightUnit: 'kg',
          importPrice: 10000000,
          exportPrice: 15000000,
          type: 'Điện thoại',
          description: 'Like new 99%',
          branch: 'Apple',
          inventoryNumber: 2,
          images: ['link1', 'link2'],
          isAllowSell: false,
          createdAt: '2022-05-08T05:05:52.250Z',
          updatedAt: '2022-05-08T05:05:52.250Z',
          __v: 0,
          createdBy: '6256e2261ea90283723d5963',
        },
        quantity: 2,
        _id: '629b41505c1bf44494627a99',
      },
      {
        product: {
          _id: '627797e95db1322e59f0323b',
          createdBy: '6256e2261ea90283723d5963',
          name: 'Xe Winner X 2023',
          sku: '0002',
          weight: 120,
          weightUnit: 'kg',
          importPrice: 10000000,
          exportPrice: 15000000,
          type: 'Điện thoại',
          description: 'Like new 99%',
          branch: 'Apple',
          inventoryNumber: 2,
          images: ['link1'],
          isAllowSell: false,
          createdAt: '2022-05-08T10:14:01.190Z',
          updatedAt: '2022-05-14T07:05:46.053Z',
          __v: 0,
        },
        quantity: 3,
        _id: '629b41505c1bf44494627a9a',
      },
      {
        product: {
          _id: '627d3e4346eea6ebad52d43c',
          createdBy: '6253128228ffd740bf82cd85',
          name: 'Bếp điện từ hehe',
          sku: 'ABCD2',
          weight: 2,
          weightUnit: 'kg',
          importPrice: 350000,
          exportPrice: 700000,
          type: 'Thời trang',
          description: 'Hà há ha hà há ha',
          branch: 'Adidas',
          inventoryNumber: 2,
          images: [
            'https://cdn.pixabay.com/photo/2022/04/23/20/51/nature-7152461__340.jpg',
            'https://cdn.pixabay.com/photo/2021/08/25/05/01/boat-6572384__340.jpg',
          ],
          isAllowSell: true,
          createdAt: '2022-05-12T17:05:07.222Z',
          updatedAt: '2022-05-14T09:24:53.179Z',
          __v: 0,
        },
        quantity: 4,
        _id: '629b41505c1bf44494627a9b',
      },
    ],
    customer_fb_id: 'abda3d13a5sd56as',
    delivery_date: '2022-05-12T17:05:07.222Z',
    product_total: '2000000',
    delivery_total: 10000,
    discount: 0.1,
    total_payment: 1810000,
    note: 'note note note',
    state: 'Đang chờ xác nhận',
    ec_site: 'Facebook',
    createdAt: '2022-06-04T11:26:08.756Z',
    updatedAt: '2022-06-04T11:26:08.756Z',
    __v: 0,
    id: '629b41505c1bf44494627a98',
  });

  return (
    <div className="detail-order">
      <Box title="Thông tin sản phẩm">
        <div className="detail-order-infor">
          <div className="detail-order-infor__img-wrapper">
            <img src="https://cdn.pixabay.com/photo/2022/04/26/20/37/coffee-7159137__340.jpg" />
          </div>
          <div className="detail-order__product-info">
            <h2>PC HP All In One 24-df1032d</h2>
            <p className="detail-order-infor__quantity">x10</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi qui
              consequatur sint aliquid eius deleniti iusto? Aliquid omnis porro est eligendi qui,
              ab, similique earum, quisquam accusantium numquam nesciunt?
            </p>
            <Button className="detail-order-infor__btn">Xem chi tiết</Button>
          </div>
        </div>
      </Box>

      <Box marginTop={20} title="Thông tin đơn hàng" position="relative">
        <div className="detail-product__grid">
          <span>Thời gian đặt hàng: </span>
          <span>12:00:00 01/01/2022</span>
          <span>Số lượng: </span>
          <span>1</span>
          <span>Tổng tiền hàng: </span>
          <span>10.000.000 đồng</span>
          <span>Phí vận chuyển: </span>
          <span>250.000 đồng</span>
          <span>Tổng tiền: </span>
          <span>250.000 đồng</span>
          <span>Ghi chú: </span>
          <span>Không</span>
          <span>Trạng thái: </span>
          <span>Chờ xác nhận</span>
        </div>
        <div className="detail-order__confirmations">
          <Button background="#16C31E">Xác nhận</Button>
          <Button background="#DE1830" marginTop={20}>
            Huỷ đơn
          </Button>
        </div>
      </Box>
      <Box marginTop={20} title="Địa chỉ giao hàng">
        <p>Nguyễn Thanh hải</p>
        <p>01234567678</p>
        <p>227 Nguyễn Văn cừ phường 7 quận 05</p>
      </Box>
    </div>
  );
};
