import { setAccessToken, removeAccessToken } from '@/utils/auth';
import { adminPost, adminGet } from '@/services/service.js';
import { API_URL } from '@/services/api-url.js';
import { handleUserMenus } from '@/utils/index.js';

export const actions = {
  endLoading({ commit }) {
    setTimeout(() => {
      commit('endLoading');
    }, parseInt(Math.random() * 300 + 300));
  },
  // user login
  login({ commit }, data) {
    const { accessToken, tokenUser } = data;
    commit('SET_ACCESS_TOKEN', accessToken);
    commit('SET_TOKEN_USER', tokenUser);
    sessionStorage.setItem('tokenUser', tokenUser);
    setAccessToken(accessToken);
  },

  // get user info
  getUserInfo({ commit }, userProfileSub) {
    return adminPost({
      url: API_URL.getUserById4,
      data: { Id4UserId: userProfileSub },
    })
      .then((response) => {
        const { code, data } = response;
        if (code == 200) {
          commit('SET_USER_INFO', data);
          localStorage.setItem('userInfo', JSON.stringify(data || {}));
        }
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getUserMenus({ commit }, data) {
    const { roleId } = data;
    adminGet({ url: API_URL.getMenusByRoleId, params: { roleId, groupId: 0 } })
      .then((response) => {
        const { code, data } = response;
        if (code == 200) {
          const { beforeList } = data;
          const userMenus = handleUserMenus(beforeList);
          commit('SET_USER_MENUS', userMenus || []);
          localStorage.setItem('userMenus', JSON.stringify(userMenus || []));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_TOKEN_USER', '');
    commit('SET_USER_INFO', {});
    localStorage.setItem('userInfo', '{}');
    removeAccessToken();
  },

  // remove token
  removeToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');
      commit('SET_TOKEN_USER', '');
      removeAccessToken();
      resolve();
    });
  },
};
