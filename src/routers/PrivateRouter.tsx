import React, { useEffect } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
// import { doGetCurrentUser } from '../redux';

export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  title,
}) => {
  return true ? (
    <Layout>
      {title ? <h2 className="title">{title}</h2> : null}
      <Component />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
