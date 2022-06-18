import React, { useState } from 'react';
import { useAppSelector } from '../../../redux';
import { apiMessages, apiOrder } from '../../../services/api';
import { Button, InputText } from '../../common';
import { ModalForm } from '../../common/Modal';
import { Product } from '../Product/Product';
import { TableProduct } from '../TableProduct/TableProduct';
import './Order.scss';
export const Order = ({
  isAddNewOrder,
  toggleIsAddNewOrder,
}: {
  isAddNewOrder: boolean;
  toggleIsAddNewOrder: any;
}) => {
  const { chatUserDetails, selectedChat } = useAppSelector((state) => state.messagesSlice);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [note, setNote] = useState<string>('');
  const [isHasAddress, setIsHasAddress] = useState<boolean>(true);
  const onChangeNote = (e: any) => {
    setNote(e.target.value);
  };

  const getUserAddresses = async () => {
    const info = await apiMessages.getCustomerInfo(selectedChat);
    const address = info?.data.data.customerInfo.detailAddress;
    console.log('aaa', address);
    if (!address) {
      setIsHasAddress(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const address = await getUserAddresses();
    if (!address) {
      return;
    }
    const userId = chatUserDetails.id;
    let total_price = 0;
    const productList = selectedProducts.map((item: any) => {
      total_price += item.product.exportPrice * item.quantity;
      return {
        product: item.product.id,
        quantity: item.quantity,
      };
    });

    const payload = {
      products: [...productList],
      customer_fb_id: userId,
      product_total: total_price,
      delivery_total: 0,
      total_payment: total_price,
      note: note,
      ec_site: 1,
      thread_id: selectedChat,
      customer_name: chatUserDetails.name,
    };
    apiOrder.createOrder(payload).then((response) => {
      toggleIsAddNewOrder(!isAddNewOrder);
    });
    setSelectedProducts([]);
    setNote('');
  };

  const handleSubmitProduct = () => {
    setIsOpen(false);
  };

  const handleIncrease = (item: any) => {
    let tmpProducts = [...selectedProducts];
    tmpProducts = tmpProducts.map((pro) => {
      return item._id === pro.product._id
        ? {
            ...pro,
            quantity: pro.quantity + 1,
          }
        : pro;
    });
    setSelectedProducts(tmpProducts);
  };
  const handleDecrease = (item: any) => {
    let tmpProducts = [...selectedProducts];
    const pro = tmpProducts.find((p) => p.product.id === item.id);
    if (pro.quantity === 1) {
      tmpProducts = tmpProducts.filter((p) => p.product.id !== item.id);
      setSelectedProducts(tmpProducts);
    } else {
      tmpProducts = tmpProducts.map((pro) => {
        return item._id === pro.product._id
          ? {
              ...pro,
              quantity: pro.quantity - 1,
            }
          : pro;
      });
      setSelectedProducts(tmpProducts);
    }
  };

  return (
    <>
      <div className="order__product">
        <div className="order-info__title">
          <h5>Sản phẩm</h5>
          <h4
            className="information__section-action"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Thêm
          </h4>
        </div>
        {selectedProducts.length > 0 ? (
          <>
            {selectedProducts.map((item: any, id: any) => {
              return (
                <Product
                  product={item.product}
                  quantity={item.quantity}
                  key={id}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                />
              );
            })}
            <div className="order__note">
              <InputText onChange={onChangeNote} value={note} placeholder="Ghi chú" />
            </div>
            <p className="order__warning" hidden={isHasAddress}>
              Vui lòng cập nhật thông tin khách hàng
            </p>
            <div className="order__button">
              <Button onClick={handleSubmit} className="button-right">
                Tạo đơn hàng
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <ModalForm handleSubmit={handleSubmitProduct} isOpen={isOpen} setIsOpen={setIsOpen}>
        <TableProduct
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          isOpenModal={isOpen}
        />
      </ModalForm>
    </>
  );
};
