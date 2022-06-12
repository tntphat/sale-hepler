import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SvgAdd } from '../../assets/svg/SvgAdd';
import { useLocation } from '../../hooks';
import { Button, DropdownSelect, InputText } from '../common';
import { Scrollbar } from '../common/Srollbar/Scrollbar';
import { Information } from './Information/Information';
import { Order } from './Order/Order';
import './OrderInformation.scss';
import { OrderedList } from './OrderedList/OrderedList';
export const OrderInformation = () => {
  const [isAddNewOrder, toggleIsAddNewOrder] = useState<boolean>(false);
  return (
    <div className="order-info">
      <Scrollbar classname="scrollbar__order-information">
        <Information />
        <Order isAddNewOrder={isAddNewOrder} toggleIsAddNewOrder={toggleIsAddNewOrder} />
        <OrderedList isAddNewOrder={isAddNewOrder} />
        {/* <div className="order-info__tag">
          <div className="order-info__title">
            <h5>Nhãn</h5>
            <SvgAdd />
          </div>
          <Tag name="Quan trọng" color="red" />
          <Tag name="VIP" color="green" />
          <Tag name="Boom hàng" color="gray" />
        </div> */}
      </Scrollbar>
    </div>
  );
};
