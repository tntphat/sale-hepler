import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux';
import { apiOrder } from '../../../services/api';
import { OrderDetail } from './OrderDetail/OrderDetail';
import './OrderedList.scss';
export const OrderedList = ({ isAddNewOrder }: { isAddNewOrder: boolean }) => {
  const { chatUserDetails, selectedChat } = useAppSelector((state) => state.messagesSlice);

  const [orderList, setOrderList] = useState<any[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [stateList, setStateList] = useState<any[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
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
    });
  }, []);

  useEffect(() => {
    const fetchUserOrders = async () => {
      apiOrder.getOrders().then((response) => {
        let orders = response.data.data;
        orders = orders.filter((order: any) => {
          return order.customer_fb_id === chatUserDetails.id;
        });
        setOrderList(orders.reverse());
      });
    };
    fetchUserOrders();
  }, [selectedChat, isChanged, isAddNewOrder]);

  return (
    <>
      <div className="ordered-list">
        <div className="order-info__title">
          <h5>Đơn hàng đã đặt</h5>
          {isHidden ? (
            <h4
              className="information__section-action"
              onClick={() => {
                setIsHidden(false);
              }}
            >
              Hiển thị
            </h4>
          ) : (
            <span className="information__section-action" onClick={() => setIsHidden(true)}>
              Ẩn{' '}
            </span>
          )}
        </div>
        {isHidden ? (
          <></>
        ) : (
          <div className="order-info__order-list">
            {orderList.map((item: any, index: number) => {
              return (
                <OrderDetail
                  key={index}
                  order={item}
                  stateList={stateList}
                  isChanged={isChanged}
                  setIsChanged={setIsChanged}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
