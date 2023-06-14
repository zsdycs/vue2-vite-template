export const mutations = {
  SET_ACCESS_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus || [];
  },
};
