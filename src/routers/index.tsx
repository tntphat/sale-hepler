import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Auth,
  AuthTiki,
  Connect,
  CreateProduct,
  DetailPost,
  Home,
  SellECommerce,
  Login,
  Register,
  Message,
  MessageSetting,
} from '../containers';
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
        <Route path="/auth" element={<PublicRouter component={Login} layout={BlankLayout} />} />
        <Route
          path="/register"
          element={<PublicRouter component={Register} layout={BlankLayout} />}
        />
        <Route
          path="sell"
          element={<PrivateRouter title="Bán hàng" component={Sell} layout={SidebarLayout} />}
        />
        <Route
          path="/sell/fb"
          element={<PrivateRouter component={Home} layout={SidebarLayout} />}
        />
        <Route
          path="/sell/ecommerce"
          element={<PrivateRouter component={SellECommerce} layout={SidebarLayout} />}
        />
        <Route path="/" element={<PrivateRouter component={Home} layout={SidebarLayout} />} />
        <Route
          path="/connect"
          element={<PrivateRouter component={Connect} layout={SidebarLayout} />}
        />
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
        {/* <Route path="/auth" element={<PublicRouter component={Auth} layout={BlankLayout} />} /> */}
        <Route
          path="/post"
          element={<PublicRouter component={DetailPost} layout={BlankLayout} />}
        />
        <Route
          path="/auth-tiki"
          element={<PublicRouter component={AuthTiki} layout={BlankLayout} />}
        />
        <Route
          path="/messenger"
          element={<PrivateRouter component={Message} layout={SidebarLayout} />}
        />
        <Route
          path="/messenge-setting"
          element={<PrivateRouter component={MessageSetting} layout={SidebarLayout} />}
        />
      </Routes>
    </Router>
  );
};
