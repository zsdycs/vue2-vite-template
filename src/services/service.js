import axios from 'axios';
import { Message } from 'element-ui';
import { getAccessToken } from '@/utils/auth';
import store from '@/store/index.js';

const { apiURL, adminURL } = __GLOBAL_SETTINGS__;

// create an axios instance
const service = axios.create({
  timeout: 1000 * 10, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { code, msg } = res;
    if (code !== 200 && msg) {
      Message({
        message: msg || '网络异常',
        type: 'error',
        duration: 5 * 1000,
      });
    }

    return res;
  },
  (error) => {
    const { response } = error;
    const status = response.status;
    const MessageMap = {
      401: '认证信息失效',
    };

    const msg = MessageMap[status];

    Message({
      message: msg || '网络异常',
      type: 'error',
      duration: 5 * 1000,
    });

    if (status === 401) {
      store.dispatch('user/removeToken').then(() => {
        window.location = '/#/';
      });
    }

    return Promise.reject(error);
  },
);

const getHeaders = () => {
  const accessToken = getAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const get = ({ url, params }) => {
  const headers = getHeaders();
  const request = {
    baseURL: apiURL,
    url,
    headers: {
      ...headers,
    },
    method: 'get',
    params,
    data: {}, // 为了请求头的 Content-Type 生效。
  };
  return service(request);
};

export const post = ({ url, params = {}, data = {} }) => {
  const headers = getHeaders();
  const request = {
    baseURL: apiURL,
    url,
    headers: {
      ...headers,
    },
    method: 'post',
    params,
    data,
  };
  return service(request);
};

export const adminPost = ({ url, params = {}, data = {} }) => {
  const headers = getHeaders();
  const request = {
    baseURL: adminURL,
    url,
    headers: {
      ...headers,
    },
    method: 'post',
    params,
    data,
  };
  return service(request);
};

export const adminGet = ({ url, params = {} }) => {
  const headers = getHeaders();
  const request = {
    baseURL: adminURL,
    url,
    headers: {
      ...headers,
    },
    method: 'get',
    params,
    data: {}, // 为了请求头的 Content-Type 生效。
  };
  return service(request);
};

export default service;
