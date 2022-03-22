import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth, CreateProduct, Home, Login, Register } from '../containers';
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
        <Route path="/login" element={<PrivateRouter component={Login} layout={BlankLayout} />} />
        <Route
          path="/register"
          element={<PrivateRouter component={Register} layout={BlankLayout} />}
        />
        <Route
          path="sell"
          element={<PrivateRouter title="Bán hàng" component={Sell} layout={SidebarLayout} />}
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
        <Route
          path="/create-product"
          element={
            <PrivateRouter
              title="Thêm mới sản phẩm"
              component={CreateProduct}
              layout={SidebarLayout}
            />
          }
        />
        <Route path="/auth" element={<PublicRouter component={Auth} layout={BlankLayout} />} />
      </Routes>
    </Router>
  );
};
