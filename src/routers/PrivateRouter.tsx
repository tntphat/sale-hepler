import React, { useEffect } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { LOCAL_TOKEN, LOCAL_TOKEN_ADMIN } from '../constants';
import { readCookie } from '../helpers';
import { doGetUserInfo, getConnectedPage, useAppDispatch } from '../redux';
import { apiAuth } from '../services/api';
// import { doGetCurrentUser } from '../redux';

export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  title,
  isAdmin,
}) => {
  const dispatch = useAppDispatch();
  const token = readCookie(isAdmin ? LOCAL_TOKEN_ADMIN : LOCAL_TOKEN);
  useEffect(() => {
    if (token)
      // apiAuth.getUserInfo().then(console.log);
      dispatch(doGetUserInfo());
  }, []);
  useEffect(() => {
    dispatch(getConnectedPage());
  }, []);
  return token ? (
    <Layout>
      {title ? <h2 className="title">{title}</h2> : null}
      <Component />
    </Layout>
  ) : (
    <Navigate to={isAdmin ? '/admin' : '/auth'} />
  );
};
