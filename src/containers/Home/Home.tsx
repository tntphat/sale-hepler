import React, { useEffect, useState } from 'react';
import { ChartBar } from '../../components/Bar/ChartBar';
import { Button, FileDropzone } from '../../components/common';
import { apiCategory, apiTikiProduct, apiTikiSeller, apiTikiState } from '../../services/api';
import { apiCommon } from '../../services/api/apiCommon';

export const Home = () => {
  useEffect(() => {
    // apiCategory.getCategory().then(console.log);
    // apiTikiSeller.getInfo();
    // apiCategory.getCategorySpecified(6);
    apiTikiProduct.getProducts({ page: 1, limit: 20, state: 'rejected' }).then(console.log);
    apiTikiState.getAll().then(console.log);
    apiTikiProduct.getTracking().then(console.log);
  }, []);
  const [images, setImages] = useState([]);
  const handleClick = () => {
    console.log(images);
    // const fd = new FormData();
    // fd.append('images[0]')
    apiCommon.getLinkImage({ images });
  };
  return (
    <div>
      {/* Way back home
      <FileDropzone setImages={setImages}>
        <img src="https://cdn.pixabay.com/photo/2022/01/21/11/37/pandas-6954571__340.jpg" />
      </FileDropzone>
      <Button onClick={handleClick}>CLick</Button> */}
      <ChartBar />
    </div>
  );
};
