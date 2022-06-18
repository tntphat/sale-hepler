import React from 'react';
import { SvgDecrease, SvgIncrease } from '../../../assets/svg';
import { formatCurrency } from '../../../helpers/common';
import './Product.scss';

interface IProduct {
  product: any;
  quantity: number;
  handleIncrease: any;
  handleDecrease: any;
}

export const Product = ({ product, quantity, handleIncrease, handleDecrease }: IProduct) => {
  return (
    <div className="product">
      <div className="product__image">
        <img className="product__img" src={product.images[0]}></img>
      </div>

      <div className="product__info">
        <p className="product__name">{product.name}</p>
        <p className="product__price">
          {formatCurrency(product.exportPrice)}
          <sup>đ</sup>
        </p>
      </div>

      <div className="product__qty-wrapper">
        <div onClick={() => handleIncrease(product)}>
          <SvgIncrease />
        </div>
        <span className="product__qty">{quantity}</span>
        <div onClick={() => handleDecrease(product)}>
          <SvgDecrease />
        </div>
      </div>
    </div>
  );
};
