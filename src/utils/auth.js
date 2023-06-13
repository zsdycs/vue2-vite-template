const AccessTokenKey = 'AccessToken';

export function getAccessToken() {
  return sessionStorage.getItem(AccessTokenKey);
}

export function setAccessToken(token) {
  return sessionStorage.setItem(AccessTokenKey, token);
}

export function removeAccessToken() {
  return sessionStorage.removeItem(AccessTokenKey);
}
