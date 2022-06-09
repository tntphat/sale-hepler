import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../../hooks';
import './Dropdown.scss';

export const Dropdown: React.FC<any> = ({ children, className, options }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(() => {
    setOpen(false);
  }, ref);
  return (
    <div
      onClick={() => {
        setOpen((pre) => !pre);
      }}
      ref={ref}
      className={`dropdown ${className || ''} ${open ? 'dropdown--open' : ''}`}
    >
      {children}
      {open ? (
        <div className="dropdown__menu">
          {options.map((opt, ind) => (
            <div className="dropdown__item" key={ind} onClick={opt.cb}>
              {opt.text}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
