import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOCAL_TOKEN, LOCAL_TOKEN_ADMIN } from '../constants';
import { readCookie } from '../helpers';
// import { doGetCurrentUser } from '../redux';

export const PublicRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  isAdmin,
}) => {
  if (readCookie(isAdmin ? LOCAL_TOKEN_ADMIN : LOCAL_TOKEN))
    return <Navigate to={isAdmin ? '/admin/users' : '/'} />;
  return (
    <Layout>
      <Component />
    </Layout>
  );
};
