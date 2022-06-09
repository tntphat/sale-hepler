import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getParameterByName } from '../../helpers';
import { apiTikiAuth } from '../../services/api/tiki/apiAuth';

export const AuthTikiToken = () => {
  //   const location = useLocation();
  console.log();
  const code = getParameterByName('code');
  useEffect(() => {
    console.log('code :', code);

    // apiTikiAuth.connection(code || '').then(() => {
    //   window.location.replace('/');
    // });
  }, []);
  return null;
};
