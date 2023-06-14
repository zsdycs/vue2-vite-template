import { getAccessToken } from '@/utils/auth';

export const state = {
  loading: false,
  accessToken: getAccessToken(), // String
  token: '',
  menus: JSON.parse(localStorage.getItem('menus') || '[]'),
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};
