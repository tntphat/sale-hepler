import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth, Home } from '../containers';
import { PrivateRouter } from './PrivateRouter';
// import { PublicRouter } from "./PublicRouter";
import { BlankLayout, SidebarLayout } from '../layouts';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { PublicRouter } from './PublicRouter';
import { Sell } from '../containers/Sell/Sell';

export const Routers = () => {
  // const buildysURL = process.env.REACT_APP_LINK_BUILDYS;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRouter component={Home} layout={SidebarLayout} />} />
        <Route
          path="sell"
          element={<PrivateRouter component={Sell} layout={SidebarLayout} />}
        ></Route>
        <Route
          path="/sell/fb"
          element={<PrivateRouter component={Home} layout={SidebarLayout} />}
        />
        <Route
          path="/sell/ecommerce"
          element={<PrivateRouter component={Home} layout={SidebarLayout} />}
        />
        <Route path="/" element={<PrivateRouter component={Home} layout={SidebarLayout} />} />
        <Route path="/auth" element={<PublicRouter component={Auth} layout={BlankLayout} />} />
      </Routes>
    </Router>
  );
};
