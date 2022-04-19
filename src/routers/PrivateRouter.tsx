import React, { useEffect } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { LOCAL_TOKEN } from '../constants';
import { readCookie } from '../helpers';
import { doGetUserInfo, useAppDispatch } from '../redux';
import { apiAuth } from '../services/api';
// import { doGetCurrentUser } from '../redux';

export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  title,
}) => {
  const dispatch = useAppDispatch();
  const token = readCookie(LOCAL_TOKEN);
  useEffect(() => {
    if (token)
      // apiAuth.getUserInfo().then(console.log);
      dispatch(doGetUserInfo());
  }, []);
  return token ? (
    <Layout>
      {title ? <h2 className="title">{title}</h2> : null}
      <Component />
    </Layout>
  ) : (
    <Navigate to="/auth" />
  );
};
