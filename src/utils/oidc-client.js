import Oidc from 'oidc-client';

export const mgr = new Oidc.UserManager({
  authority: 'http://id.heyingji.com.cn:50110',
  client_id: 'env-app-js-80',
  redirect_uri: 'http://env.heyingji.com.cn/#/CallBack',
  response_type: 'code',
  scope: 'openid profile',
  post_logout_redirect_uri: 'http://env.heyingji.com.cn',
  // automaticSilentRenew: true,
});
