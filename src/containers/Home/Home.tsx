import React, { useEffect } from 'react';
import { doOpenModal, useAppDispatch, useAppSelector } from '../../redux';

export const Home = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modalSlice);
  useEffect(() => {
    dispatch(doOpenModal());
  }, []);
  return <div>Home 3</div>;
};
