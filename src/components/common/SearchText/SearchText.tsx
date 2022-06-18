import React from 'react';
import { SvgSearch } from '../../../assets/svg';
import './SearchText.scss';

export const SearchText: React.FC<ISearchText> = ({
  placeholder,
  className,
  onChange,
  value,
  onKeyPress,
}) => {
  return (
    <div className={`search-text ${className || ''}`}>
      <input
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        onChange={onChange || (() => false)}
        value={value}
      />
      <SvgSearch />
    </div>
  );
};
