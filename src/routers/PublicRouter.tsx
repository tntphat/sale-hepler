import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOCAL_TOKEN } from '../constants';
import { readCookie } from '../helpers';
// import { doGetCurrentUser } from '../redux';

export const PublicRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
}) => {
  console.log(readCookie(LOCAL_TOKEN));

  if (readCookie(LOCAL_TOKEN)) return <Navigate to="/" />;
  return (
    <Layout>
      <Component />
    </Layout>
  );
};
