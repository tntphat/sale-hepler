import React, { useEffect } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
// import { doGetCurrentUser } from '../redux';

export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
}) => {
  return true ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to='/login' />
  );
};
