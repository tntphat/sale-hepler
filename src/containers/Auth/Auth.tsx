import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SvgFb } from '../../assets/svg';
import { Button } from '../../components/common';
import { checkStt, loadScript, loginFb, publishFeed } from '../../helpers';
import { objToQuery } from '../../helpers/api';
import { apiAuth } from '../../services/api';
import './Auth.scss';

const ID_APP_TIKI = process.env.APP_ID_TIKI;
// const redirectUri = 'https%3A%2F%2Ftool-helper-social.netlify.app%2Fauth';
// const redirectUri = 'https://tool-helper-social.netlify.app';

const redirectUri =
  process.env.NODE_ENV === 'development'
    ? process.env.URL_APP_LOCAL
    : process.env.URL_APP_PRODUCTION + 'auth-tiki';
const LINK = `https://api.tiki.vn/sc/oauth2/auth?response_type=code&client_id=${ID_APP_TIKI}&redirect_uri=${redirectUri}&scope=product&state=AbCDeFgH`;

export const Auth = () => {
  const [data, setData] = useState<any>();
  const [logged, setLogged] = useState<any>();
  const cb = (data: any) => {
    setData(data?.data);
    apiAuth.facebook(data.accessToken).then(console.log);
    // console.log(data.accessToken);

    setLogged(true);
  };
  useEffect(() => {
    loadScript();
    // setTimeout(() => {
    //   checkStt();
    // }, 500);
  }, []);
  // const handleClickRefreshToken = () => {
  //   axios.get(
  //     'https://graph.facebook.com/v13.0/oauth/access_token' +
  //       objToQuery({
  //         grant_type: 'fb_exchange_token',
  //         client_id: '1423061844797217',
  //         client_secret: '1e0bb0907d775a73a9d7ff490162ec9f',
  //         fb_exchange_token:
  //           'EAAUORGfApyEBACck2wCCVhSZALLuMhL9ZA2wGeTH8jsdElFZBCqyIZCIyPG95pIP6KwMOSOce2RnWFZAZA26loXU14BVAO6XyyZBjAhzr1EDhVQdj9WWnSvflQd018AzbQ2cseOVh1xRiaU2rsY3Q9Nl1GQZCIaEt94dZAzOvyHZAySzIZBgaswZBLm5TaQlENUMveJkYJRXslrpcSEaOYYAC2Dc',
  //       }),
  //   );
  // };
  const handleLoginTiki = () => {
    window.location.href = LINK;
  };
  return (
    <div className="auth">
      {/* <Button onClick={handleClickRefreshToken}>CLick to refr token</Button> */}
      <div className="auth__btn" onClick={() => loginFb(cb)}>
        <SvgFb />
        <p>Login with fb</p>
      </div>
      {logged && (
        <div>
          <div>{data.name}</div>
          <img src={data.picture.data.url} />
        </div>
      )}
      <Button onClick={handleLoginTiki} width={100}>
        Login with Tiki
      </Button>
      {/* <div onClick={checkStt}>Check with fb</div>
      <div onClick={publishFeed}>Publish with fb</div> */}
    </div>
  );
};
