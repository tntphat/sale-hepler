import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getParameterByName } from '../../helpers';
import { apiTikiAuth } from '../../services/api/tiki/apiAuth';

export const AuthTikiToken = () => {
  const code = getParameterByName('code');
  useEffect(() => {}, []);
  return null;
};
