import { LOCAL_TOKEN } from '../constants';

export const setCookie = (day: number, value?: string, key?: string, domain?: string) => {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + day * 86400 * 1000;
  now.setTime(expireTime);
  console.log('domain: ', domain);

  let domainString;
  if (domain) {
    domainString = `;domain=${domain}`;
  } else {
    domainString = '';
  }
  console.log('domainString: ', domainString);
  document.cookie = `${key}=${value};expires=${now.toUTCString()};path=/`;
};

export const login = (token: string) => {
  const domain = process.env.COOKIE_DOMAIN || window.location.hostname;
  setCookie(365, token, LOCAL_TOKEN, domain);
  window.location.reload();
};

export const deteletAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) setCookie(1, '', cookies[i].split('=')[0]);
};

export const readCookie = (name: any) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const logout = () => {
  const domain = window.location.origin;
  localStorage.removeItem(LOCAL_TOKEN);
  deleteAllCookies();
  window.location.replace(domain);
};

export const loadScript = () => {
  // const appId = process.env.REACT_APP_FB_APP_TEST_ID;
  const appId = '568775388147691';

  // Fb
  window.fbAsyncInit = function () {
    console.log('HIHIHIHI');

    window.FB.init({
      appId,
      cookie: true,
      xfbml: true,
      version: 'v13.0',
    });
  };

  (function (d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

export async function loginFb(callback: any) {
  const authResponse = await new Promise((resolve, reject) =>
    window.FB.login(function (response) {
      if (response.status === 'connected') {
        FB.api('/me?fields=id,email,name,picture.width(720).height(720)', function (data) {
          resolve({ data, accessToken: response.authResponse.accessToken });
        });
      }
    }),
  );
  callback(authResponse);
  if (!authResponse) return;
}

export const checkStt = () => {
  FB.getLoginStatus(function (response) {
    console.log(response);
  });
};

export const publishFeed = () => {
  FB.api('/me/feed', 'post', { message: 'test publish' }, function (response) {
    if (!response || response.error) {
      alert('Error occured');
    } else {
      alert('Post ID: ' + response.id);
    }
  });
};
