import { iconList } from './utils';
import {
  goBackGetData,
  ghbRequest,
  formatCurrency,
  showToastError,
  formatGhbGoodsRemarkDate,
  refreshToken,
  zerofillBack
} from '../../utils/index';
// 获取应用实例
const app = getApp();

Page({
  data: {
    iconList,
    isLogin: false,
    // 发货信息
    startInfo: {},
    // 收货信息
    endInfo: {},
    // 默认车型
    carSelected: {
      name: '',
      id: null
    },
    sCoupon: '',
    // 优惠券信息
    couponInfo: {},
    // 预定时间
    bookingTime: '',
    // 提交条数
    clothsAmount: 1,
    // 货物信息、备注
    goodsRemark: ''
  },
  // 获取车型
  getCarType() {
    wx.navigateTo({
      url: '../cartype/cartype'
    });
  },
  // 获取预定时间
  getDateValue(e) {
    this.data.bookingTime = e.detail.bookingTime;
    // this.fnCanCost();
  },
  // 点击优惠券
  getCoupon() {
    if (!(this.data.startInfo.location && this.data.endInfo.location)) {
      showToastError('请填写发货和收货地址');
      return;
    }

    if (!this.data.carSelected.id) {
      showToastError('请选择车型');
    }

    const PARAMS_LOGISTICSORDER_REQUEST = {
      senderX: this.data.startInfo.location.lng,
      senderY: this.data.startInfo.location.lat,
      receiverX: this.data.endInfo.location.lng,
      receiverY: this.data.endInfo.location.lat,
      vehicleTypeId: this.carSelected.id,
      orderType: 2
    };

    wx.navigateTo({
      url: '../coupon/coupon?from=index&LogisticsCoupons=' +
      JSON.stringify(PARAMS_LOGISTICSORDER_REQUEST) + '&couponInfo=' + JSON.stringify(this.data.couponInfo)
    });
  },
  // 获取条数
  getClothsAmount(e) {
    this.setData({
      clothsAmount: e.detail.value
    });
  },
  // 货物信息
  getGoodsRemark() {
    wx.navigateTo({
      url: '../remark/remark?goodsRemark=' + this.data.goodsRemark
    });
  },
  onShow() {
    const _this = this;
    const isLogin = wx.getStorageSync('token') ? true : false;

    const pages = getCurrentPages();
    const currPage = pages[pages.length - 1];

    // 从车型选择页面返回
    const carInfo = currPage.data.carInfo;

    if (carInfo) {
      if (this.data.carSelected.id !== carInfo.id) {
        const carSelected = {
          name: carInfo.name,
          id: carInfo.id
        };
        delete currPage.data.carInfo;
        this.setData({
          carSelected
        }, () => {
          // this.fnCanCost();
        });
      }
    }

    // 从货物信息页面返回
    if (currPage.data.goodsRemark) {
      this.setData({
        goodsRemark: currPage.data.goodsRemark || ''
      });
      delete currPage.data.goodsRemark;
    }


    console.log(currPage);

  },
  nextStep() {
    console.log(this.data);

    // 没有登录去登录页面
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }

    // 已登录，检查必填项，通过则前往下一步
    if (!this.data.startInfo.address) {
      showToastError('请填写发货详细地址');
      return;
    }
    if (!this.data.endInfo.address) {
      showToastError('请填写收货详细地址');
      return;
    }
    if (!this.data.carSelected.id) {
      showToastError('请选择车型');
      return;
    }
    if (!this.data.clothsAmount) {
      showToastError('请填写货物信息');
      return;
    }

    const sGoodsRemarkDate = formatGhbGoodsRemarkDate(this.data.bookingTime);
    const sClothsAmount = `${this.data.clothsAmount && `${this.data.clothsAmount}件`}`;
    const goodsDesc = `${sGoodsRemarkDate && sGoodsRemarkDate + ' 接货'} ${this.data.goodsRemark} ${sClothsAmount}`;

    if (!/\S/.test(this.data.goodsRemark)) {
      showToastError('请输入货物信息');
      return;
    }

    if (!(this.data.costs && this.data.costs.amount)) {
      showToastError('运费获取中，请稍后');
      return;
    }

  },
  onLoad() {
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    });
  }
});
