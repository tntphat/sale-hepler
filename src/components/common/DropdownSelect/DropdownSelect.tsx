import React, { useEffect, useRef, useState } from 'react';
import { SvgAngle, SvgClose } from '../../../assets/svg';
import { useOnClickOutside } from '../../../hooks';
import './DropdownSelect.scss';

export const DropdownSelect: React.FC<IDropdownSelect> = ({
  data,
  label,
  placeholder,
  onChange,
  value,
  error,
  className,
  classNameInput,
  classNamePlaceholder,
  isNotAllowedEdit,
  titleProp,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openBox, setOpenBox] = useState(false);

  useOnClickOutside(() => {
    setOpenBox(false);
  }, ref);

  const handleClickItem = (item: any) => {
    setOpenBox(false);
    onChange && onChange(item);
  };
  return (
    <div
      className={`dropdown-select form-field ${openBox ? 'dropdown-select--open' : ''} ${
        className ? className : ''
      }`}
    >
      {!!label && <label className="dropdown-select__label">{label}</label>}
      <div className="dropdown-select__main" ref={ref}>
        <div
          className={`dropdown-select__res ${classNameInput ? classNameInput : ''}`}
          onClick={() => {
            !isNotAllowedEdit && setOpenBox((pre) => !pre);
          }}
        >
          {value ? (
            <p className="dropdown-select__selected-text">{value.title}</p>
          ) : (
            <p
              className={`dropdown-select__place-holder ${
                classNamePlaceholder ? classNamePlaceholder : ''
              }`}
            >
              {placeholder}
            </p>
          )}
          {!isNotAllowedEdit && <SvgAngle />}
        </div>
        <div
          className={`dropdown-select__list-outer ${
            openBox ? 'dropdown-select__list-outer--open' : ''
          }`}
        >
          <div className="dropdown-select__list">
            {data.map((item) => {
              const active = item.id === value?.id;
              return (
                <div
                  className={`dropdown-select__select ${
                    active ? 'dropdown-select__select--active' : ''
                  }`}
                  key={item.id}
                  onClick={() => handleClickItem(item)}
                >
                  <p>{item[titleProp || 'title']}</p>
                  {active ? <SvgClose /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {error ? <span className="inputs__err">{error}</span> : null}
    </div>
  );
};
