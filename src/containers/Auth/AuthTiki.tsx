import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getParameterByName } from '../../helpers';
import { apiTikiAuth } from '../../services/api/tiki/apiAuth';
import axios from 'axios';

export const AuthTiki = () => {
  //   const location = useLocation();
  const code = getParameterByName('code');
  useEffect(() => {
    apiTikiAuth.connection(code || '').then((res) => {
      window.location.replace('/');
    });
  }, []);
  return null;
};
