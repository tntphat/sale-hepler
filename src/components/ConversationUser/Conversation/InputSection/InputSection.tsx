import React, { useRef, useState } from 'react';
import { HorizontalMedias, InputText } from '../../../common';
import './InputSection.scss';

interface InputSectionProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<any>>;
  value: any;
  setText: React.Dispatch<React.SetStateAction<any>>;
  refText: React.RefObject<HTMLInputElement>;
  refImage: React.RefObject<HTMLInputElement>;
}
export const InputSection = ({
  images,
  setImages,
  value,
  setText,
  refText,
  refImage,
}: InputSectionProps) => {
  return (
    <div className="input-wrapper">
      <HorizontalMedias
        className="med"
        images={images}
        setImages={setImages}
        ref={refImage}
        isSmallSize={true}
      />

      <div className="input">
        <input
          value={value}
          onChange={(e: any) => {
            setText(e.target.value);
          }}
          ref={refText}
        />
      </div>
    </div>
  );
};
