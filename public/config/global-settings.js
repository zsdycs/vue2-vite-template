// 全局变量
const __GLOBAL_SETTINGS__ = {
  firstPath: '/', // 入口地址
  indexPath: '/examplePage', // 首页地址
  apiServer: 'http://localhost:50080/',
  hjApiServer: 'http://10.1.0.208:9000/',
  sockedlocate: 'http://192.168.10.122:52542/',
  sockedlocate2: 'http://192.168.10.123:52542/',
  pjApiConfig: 'http://localhost:5008/',
  dxssApiConfig: 'http://localhost:5008/',
  // "influxApiConfig":"http://10.1.0.58:5009/",
  healthChecksUrl: 'http://localhost:50001/healthchecks-ui#/healthchecks',
  smtp4devUrl: 'http://10.1.0.197:52580/',
  oilAddress: 'http://192.168.10.149/soil/public/index.php/admin/login/autologin?username=admin&password=admin',
  video: {
    appkey: '27983153', // API 网关提供的 appkey
    secret: 'IzD2WROPc503cv570Zo7', // API 网关提供的 secret
    ip: '10.4.225.6', // API 网关 IP 地址
    port: 443,
  },
  title: 'gh-web',
  apiURL: 'http://192.168.110.177:50089',
  adminURL: 'http://192.168.110.177:50080',
  mqttConnection: {
    protocol: 'ws',
    host: '10.1.0.183', // 192.168.110.177
    port: 8083,
    endpoint: '/mqtt',
    options: {
      clean: true,
      connectTimeout: 2000,
      username: 'admin',
      password: 'public',
    },
  },
  mqttSubscription: {
    topic: 'testtopic',
    qos: 0,
  },
};
