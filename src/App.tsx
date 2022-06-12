import React, { useEffect, useState } from 'react';
import './App.css';
import { ModalLoading, ModalMedia, ModalMessage } from './components/common/Modal';
import { doCloseModalMedia, doCloseModalMessage, useAppDispatch, useAppSelector } from './redux';

import { Routers } from './routers';

function App() {
  const { isOpenModalLoading, isOpenModalMedia, media, isOpenModalMessage, message } =
    useAppSelector((state) => state.modalSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.addEventListener(
      'wheel',
      function (event) {
        if (document.activeElement.type === 'number') {
          document.activeElement.blur();
        }
      },
      [],
    );
  });
  return (
    <div className="App">
      <Routers />
      <ModalLoading isOpen={isOpenModalLoading} />
      <ModalMedia
        isOpen={isOpenModalMedia}
        media={media}
        setIsOpen={() => dispatch(doCloseModalMedia())}
      />
      <ModalMessage
        isOpen={isOpenModalMessage}
        message={message}
        setIsOpen={() => dispatch(doCloseModalMessage())}
      />
    </div>
  );
}

export default App;
