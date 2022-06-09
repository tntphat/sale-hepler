import React, { useEffect, useRef, useState } from 'react';
import { SvgImage } from '../../../assets/svg';
import { FileDropzone } from '../FileDropZone/FileDropZone';
import { HorizontalMedias } from '../HorizontalMedias/HorizontalMedias';

export const InputGallery: React.FC<any> = ({ onChange, error, label }) => {
  const refImage = useRef<HTMLInputElement | any>(null);
  const handleClickOpenInputImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImage.current.click();
  };
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    onChange && onChange(images);
  }, [images]);
  return (
    <div className="form-field">
      <label className="inputs__label">{label}</label>

      <FileDropzone images={images} setImages={setImages}>
        <div className="create-product__flex">
          <p>Hình ảnh</p>
          <p onClick={handleClickOpenInputImage}>Thêm hình</p>
        </div>
        {images.length ? null : (
          <div
            onClick={handleClickOpenInputImage}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <SvgImage />
          </div>
        )}
        <HorizontalMedias images={images} setImages={setImages} ref={refImage} />
      </FileDropzone>
      {error && <span className="inputs__err">{error}</span>}
    </div>
  );
};
