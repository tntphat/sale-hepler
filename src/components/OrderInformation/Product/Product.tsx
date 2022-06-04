import React from 'react';
import { SvgDecrease, SvgIncrease } from '../../../assets/svg';
import './Product.scss';

export const Product = ({ img }: { img: string }) => {
  return (
    <div className="product">
      <div className="product__image">
        <img className="product__img" src={img}></img>
      </div>

      <div className="product__info">
        <p className="product__name">Ten san pham</p>
        <p className="product__price">45000d</p>
      </div>

      <div className="product__qty-wrapper">
        <SvgIncrease />
        <span className="product__qty">2</span>
        <SvgDecrease />
      </div>
    </div>
  );
};
