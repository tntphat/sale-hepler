import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getParameterByName } from '../../helpers';

export const AuthTiki = () => {
  //   const location = useLocation();
  console.log(getParameterByName('code'));

  return null;
};
