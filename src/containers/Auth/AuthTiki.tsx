import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getParameterByName } from '../../helpers';
import { apiTikiAuth } from '../../services/api/tiki/apiAuth';
import axios from 'axios';

export const AuthTiki = () => {
  //   const location = useLocation();
  console.log();
  const code = getParameterByName('code');
  useEffect(() => {
    // console.log('code :', code);
    // // const params = new URLSearchParams();
    // const params = new FormData();
    // params.append('grant_type', 'authorization_code');
    // params.append('code', code);
    // params.append('client_id', process.env.APP_ID_TIKI);
    // params.append('redirect_uri', 'http://localhost:3000/auth-tiki');
    // params.append('client_secret', 'Kw2gT17uylSTGzwVQNW9l-glyoCbydYa');
    // // params.append('grant_type','authorization_code')
    // axios
    //   .post(
    //     'https://api.tiki.vn/sc/oauth2/token',
    //     params,
    //     // , { headers }
    //   )
    //   .then(console.log)
    //   .catch(console.log);
    apiTikiAuth.connection(code || '').then((res) => {
      console.log(res);
      window.location.replace('/');
    });
  }, []);
  return null;
};
