import * as mqtt from 'mqtt';

let client = null;

let retryTimes = 0;
let connecting = false;
let subscribeSuccess = false;

// 连接
const createConnection = ({ protocol, host, port, endpoint, options }) => {
  return new Promise((resolve, reject) => {
    try {
      connecting = true;
      const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
      client = mqtt.connect(connectUrl, options);
      if (client.on) {
        client.on('connect', () => {
          connecting = false;
          resolve({ client });
        });
        client.on('reconnect', handleOnReConnect);
        client.on('error', (error) => {
          console.error('mqtt 连接失败', error);
          reject(error);
        });
      }
    } catch (error) {
      connecting = false;
      reject(error);
    }
  });
};

// 初始化
const initData = () => {
  client = {
    connected: false,
  };
  retryTimes = 0;
  connecting = false;
  subscribeSuccess = false;
};

// 重连
const handleOnReConnect = () => {
  retryTimes += 1;
  // MQTT 重连中
  if (retryTimes > 5) {
    try {
      // MQTT 重连次数过多，结束重连
      client.end();
      initData();
    } catch (error) {
      // MQTT 重连失败
      console.error('MQTT 重连失败', error);
    }
  }
};

// 订阅
const doSubscribe = ({ topic, qos = 0 }) => {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, { qos }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        subscribeSuccess = true;
        resolve(res);
      }
    });
  });
};

// 取消订阅
const doUnSubscribe = ({ topic }) => {
  return new Promise((resolve, reject) => {
    client.unsubscribe(topic, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// 取消连接
const destroyConnection = () => {
  return new Promise((resolve, reject) => {
    if (client.connected) {
      try {
        client.end(false, () => {
          initData();
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    }
  });
};

// 发布消息
const doPublish = ({ topic, qos, payload }) => {
  return new Promise((resolve, reject) => {
    client.publish(topic, payload, { qos }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export {
  client, // 对象-客户端实体
  connecting, // 状态-连接状态
  subscribeSuccess, // 状态-订阅状态
  createConnection, // 方法-连接
  destroyConnection, // 方法-取消连接
  doSubscribe, // 方法-订阅
  doUnSubscribe, // 方法-取消订阅
  doPublish, // 方法-发布消息
};
