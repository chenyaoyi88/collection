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
    GEOCODER: `https://api.map.baidu.com/geocoder/v2/?ak=${AK}&output=json`,
    // 根据小程序返回的经纬度去百度地图查找对应的具体位置（http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad）
    GETCURRENTPOS: `https://api.map.baidu.com/geocoder/v2/?coordtype=wgs84ll&output=json&pois=1&ak=${AK}&s=1`
  },
  // 刷新 token（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/02%20%E7%99%BB%E5%BD%95%E7%99%BB%E5%87%BA/2-3%20%E5%88%B7%E6%96%B0%E7%99%BB%E5%BD%95%E5%87%AD%E8%AF%81）
  REFRESH: `${APP_REQUEST_HOST}/api/v1/refresh`,
  // 关联小程序（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/05%20%E5%BA%97%E9%93%BA%E7%94%A8%E6%88%B7/5-5%20%E5%85%B3%E8%81%94%E5%B0%8F%E7%A8%8B%E5%BA%8F）
  JSCODE2SESSION: `${APP_REQUEST_HOST}/api/v1/seller/ghbmina/jscode2session`,
  // 登录（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/02%20%E7%99%BB%E5%BD%95%E7%99%BB%E5%87%BA/2-1%20%E7%99%BB%E9%99%86）
  LOGIN: `${APP_REQUEST_HOST}/api/v1/auth`,
  // 登出（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/02%20%E7%99%BB%E5%BD%95%E7%99%BB%E5%87%BA/2-2%20%E7%99%BB%E5%87%BA）
  LOGOUT: `${APP_REQUEST_HOST}/api/v1/auth`,
  // 获取验证码（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/03%20%E9%AA%8C%E8%AF%81%E7%A0%81/3-1%20%E8%8E%B7%E5%8F%96%E9%AA%8C%E8%AF%81%E7%A0%81）
  VCODE: `${APP_REQUEST_HOST}/api/v1/verificationCode`,
  // 车型（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-04%20%E8%BD%A6%E5%9E%8B%E5%88%97%E8%A1%A8）
  CARTYPE: `${APP_REQUEST_HOST}/api/v1/logistics/cartype`,
  // 订单列表查询（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-06%20%E8%AE%A2%E5%8D%95%E5%88%97%E8%A1%A8）
  LOGISTICSORDERS: `${APP_REQUEST_HOST}/api/v1/logistics/logisticsorders`,
  // 订单详情查询/下单（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-08%20%E4%B8%8B%E5%8D%95）
  LOGISTICSORDER: `${APP_REQUEST_HOST}/api/v1/logistics/logisticsorder`,
  // 附加服务（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-14%20%E8%8E%B7%E5%8F%96%E9%A2%9D%E5%A4%96%E6%9C%8D%E5%8A%A1）
  GETADDITIONALSERVICES: `${APP_REQUEST_HOST}/api/v1/logistics/getAdditionalServices`,
  // 计算运费（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-05%20%E8%AE%A1%E7%AE%97%E8%BF%90%E8%B4%B9）
  COSTS: `${APP_REQUEST_HOST}/api/v1/logistics/calculation/costs`,
  // 取消订单（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/09%20%E8%AE%A2%E5%8D%95/09-5%20%E8%AE%A2%E5%8D%95%E5%8F%96%E6%B6%88）
  CANCEL: `${APP_REQUEST_HOST}/api/v1/logistics/cancel`,
  // 物流取消订单原因列表（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-22%20%E7%89%A9%E6%B5%81%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95%E5%8E%9F%E5%9B%A0%E5%88%97%E8%A1%A8）
  CANCELREASONS: `${APP_REQUEST_HOST}/api/v1/logistics/logisticsCancelReasons`,
  // 发起支付（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/18%20%E6%94%AF%E4%BB%98/18-05%20%E5%8F%91%E8%B5%B7%E6%94%AF%E4%BB%98）
  PAY: `${APP_REQUEST_HOST}/api/v1/payment/pay`,
  // 保存地址（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/26%20%20%E5%B8%B8%E7%94%A8%E5%9C%B0%E5%9D%80/26-2%20%E5%88%9B%E5%BB%BA%E5%B8%B8%E7%94%A8%E5%9C%B0%E5%9D%80）
  CREATE: `${APP_REQUEST_HOST}/api/v1/addressBookRest/create`,
  // 获取常用地址列表
  ADDRESSBOOKREST: `${APP_REQUEST_HOST}/api/v1/addressBookRest/list`,
  // 查询优惠券列表，查询用（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/13%20%E4%BC%98%E6%83%A0%E5%88%B8/13-05_%E6%A0%B9%E6%8D%AE%E7%B1%BB%E5%9E%8B%E8%8E%B7%E5%8F%96%E4%BC%98%E6%83%A0%E5%8A%B5%E5%88%97%E8%A1%A8）
  LISTCOUPONBYTYPE: `${APP_REQUEST_HOST}/api/v1/coupon/listCouponByType`,
  // 使用优惠券列表，下单用（http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-10%20%E4%BC%98%E6%83%A0%E5%88%B8%E5%88%97%E8%A1%A8）
  LOGISTICSCOUPONS: `${APP_REQUEST_HOST}/api/v1/logistics/coupons`,
};


// 接口地址
export default API;