import React, { useRef } from 'react';
import { useDropzone } from 'react-dropzone';

const ComponentFileDropzone: React.FC<IFileDropzone> = ({ setImages, children }) => {
  const ref = useRef();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => setImages((pre) => [...pre, ...files]),
  });

  return (
    <div className="App">
      <div {...getRootProps()} onClick={() => false}>
        <input {...getInputProps()} ref={ref} />
        {children}
        {/* <p>Drop files here</p> */}
      </div>
      {/* <div>{renderImages}</div> */}
    </div>
  );
};
export const FileDropzone = ComponentFileDropzone;
