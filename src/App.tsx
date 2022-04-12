import React, { useEffect, useState } from 'react';
import './App.css';
import { ModalLoading, ModalMedia } from './components/common/Modal';
import { doCloseModalMedia, useAppDispatch, useAppSelector } from './redux';

import { Routers } from './routers';

function App() {
  const { isOpenModalLoading, isOpenModalMedia, media } = useAppSelector(
    (state) => state.modalSlice,
  );
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <Routers />
      <ModalLoading isOpen={isOpenModalLoading} />
      <ModalMedia
        isOpen={isOpenModalMedia}
        media={media}
        setIsOpen={() => dispatch(doCloseModalMedia())}
      />
    </div>
  );
}

export default App;
