import { Vue, Component } from 'vue-property-decorator';
import API from '../../api';
import { ghbRequest } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {

  costs: any = {};

  onLoad(options: { logisticsorder: any, costs: any }) {
    const PARAMS_LOGISTICSORDER_REQUEST: Logisticsorder_Request = JSON.parse(options.logisticsorder);
    this.costs = JSON.parse(options.costs);
  }

  payNow() {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success: function (res: any) {
      },
      fail: function (res: any) {
      }
    })
  }
}

export default Index;
