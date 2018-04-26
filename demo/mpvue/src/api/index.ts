// 当前环境变量
const APP_ENV = process.env.NODE_ENV || 'production';

// 开发环境
const DEV_URL = {
  // MAIN: 'http://10.2.10.227:4000'
  MAIN: 'https://sit.guanghuobao.com'
};

// 测试环境
const TEST_URL = {
  MAIN: 'https://sit.guanghuobao.com'
};

// 生产环境
const PROD_URL = {
  MAIN: 'https://www.guanghuobao.com'
};

// 请求 host
let APP_REQUEST_HOST = '';

switch (APP_ENV) {
  case 'production':
    APP_REQUEST_HOST = PROD_URL.MAIN;
    break;
  case 'sit':
    APP_REQUEST_HOST = TEST_URL.MAIN;
    break;
  case 'development':
    APP_REQUEST_HOST = DEV_URL.MAIN;
    break;
  default:
}

const AK = 'qLnjq14R4oIEEwtqHM3hcuRMsn1q61Hq';

const API = {
  BAIDU_MAP: {
    SEARCH: `https://api.map.baidu.com/place/v2/search?ak=${AK}&output=json`,
    GEOCODER: `https://api.map.baidu.com/geocoder/v2/?ak=${AK}&output=json`
  },
  // 刷新 token
  REFRESH: `${APP_REQUEST_HOST}/api/v1/refresh`,
  // 关联小程序（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/05%20%E5%BA%97%E9%93%BA%E7%94%A8%E6%88%B7/5-5%20%E5%85%B3%E8%81%94%E5%B0%8F%E7%A8%8B%E5%BA%8F）
  JSCODE2SESSION: `${APP_REQUEST_HOST}/api/v1/seller/ghbmina/jscode2session`,
  // 登录
  LOGIN: `${APP_REQUEST_HOST}/api/v1/auth`,
  // 登出
  LOGOUT: `${APP_REQUEST_HOST}/api/v1/auth`,
  // 获取验证码
  VCODE: `${APP_REQUEST_HOST}/api/v1/verificationCode`,
  // 车型（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-04%20%E8%BD%A6%E5%9E%8B%E5%88%97%E8%A1%A8）
  CARTYPE: `${APP_REQUEST_HOST}/api/v1/logistics/cartype`,
  // 订单列表查询（后面有s）
  LOGISTICSORDERS: `${APP_REQUEST_HOST}/api/v1/logistics/logisticsorders`,
  // 订单详情查询/下单（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-08%20%E4%B8%8B%E5%8D%95）
  LOGISTICSORDER: `${APP_REQUEST_HOST}/api/v1/logistics/logisticsorder`,
  // 附加服务
  GETADDITIONALSERVICES: `${APP_REQUEST_HOST}/api/v1/logistics/getAdditionalServices`,
  // 计算运费
  COSTS: `${APP_REQUEST_HOST}/api/v1/logistics/calculation/costs`,
  // 取消订单
  CANCEL: `${APP_REQUEST_HOST}/api/v1/logistics/cancel`,
  // 物流取消订单原因列表
  CANCELREASONS: `${APP_REQUEST_HOST}/api/v1/logistics/logisticsCancelReasons`,
  // 发起支付
  PAY: `${APP_REQUEST_HOST}/api/v1/payment/pay`,
  // 保存地址（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/26%20%20%E5%B8%B8%E7%94%A8%E5%9C%B0%E5%9D%80/26-2%20%E5%88%9B%E5%BB%BA%E5%B8%B8%E7%94%A8%E5%9C%B0%E5%9D%80）
  CREATE: `${APP_REQUEST_HOST}/api/v1/addressBookRest/create`,
};


// 接口地址
export default API;