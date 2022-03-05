import React from 'react';
// import { doGetCurrentUser } from '../redux';

export const PublicRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
}) => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};
