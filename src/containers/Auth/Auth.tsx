import React, { useEffect, useState } from 'react';
import { SvgFb } from '../../assets/svg';
import { checkStt, loadScript, loginFb, publishFeed } from '../../helpers';
import './Auth.scss';

export const Auth = () => {
  const [data, setData] = useState<any>();
  const [logged, setLogged] = useState<any>();
  const cb = (data: any) => {
    setData(data?.data);
    setLogged(true);
  };
  useEffect(() => {
    loadScript();
    setTimeout(() => {
      checkStt();
    }, 500);
  }, []);
  return (
    <div className="auth">
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
      {/* <div onClick={checkStt}>Check with fb</div>
      <div onClick={publishFeed}>Publish with fb</div> */}
    </div>
  );
};
