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
  AuthTikiToken,
  Product,
  Order,
  Report,
  ManagePostFb,
  ManagePostTiki,
  DetailProductTiki,
  Template,
  CreateTemplate,
  DetailOrder,
  SellSendo,
  ConnectSendo,
  ManagePostSendo,
  SellCommon,
  ReportPost,
  DetailMultiPost,
} from '../containers';
import { PrivateRouter } from './PrivateRouter';
// import { PublicRouter } from "./PublicRouter";
import { BlankLayout, BuyerLayout, HeaderLayout, SidebarLayout } from '../layouts';
import { PublicRouter } from './PublicRouter';
import { Sell } from '../containers/Sell/Sell';
import { dataSidebarAdmin, dataSidebarBuyer } from '../constants';
import { BuyerHome } from '../containers/Buyer';
import GA from './GA';
import { ConnectFacebookPage } from '../containers/ConnectFacebookPage/ConnectFacebookPage';
import { AdminLogin } from '../containers/Admin';
import { AdminLayout } from '../layouts/AdminLayout/AdminLayout';
export const Routers = () => {
  // const buildysURL = process.env.REACT_APP_LINK_BUILDYS;

  return (
    <Router>
      <GA />
      <Routes>
        <Route path="/" element={<PrivateRouter component={Home} layout={HeaderLayout} />} />
        <Route path="/auth" element={<PublicRouter component={Login} layout={BlankLayout} />} />
        <Route
          path="/register"
          element={<PublicRouter component={Register} layout={BlankLayout} />}
        />
        <Route
          path="sell"
          element={<PrivateRouter title="Bán hàng" component={SellCommon} layout={SidebarLayout} />}
        />
        <Route
          path="/sell/fb"
          element={<PrivateRouter component={Sell} layout={SidebarLayout} />}
        />
        <Route
          path="/sell/tiki"
          element={<PrivateRouter component={SellECommerce} layout={SidebarLayout} />}
        />
        <Route path="/" element={<PrivateRouter component={Home} layout={SidebarLayout} />} />
        <Route
          path="/connect"
          element={<PrivateRouter component={Connect} layout={SidebarLayout} />}
        />
        <Route
          path="/product"
          element={<PrivateRouter title="Sản phẩm" component={Product} layout={SidebarLayout} />}
        />
        <Route
          path="/order"
          element={<PrivateRouter title="Đơn hàng" component={Order} layout={SidebarLayout} />}
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
        <Route
          path="/product/:id"
          element={
            <PrivateRouter title="Sản phẩm" component={CreateProduct} layout={SidebarLayout} />
          }
        />
        <Route
          path="/templates"
          element={
            <PrivateRouter title="Bài viết mẫu" component={Template} layout={SidebarLayout} />
          }
        />
        <Route
          path="/templates/create"
          element={
            <PrivateRouter
              title="Tạo bài viết mẫu"
              component={CreateTemplate}
              layout={SidebarLayout}
            />
          }
        />
        <Route
          path="/templates/create/:id"
          element={
            <PrivateRouter
              title="Sửa bài viết mẫu"
              component={CreateTemplate}
              layout={SidebarLayout}
            />
          }
        />
        <Route
          path="/product/tiki/:id"
          element={
            <PrivateRouter title="Sản phẩm" component={DetailProductTiki} layout={SidebarLayout} />
          }
        />
        {/* <Route path="/auth" element={<PublicRouter component={Auth} layout={BlankLayout} />} /> */}
        <Route
          path="/post/:id"
          element={<PrivateRouter component={DetailPost} layout={SidebarLayout} />}
        />
        <Route
          path="/product/posts/fb/:id"
          element={<PrivateRouter component={DetailMultiPost} layout={SidebarLayout} />}
        />
        <Route
          path="/report"
          element={
            <PrivateRouter title="Báo cáo bán hàng" component={Report} layout={SidebarLayout} />
          }
        />
        <Route
          path="/report/sale"
          element={
            <PrivateRouter title="Báo cáo bán hàng" component={Report} layout={SidebarLayout} />
          }
        />
        <Route
          path="/report/post"
          element={
            <PrivateRouter title="Báo cáo bài đăng" component={ReportPost} layout={SidebarLayout} />
          }
        />
        <Route
          path="/manage"
          element={
            <PrivateRouter title="Quản lý bài đăng" component={SellCommon} layout={SidebarLayout} />
          }
        />
        <Route
          path="/manage/fb"
          element={
            <PrivateRouter
              title="Quản lý bài đăng Facebook"
              component={ManagePostFb}
              layout={SidebarLayout}
            />
          }
        />
        <Route
          path="/manage/tiki"
          element={
            <PrivateRouter
              title="Quản lý bài đăng Tiki"
              component={ManagePostTiki}
              layout={SidebarLayout}
            />
          }
        />
        <Route
          path="/manage/sendo"
          element={
            <PrivateRouter
              title="Quản lý bài đăng Sendo"
              component={ManagePostSendo}
              layout={SidebarLayout}
            />
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivateRouter title="Đơn hàng" component={DetailOrder} layout={SidebarLayout} />
          }
        />
        <Route
          path="/auth-tiki"
          element={<PrivateRouter component={AuthTiki} layout={BlankLayout} />}
        />
        <Route
          path="/messenger"
          element={<PrivateRouter component={Message} layout={SidebarLayout} />}
        />
        <Route
          path="/messenger-setting"
          element={<PrivateRouter component={MessageSetting} layout={SidebarLayout} />}
        />
        <Route
          path="/auth-tiki-token"
          element={<PrivateRouter component={AuthTikiToken} layout={BlankLayout} />}
        />
        <Route
          path="/sell/sendo"
          element={
            <PrivateRouter component={SellSendo} layout={SidebarLayout} title="Đăng bán Sendo" />
          }
        />
        <Route
          path="/connect/facebook-page"
          element={
            <PrivateRouter
              component={ConnectFacebookPage}
              layout={SidebarLayout}
              title="Kết nối Trang Facebook"
            />
          }
        />
        <Route
          path="/connect/sendo"
          element={
            <PrivateRouter component={ConnectSendo} layout={SidebarLayout} title="Kết nối Sendo" />
          }
        />
        {/* Buyer */}
        {dataSidebarBuyer.map((item) => (
          <Route
            key={item.link}
            path={'/buyer' + item.link}
            element={<PrivateRouter component={item.cpn || BuyerHome} layout={BuyerLayout} />}
          />
        ))}
        {dataSidebarAdmin.map((item) => (
          <Route
            key={item.link}
            path={'/admin' + item.link}
            element={<PrivateRouter component={item.cpn} layout={AdminLayout} isAdmin />}
          />
        ))}
        <Route
          path={'/admin'}
          element={<PublicRouter component={AdminLogin} layout={BlankLayout} isAdmin />}
        />
      </Routes>
    </Router>
  );
};
