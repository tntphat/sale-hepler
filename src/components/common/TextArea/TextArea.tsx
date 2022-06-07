import React, { useEffect, useRef } from 'react';
import './TextArea.scss';
const ComponentTextArea = (
  { value, onChange, className, onKeyPress, onKeyDown }: ITextArea,
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
      // onKeyUp={textAreaAdjust}
      name=""
      ref={ref}
      value={value}
      onChange={onChange}
      className={`text-area ${className || ''}`}
      placeholder="Hãy viết gì đó..."
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
    />
  );
};
export const TextArea = React.forwardRef(ComponentTextArea);
