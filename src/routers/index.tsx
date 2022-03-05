import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth, Home } from '../containers';
import { PrivateRouter } from './PrivateRouter';
// import { PublicRouter } from "./PublicRouter";
import { BlankLayout, SidebarLayout } from '../layouts';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { PublicRouter } from './PublicRouter';

export const Routers = () => {
  // const buildysURL = process.env.REACT_APP_LINK_BUILDYS;

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<PrivateRouter component={Home} layout={SidebarLayout} />}
        />
        <Route
          path='/auth'
          element={<PublicRouter component={Auth} layout={BlankLayout} />}
        />
      </Routes>
    </Router>
  );
};
