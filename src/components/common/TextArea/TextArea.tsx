import React, { useEffect, useRef } from 'react';
import './TextArea.scss';
const ComponentTextArea = (
  { value, onChange, className, onKeyPress, onKeyDown , placeholder, id, readonly }: ITextArea,
  ref: any,
) => {
  function textAreaAdjust() {
    ref.current.style.height = '1px';
    ref.current.style.height = 25 + ref.current.scrollHeight + 'px';
  }
  useEffect(() => {
    textAreaAdjust();
  }, [value]);
  return (
    <textarea
      readOnly={readonly}
      id={id}
      onKeyPress={onKeyPress}
      // onKeyUp={textAreaAdjust}
      name=""
      ref={ref}
      value={value}
      onChange={onChange}
      className={`text-area ${className || ''}`}
      placeholder={placeholder || 'Hãy viết gì đó...'}
      onKeyDown={onKeyDown}
    />
  );
};
export const TextArea = React.forwardRef(ComponentTextArea);
