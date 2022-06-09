import React from 'react';
import { Box, Button } from '../../components/common';
import './DetailOrder.scss';

export const DetailOrder = () => {
  return (
    <div className="detail-order">
      <Box title="Thông tin sản phẩm">
        <div className="detail-order-infor">
          <div className="detail-order-infor__img-wrapper">
            <img src="https://cdn.pixabay.com/photo/2022/04/26/20/37/coffee-7159137__340.jpg" />
          </div>
          <div className="detail-order__product-info">
            <h2>PC HP All In One 24-df1032d</h2>
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
