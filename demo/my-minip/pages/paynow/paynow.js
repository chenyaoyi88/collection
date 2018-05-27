import {
  ghbRequest,
  showToastError,
  uuid,
  zerofillBack
} from '../../utils/index';

import API from '../../api/api';

import {
  eventBusEmit,
  eventBusRemove,
  eventBusOn
} from '../event';

Page({
  data: {
    costs: {},
    logisticsorderParams: {}
  },

  // 支付
  payNow() {
    wx.showLoading({
      title: '支付请求中',
      mask: true
    });
    // 请求下订单接口得到订单号 -> 唤起微信支付
    this.data.logisticsorderParams && (this.data.logisticsorderParams.uuid = uuid());

    ghbRequest({
      url: API.LOGISTICSORDER,
      method: 'POST',
      data: this.data.logisticsorderParams
    }, true).then((res) => {
      // 下单成功
      if (res.statusCode === 200) {

        // 下单成功之后，清空首页填写的信息
        eventBusEmit('indexReset');

        // 获取订单号
        if (res.data.id) {
          ghbRequest({
            url: API.PAY,
            method: 'POST',
            data: {
              orderId: res.data.id,
              method: 'WX_SMALL_PROGRAM',
              paymentType: 'ZPT',
              productName: '物流运费',
              productDesc: `物流运费 ¥${res.data.amount}`
            }
          }).then((res) => {
            // 获取微信支付所需参数
            if (res.statusCode === 200) {

              const PARAMS_PAY = JSON.parse(res.data.payData);

              // 微信支付成功
              PARAMS_PAY.success = PARAMS_PAY.fail = function (res) {
                wx.hideLoading();
                // 支付成功
                wx.switchTab({
                  url: '../order/order'
                });
              };
              wx.requestPayment(PARAMS_PAY);
            } else {
              showToastError('下单失败，请稍后再试');
              wx.hideLoading();
            }
          });
        } else {
          showToastError('下单失败，缺少订单号');
        }
      } else {
        showToastError(res.data.message);
      }
    });
  },

  onLoad(options) {
    const logisticsorderParams = JSON.parse(options.logisticsorder || '{}');
    const costs = JSON.parse(options.costs || '{}');
    if (costs.couponInfo && costs.couponInfo.priceValue) {
      costs.couponInfo.priceValue = zerofillBack(this.costs.couponInfo.priceValue);
    }
    this.setData({
      logisticsorderParams,
      costs
    });
  }
})