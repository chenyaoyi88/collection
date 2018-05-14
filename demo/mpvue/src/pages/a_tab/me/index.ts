import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest, showToastError } from '../../../utils';
import API from '../../../api';
import avantarImg from '../../../../static/images/avantar.png';
import { eventBus, ghbEvent } from '../../eventbus';

@Component({
  components: {
    item
  }
})
class Me extends Vue {
  isLogin: boolean = false;
  userInfo: any = {};
  mobile: string = '';
  avantar: any = avantarImg;
  LogisticsCoupons: Array<any> = [];

  onShow() {
    const _this = this;
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
    if (this.isLogin) {
      this.mobile = wx.getStorageSync('mobile');
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function(res: WX_UserInfo) {
          _this.userInfo = res.userInfo;
          _this.avantar = _this.userInfo.avatarUrl;
        }
      });
      this.getCouponListFormIndex();
    } else {
      this.mobile = '点击登录';
      this.avantar = avantarImg;
    }
  }

  reset() {
    this.isLogin = false;
    this.userInfo = {};
    this.mobile = '点击登录';
    this.avantar = avantarImg;
  }

  // 点击去登录页面
  gotoLogin() {
    if (!this.isLogin) {
      wx.navigateTo({
        url: '../../login/main'
      });
    }
  }

  // 点击去优惠券页面
  gotoCoupon() {
    wx.navigateTo({
      url: '../../coupon/main?from=me'
    });
  }

  // 收费标准 webview h5页面
  ghbLogisticFee(): void {
    wx.navigateTo({
      url:
        '../../webview/main?webUrl=' +
        'https://www.guanghuobao.com/static/app-h5/html/logisticFee.html'
    });
  }

  logout() {
    wx.showLoading({
      title: '正在退出...'
    });
    ghbRequest({
      url: API.LOGOUT,
      method: 'DELETE'
    }).then((res: GHB_Response<{}>) => {
      if (res.statusCode === 200) {
        // 退出之后重置所有数据
        this.$store.commit('isIndexResetChange', {
          isIndexReset: true
        });

        eventBus.$emit(ghbEvent.resetOrderList);

        wx.removeStorageSync('token');
        wx.removeStorageSync('mobile');

        this.reset();
      } else {
        showToastError('操作失败，请稍后再试');
      }
    });
  }

  // 获取可使用优惠券列表
  getCouponListFormIndex() {
    ghbRequest({
      url: API.LISTCOUPONBYTYPE,
      data: {
        type: 1
      }
    }).then((res: any) => {
      this.LogisticsCoupons = res.data;
    });
  }
}

export default Me;
