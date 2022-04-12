import React, { useRef, useState } from 'react';
import { SvgClose } from '../../../assets/svg';
import { useDraggable } from '../../../hooks';
import { ScrollHorizontal } from '../ScrollHorizontal/ScrollHorizontal';
import './HorizontalMedias.scss';

const ComponentHorizontalMedias = (
  { className, setImages, images }: IHorizontalMedias,
  ref: any,
) => {
  const refScroll = useDraggable();
  const handleChangeOpenDialog = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;

    if (files?.length) {
      setImages([...images, ...files]);
      ref.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    if (index > -1) {
      const newArr = [...images];
      newArr.splice(index, 1);
      setImages(newArr);
    }
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={ref}
        multiple
        accept="image/*,video/*"
        onChange={handleChangeOpenDialog}
      />
      <ScrollHorizontal ref={refScroll} className={`horizontal-medias ${className || ''}`}>
        {images.map((img, ind) => {
          return (
            <div key={ind}>
              <img
                src={URL.createObjectURL(img)}
                // style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
              <div className="close-wrapper" onClick={() => handleRemoveImage(ind)}>
                <SvgClose />
              </div>
            </div>
          );
        })}
      </ScrollHorizontal>
    </>
  );
};
export const HorizontalMedias = React.forwardRef(ComponentHorizontalMedias);