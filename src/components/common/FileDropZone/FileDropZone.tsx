import React, { useRef } from 'react';
import { useDropzone } from 'react-dropzone';

const ComponentFileDropzone: React.FC<IFileDropzone> = ({
  setImages,
  children,
  maxFiles,
  clickOpen,
  isNotMultiple,
}) => {
  const ref = useRef();
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => {
      if (isNotMultiple) setImages(files);
      else setImages((pre) => [...(pre || []), ...files]);
    },
    multiple: !isNotMultiple,
  });

  return (
    <div className="App">
      <div {...getRootProps()} onClick={clickOpen ? open : () => false}>
        <input {...getInputProps()} ref={ref} />
        {children}
        {/* <p>Drop files here</p> */}
      </div>
      {/* <div>{renderImages}</div> */}
    </div>
  );
};
export const FileDropzone = ComponentFileDropzone;
