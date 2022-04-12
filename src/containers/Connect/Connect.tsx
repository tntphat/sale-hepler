import React, { useEffect } from 'react';
import { Box } from '../../components/common';
import { BoxChannel, BoxStatistics } from '../../components/Connect';
import { loadScript, loginFb } from '../../helpers';
import './Connect.scss';

const ID_APP_TIKI = process.env.APP_ID_TIKI;
// const redirectUri = 'https%3A%2F%2Ftool-helper-social.netlify.app%2Fauth';
// const redirectUri = 'https://tool-helper-social.netlify.app';

const redirectUri =
  (process.env.NODE_ENV === 'development'
    ? process.env.URL_APP_LOCAL
    : process.env.URL_APP_PRODUCTION) + 'auth-tiki';
const LINK = `https://api.tiki.vn/sc/oauth2/auth?response_type=code&client_id=${ID_APP_TIKI}&redirect_uri=${redirectUri}&scope=product&state=AbCDeFgH`;

export const Connect = () => {
  const cb = (data: any) => {
    console.log(data.accessToken);
  };
  useEffect(() => {
    loadScript();
  }, []);

  const handleLoginTiki = () => {
    window.location.href = LINK;
  };

  const handleLoginFb = () => {
    loginFb(cb);
  };
  return (
    <div className="connect">
      <div className="connect__statistics">
        <BoxStatistics onClick={handleLoginFb} color="#017DF6" count={2} channel="Facebook" />
        <BoxStatistics onClick={handleLoginTiki} color="#1A94FF" count={3} channel="Tiki" />
      </div>

      <BoxChannel onClickConnect={handleLoginFb} color="#0a69e1" channel="Facebook" />
      <BoxChannel onClickConnect={handleLoginFb} color="#0a69e1" channel="Facebook" isEmpty />
      <div className="connect__grid-2">
        <BoxChannel color="#1A94FF" channel="Tiki" />
        <BoxChannel onClickConnect={handleLoginTiki} color="#FF6533" channel="Shopee" isEmpty />
      </div>
    </div>
  );
};
