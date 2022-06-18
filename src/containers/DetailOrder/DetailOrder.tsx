import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button } from '../../components/common';
import { Loader } from '../../components/common/Loader/Loader';
import { convertTime, formatCurrency } from '../../helpers';
import { apiOrder } from '../../services/api';
import './DetailOrder.scss';

export const DetailOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    apiOrder.getOneOrder(id).then((res) => {
      setDetailOrder(res.data.data);
    });
  }, [id]);
  const [detailOrder, setDetailOrder] = useState();
  const {
    customer,
    products,
    createdAt,
    total_payment,
    state,
    product_total,
    note,
    delivery_total,
    customer_name,
  } = detailOrder || {};
  if (!detailOrder) return <Loader />;
  return (
    <div className="detail-order">
      <Box title="Thông tin sản phẩm">
        {products?.map(({ product, quantity, _id }) => (
          <div className="detail-order-infor" key={_id}>
            <div className="detail-order-infor__img-wrapper">
              <img src={product.images[0]} />
            </div>
            <div className="detail-order__product-info">
              <h2>{product.name}</h2>
              <p className="detail-order-infor__quantity">x{quantity}</p>
              <p>{formatCurrency(product.exportPrice)}</p>
              <Button
                className="detail-order-infor__btn"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        ))}
      </Box>

      <Box marginTop={20} title="Thông tin đơn hàng" position="relative">
        <div className="detail-product__grid">
          <span>Thời gian đặt hàng: </span>
          <span>{convertTime(createdAt)}</span>
          <span>Số lượng: </span>
          <span>{products?.reduce((prev, cur) => prev + cur.quantity, 0)}</span>
          <span>Tổng tiền hàng: </span>
          <span>{formatCurrency(product_total)}</span>
          <span>Phí vận chuyển: </span>
          <span>{formatCurrency(delivery_total)}</span>
          <span>Tổng tiền: </span>
          <span>{formatCurrency(total_payment)}</span>
          <span>Ghi chú: </span>
          <span>{note || 'Không'}</span>
          <span>Trạng thái: </span>
          <span>{state}</span>
        </div>
        <div className="detail-order__confirmations">
          <Button background="#16C31E">Xác nhận</Button>
          <Button background="#DE1830" marginTop={20}>
            Huỷ đơn
          </Button>
        </div>
      </Box>
      {customer && (
        <Box marginTop={20} title="Địa chỉ giao hàng">
          <p>{customer_name}</p>
          <p>{customer.phoneNumber}</p>
          <p>{customer.detailAddress}</p>
        </Box>
      )}
    </div>
  );
};
