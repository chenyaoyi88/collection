import { Vue, Component } from 'vue-property-decorator';
import API from '../../api';
import { ghbRequest, showToastError, uuid } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  costs: any = {};

  logisticsorderParams: any;

  onLoad(options: { logisticsorder: any; costs: any; }) {
    this.logisticsorderParams = JSON.parse(options.logisticsorder);
    this.costs = JSON.parse(options.costs);
  }

  payNow() {
    wx.showLoading({
      title: '支付请求中',
      mask: true
    });
    // 请求下订单接口得到订单号 -> 唤起微信支付
    this.logisticsorderParams.uuid = uuid();
    ghbRequest({
      url: API.LOGISTICSORDER,
      method: 'POST',
      data: this.logisticsorderParams
    }).then((res: any) => {
      // 下单成功，获取订单号
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
        }).then((res: any) => {
          // 获取微信支付所需参数
          if (res.statusCode === 200) {

            // 下单成功之后，清空首页填写的信息
            this.$store.commit('isIndexResetChange', {
              isIndexReset: true
            });

            const PARAMS_PAY = JSON.parse(res.data.payData);

            // 微信支付成功
            PARAMS_PAY.success = function (res: any) {
              wx.hideLoading();
              // 支付成功
              wx.switchTab({
                url: '../a_tab/order/main'
              });
            };

            PARAMS_PAY.fail = function (res: any) {
              wx.hideLoading();
              // 支付失败
              wx.showModal({
                title: '支付失败',
                content: '支付失败，请稍后再试'
              });
            };

            wx.requestPayment(PARAMS_PAY);
          } else {
            showToastError('下单失败，请稍后再试');
            wx.hideLoading();
          }
        });
      }

    });
  }
}

export default Index;
