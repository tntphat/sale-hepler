import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { convertFullTime, formatCurrency } from '../../../../helpers';
import { apiOrder } from '../../../../services/api';
import { DropdownSelect } from '../../../common';
import './OrderDetail.scss';
interface IProduct {
  order: any;
  stateList: any[];
  isChanged: boolean;
  setIsChanged: any;
}
export const OrderDetail = ({ order, stateList, isChanged, setIsChanged }: IProduct) => {
  const [editable, setEditable] = useState<boolean>(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    const state = stateList.find((state) => state.title === order.state);
    setValue('state', state);
  }, []);

  const handleChangeStatus = (data: any) => {
    const { state } = data;
    const payload = {
      state: state.id,
    };
    apiOrder.updateOrder(payload, order._id).then((response) => {
      setIsChanged(!isChanged);
    });
    setEditable(!editable);
  };
  return (
    <div className="order-detail__order">
      <form onSubmit={handleSubmit(handleChangeStatus)}>
        <div className="order-detail__general-info">
          <p className="order-detail__time">{convertFullTime(order.createdAt)}</p>
          {editable ? (
            <Controller
              name="state"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropdownSelect
                  classNameInput="dropdown-select__res--small"
                  className="dropdown-select--small"
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
            <p className="order-detail__status">{order.state}</p>
          )}
        </div>
        {order.products.map((it: any, id: number) => {
          return (
            <div className="product" key={id}>
              <div className="product__image">
                <img className="product__img" src={it.product.images[0]}></img>
              </div>

              <div className="product__info">
                <p className="product__name">{it.product.name}</p>
                <p className="product__price">
                  {formatCurrency(it.product.exportPrice)}
                  <sup>đ</sup> x {it.quantity}
                </p>
              </div>
            </div>
          );
        })}
        <div className="order-detail__action">
          <div>
            <span>Tổng tiền: </span>
            <span className="order-detail__total-price">
              {formatCurrency(order.product_total)}
              <sup>đ</sup>
            </span>
          </div>
          {editable ? (
            <div>
              <button className="order-detail__cancel-btn">Hủy</button>
              <button type="submit" className="order-detail__action-btn">
                Lưu
              </button>
            </div>
          ) : (
            <span className="order-detail__action-btn" onClick={() => setEditable(!editable)}>
              Chỉnh sửa
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
