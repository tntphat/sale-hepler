import React, { useState } from 'react';
import { useAppSelector } from '../../../redux';
import { apiOrders } from '../../../services/api';
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
  const { chatUserDetails } = useAppSelector((state) => state.messagesSlice);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [note, setNote] = useState<string>('');

  const onChangeNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleSubmit2 = () => {
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
    };
    apiOrders.createOrder(payload).then((response) => {
      toggleIsAddNewOrder(!isAddNewOrder);
    });
    setSelectedProducts([]);
    setNote('');
  };

  const handleSubmitProduct = () => {
    setIsOpen(false);
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
              return <Product product={item.product} quantity={item.quantity} key={id} />;
            })}
            <div className="order__note">
              <InputText onChange={onChangeNote} value={note} placeholder="Ghi chú" />
            </div>
            <div className="order__button">
              <Button onClick={handleSubmit2} className="button-right">
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
