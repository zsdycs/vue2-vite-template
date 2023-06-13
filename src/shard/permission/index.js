import router from '@/router/index';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getAccessToken } from '@/utils/auth';
import { ROUTING_WHITELIST } from '@/utils/constant.js';
import getPageTitle from '@/utils/get-page-title';
import store from '@/store/index.js';
import { Message } from 'element-ui';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const EnableAuth = true;

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getAccessToken();

  document.title = getPageTitle(to.meta.title);

  if (EnableAuth) {
    if (ROUTING_WHITELIST.includes(to.path)) {
      next();
    } else if (hasToken) {
      // 存在token
      const userMenus = store.state.user.userMenus;
      const metaTitle = to.meta.title;
      if (userMenus.includes(metaTitle)) {
        next();
      } else if (to.path === '/main') {
        next();
      } else {
        Message({
          message: '没有此权限',
          type: 'error',
          duration: 2 * 1000,
        });
        NProgress.done();
      }
    } else {
      next({ path: '/' });
    }
  } else {
    if (ROUTING_WHITELIST.includes(to.path)) {
      next({ path: '/main' });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
