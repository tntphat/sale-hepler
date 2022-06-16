import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgPlusRound } from '../../assets/svg/SvgPlusRound';
import { Box } from '../../components/common';
import { BoxChannel, BoxStatistics } from '../../components/Connect';
import { loadScript, loginFb } from '../../helpers';
import { useAppSelector } from '../../redux';
import './Connect.scss';

const ID_APP_TIKI = process.env.APP_ID_TIKI;
// const redirectUri = 'https%3A%2F%2Ftool-helper-social.netlify.app%2Fauth';
// const redirectUri = 'https://tool-helper-social.netlify.app';

const redirectUri =
  (process.env.NODE_ENV === 'development'
    ? process.env.URL_APP_LOCAL
    : process.env.URL_APP_PRODUCTION) + 'auth-tiki';

const LINK = `https://api.tiki.vn/sc/oauth2/auth?response_type=code&client_id=${ID_APP_TIKI}&redirect_uri=${redirectUri}&scope=product order inventory offline&state=AbCDeFgH`;
// const LINK = `https://api.tiki.vn/sc/oauth2/auth?response_type=code&client_id=${ID_APP_TIKI}&redirect_uri=${redirectUri}&scope=product&state=AbCDeFgH`;

export const Connect = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.authSlice);
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
  const handleLoginSendo = () => {
    navigate('/connect/sendo');
  };

  const handleConnectPage = () => {
    loginFb(cb);
    if (user?.fbId) {
      navigate('/connect/facebook-page');
    }
  };

  return (
    <div className="connect">
      <Box title="Kết nối kênh bán hàng">
        <div className="select">
          <div
            className={`sell-common__text sell-common__text--fb 

            `}
            onClick={handleConnectPage}
          >
            <SvgPlusRound className="connect__add" />
            Facebook
            {/* {user.fbId ? (
              <>
                <p>{user.name}</p>
                <img src={user.picture} />
              </>
            ) : null} */}
          </div>
          <div className="sell-common__text sell-common__text--tiki" onClick={handleLoginTiki}>
            <SvgPlusRound className="connect__add" />
            Tiki
          </div>
          <div className="sell-common__text sell-common__text--sendo" onClick={handleLoginSendo}>
            <SvgPlusRound className="connect__add" color="#d9292a" />
            Sendo
          </div>
        </div>
      </Box>
      {/* <div className="connect__statistics">
        <BoxStatistics onClick={handleLoginFb} color="#017DF6" count={2} channel="Facebook" />
        <BoxStatistics onClick={handleLoginTiki} color="#1A94FF" count={3} channel="Tiki" />
        <BoxStatistics onClick={handleLoginSendo} color="#d9292a" count={3} channel="Sendo" />
      </div> */}

      {/* <BoxChannel onClickConnect={handleLoginFb} color="#0a69e1" channel="Facebook" />
      <BoxChannel onClickConnect={handleLoginFb} color="#0a69e1" channel="Facebook" isEmpty />
      <div className="connect__grid-2">
        <BoxChannel color="#1A94FF" channel="Tiki" />
        <BoxChannel onClickConnect={handleLoginTiki} color="#FF6533" channel="Shopee" isEmpty />
      </div> */}
    </div>
  );
};
