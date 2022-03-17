import React from 'react';
import { SvgSearch } from '../../../assets/svg';
import './SearchText.scss';

export const SearchText: React.FC<ISearchText> = ({ placeholder, className, onChange, value }) => {
  return (
    <div className={`search-text ${className || ''}`}>
      <input placeholder={placeholder} onChange={onChange || (() => false)} value={value} />
      <SvgSearch />
    </div>
  );
};
