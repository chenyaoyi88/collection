const APP_ENV = process.env.NODE_ENV || 'production';
// 非生产环境，将 index.html 导进来，从而达到修改 html 文件的时候触发 reload
if (APP_ENV !== 'production') {
  require('../../index.html');
} else {
  console.log = function() {};
  console.dir = function() {};
}

console.log('当前环境：' + APP_ENV);

let requestHost = '//';
let requestHostVcode = '//';

if (APP_ENV === 'development') {
  // 开发环境
  requestHost = '//127.0.0.1:4000';
  requestHostVcode = '//127.0.0.1:4000';
} else {
  requestHost = '//' + window.location.host;
  requestHostVcode = '//' + window.location.host;
}

const api = {
  // 获取微信 js-sdk 参数
  wechatjs: requestHost + '/shop/common/wechat/jssdk_params',
  // 获取当前用户抽奖信息
  get: requestHost + '/api/v1/activity/2018/march/get/H5',
  // 业务接口
  wechatUserBind: requestHost + '/api/v1/wechatUser/bind/H5',
  // 获取验证码
  verificationCode: requestHostVcode + '/api/v1/verificationCode',
  // 获取推荐活动信息
  recGet: requestHost + '/api/v1/activity/2018/rec/get/H5'
};

export { api };
