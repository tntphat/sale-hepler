import React from 'react';
import { SvgCheck } from '../../../assets/svg';
import { CheckBox } from '../../common';
import './Tag.scss';
export const Tag = ({ name, color }: { name: string; color: string }) => {
  return (
    <div className="tag-item">
      <SvgCheck />
      <div className={`tag-item__color tag-item__color-${color}`}></div>
      <div className="tag-item__name">{name}</div>
    </div>
  );
};
