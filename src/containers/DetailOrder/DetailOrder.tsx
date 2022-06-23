import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, DropdownSelect } from '../../components/common';
import { Loader } from '../../components/common/Loader/Loader';
import { convertTime, formatCurrency } from '../../helpers';
import { apiOrder } from '../../services/api';
import './DetailOrder.scss';

export const DetailOrder = () => {
  const { id } = useParams();
  const [stateList, setStateList] = useState<any[]>([]);
  const [detailOrder, setDetailOrder] = useState<any>();
  const [editable, setEditable] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (!id) return;
    apiOrder.getOneOrder(id).then((res) => {
      setDetailOrder(res.data.data);
    });
  }, [id, editable]);

  const {
    _id,
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

  useEffect(() => {
    apiOrder.getOrderStates().then((response) => {
      let states = response.data.data;
      let stateArray = Object.keys(states).map(function (key) {
        return states[key];
      });

      stateArray = stateArray.map((state) => {
        return {
          id: state.code,
          title: state.description,
        };
      });
      setStateList(stateArray);
      const status = stateArray.find((item) => item.title === state);
      setValue('state', status);
    });
  }, [state]);

  const handleChangeStatus = (data: any) => {
    const { state } = data;
    const payload = {
      state: state.id,
    };
    apiOrder.updateOrder(payload, _id).then((res) => {
      setEditable(!editable);
    });
  };

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

      {customer && (
        <Box marginTop={20} title="Địa chỉ giao hàng">
          <p>{customer_name}</p>
          <p>{customer.phoneNumber}</p>
          <p>{customer.detailAddress}</p>
        </Box>
      )}

      <form onSubmit={handleSubmit(handleChangeStatus)}>
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
            {/* <span>{state}</span> */}
            {editable ? (
              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DropdownSelect
                    classNameInput="dropdown-select__res--small"
                    className="dropdown-select--small form-field--mt-0"
                    data={stateList}
                    placeholder="Chọn trạng thái"
                    onChange={(e: any) => {
                      onChange(e);
                    }}
                    value={value}
                    error={errors.state?.message}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'Vui lòng chọn trạng thái',
                  },
                }}
              />
            ) : (
              <p className="detail-order__status">{state}</p>
            )}
          </div>
          {/* <div className="detail-order__confirmations">
          <Button background="#16C31E">Xác nhận</Button>
          <Button background="#DE1830" marginTop={20}>
            Huỷ đơn
          </Button>
        </div> */}
        </Box>
        {editable ? (
          <div>
            <button type="submit" className=" button submit-button">
              Lưu
            </button>
          </div>
        ) : (
          <button onClick={() => setEditable(!editable)} className=" button submit-button">
            Chỉnh sửa
          </button>
        )}
      </form>
    </div>
  );
};
