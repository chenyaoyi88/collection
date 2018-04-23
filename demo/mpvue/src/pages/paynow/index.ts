import { Vue, Component } from 'vue-property-decorator';
import API from '../../api';
import { ghbRequest } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  costs: any = {};

  logisticsorderParams: any;

  onLoad(options: { logisticsorder: any; costs: any }) {
    this.logisticsorderParams = JSON.parse(options.logisticsorder);
    this.costs = JSON.parse(options.costs);
  }

  payNow() {
    // 请求下订单接口得到订单号 -> 唤起微信支付
    ghbRequest({
      url: API.LOGISTICSORDER,
      method: 'POST',
      data: this.logisticsorderParams
    }).then((res: any) => {
      console.log(res.data.id);

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
          const PARAMS_PAY = JSON.parse(res.data.payData);

          PARAMS_PAY.success = function(res: any) {
            // 支付成功
            wx.switchTab({
              url: '../a_tab/order/main'
            });
          };

          PARAMS_PAY.fail = function(res: any) {
            // 支付失败
            wx.showModal({
              title: '支付失败',
              content: '支付失败，请稍后再试'
            });
          };

          wx.requestPayment(PARAMS_PAY);
        });
      }

      // TODO：唤起微信支付
      wx.requestPayment({
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: 'MD5',
        paySign: '',
        success: function(res: any) {},
        fail: function(res: any) {}
      });
    });
  }
}

export default Index;
