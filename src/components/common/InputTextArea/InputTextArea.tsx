import React, { useRef } from 'react';
import './InputTextArea.scss';

export const InputTextArea: React.FC<ITextArea> = ({ value, onChange, error, label }) => {
  const ref = useRef<HTMLTextAreaElement | any>(null);
  function textAreaAdjust() {
    ref.current.style.height = '1px';
    ref.current.style.height = 25 + ref.current.scrollHeight + 'px';
  }
  return (
    <div className="form-field input-text-area">
      <label className="inputs__label">{label}</label>

      <textarea
        onKeyUp={textAreaAdjust}
        name=""
        ref={ref}
        value={value}
        onChange={onChange}
        className={'text-area'}
        placeholder="Hãy viết gì đó..."
      />
      {error && <span className="inputs__err">{error}</span>}
    </div>
  );
};
