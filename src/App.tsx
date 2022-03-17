import React, { useEffect, useState } from 'react';
import './App.css';
import { ModalLoading } from './components/common/Modal';
import { useAppSelector } from './redux';

import { Routers } from './routers';

function App() {
  const { isOpen: isOpenLoading } = useAppSelector((state) => state.modalSlice);
  return (
    <div className="App">
      <Routers />
      <ModalLoading isOpen={isOpenLoading} />
    </div>
  );
}

export default App;
