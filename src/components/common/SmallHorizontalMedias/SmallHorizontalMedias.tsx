import React from 'react';
import { SvgSmallClose } from '../../../assets/svg';
import { useDraggable } from '../../../hooks';
import { ScrollHorizontal } from '../ScrollHorizontal/ScrollHorizontal';
import './SmallHorizontalMedias.scss';

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
              <img src={URL.createObjectURL(img)} />
              <div className="close-wrapper" onClick={() => handleRemoveImage(ind)}>
                <SvgSmallClose />
              </div>
            </div>
          );
        })}
      </ScrollHorizontal>
    </>
  );
};
export const HorizontalMedias = React.forwardRef(ComponentHorizontalMedias);
