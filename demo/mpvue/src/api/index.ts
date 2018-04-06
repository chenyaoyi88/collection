// 当前环境变量
const APP_ENV = process.env.NODE_ENV || 'production';

// 开发环境
const DEV_URL = {
  MAIN: 'http://10.2.10.227:4000'
};

// 测试环境
const TEST_URL = {
  MAIN: 'https://sit.guanghuobao.com'
};

// 生产环境
const PROD_URL = {
  MAIN: 'https://sit.guanghuobao.com'
};

// 请求 host
let APP_REQUEST_HOST = '';

switch (APP_ENV) {
  case 'production':
    APP_REQUEST_HOST = PROD_URL.MAIN;
    break;
  case 'test':
    APP_REQUEST_HOST = TEST_URL.MAIN;
    break;
  case 'development':
    APP_REQUEST_HOST = DEV_URL.MAIN;
    break;
  default:
}

// 接口地址
export default {
  // 测试请求
  TEST: `${APP_REQUEST_HOST}/test`,
  // 登录
  LOGIN: `${APP_REQUEST_HOST}/login`
};
