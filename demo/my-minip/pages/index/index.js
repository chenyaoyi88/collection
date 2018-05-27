import {
  iconList,
  updateApp,
  checkNextstepParmas,
  getNextstepParams,
  getCalcCosts,
  resetIndex
} from './services';
import {
  ghbRequest,
  showToastError,
  refreshToken
} from '../../utils/index';
import API from '../../api/api';
import {
  eventBusEmit,
  eventBusRemove,
  eventBusOn
} from '../event';

Page({
  data: {
    // 图片列表
    iconList,
    // 登录状态
    isLogin: false,
    // 发货信息
    startInfo: {},
    // 收货信息
    endInfo: {},
    // 车型ID
    vehicleTypeId: 0,
    // 预约时间
    bookingTime: '',
    // 已选择的额外服务列表
    aSelected: [],
    // 额外服务页面显示
    sSelected: '',
    // 优惠券列表
    aCouponList: [],
    // 优惠券ID
    couponInfo: {},
    // 车型列表
    carTypeList: [],
    // 默认车型
    carSelected: {
      name: '',
      id: null
    },
    // 提交条数
    clothsAmount: 1,
    // 货物备注
    goodsRemark: '',
    // 页面显示变量
    costs: null,
    // 中途点（默认为一个，如果只有一个的时候，作为终点）
    aHalfwaysList: [{}],
    additionalServicesList: [],
    // 往上滑出的选项组件
    oSelect: null,
    // 时间组件
    oPicker: null
  },

  // 选择发货/收货地点
  getPonit(e) {
    const params = e.detail.item.data.itemParams;
    const from = params.from;
    const searchResult = params.searchResult;
    const desIndex = params.desIndex;
    const sGoto = this.data.isLogin ? 'address' : 'search';
    wx.navigateTo({
      url: `../${sGoto}/${sGoto}?from=${from}&desIndex=${desIndex}&searchResult=${JSON.stringify(
        searchResult
      )}`
    });
  },

  // 添加中途点
  addHalfways() {
    if (this.data.aHalfwaysList.length > 4) {
      showToastError('目的地最多设置5个');
      return;
    }

    if (!this.data.startInfo.address) {
      showToastError('请输入始发地');
      return;
    }

    // 一个填写完再填写下一个
    const oNewHalfway = this.data.aHalfwaysList[this.data.aHalfwaysList.length - 1];
    if (!oNewHalfway.x || !oNewHalfway.y) {
      showToastError('请输入目的地');
      return;
    }

    // 添加新的目的地
    const oHalfway = {
      x: null,
      y: null,
      siteName: '',
      addressName: '',
      street: '',
      phone: '',
      contact: ''
    };

    const aHalfwaysList = this.data.aHalfwaysList;
    aHalfwaysList.push(oHalfway);
    this.setData({
      aHalfwaysList,
      endInfo: {}
    });
  },

  // 删除中途点
  delHalfway(e) {
    const params = e.detail.item.data.itemParams;
    const index = params.desIndex;

    if (this.data.aHalfwaysList.length < 2) return;
    const aHalfwaysList = this.data.aHalfwaysList;
    aHalfwaysList.splice(index, 1);
    this.setData({
      aHalfwaysList
    }, () => {
      this.getHalfwaysCost();
    });
  },

  // 获取价格（包括中途点）
  getHalfwaysCost() {
    const oEndInfo = this.data.aHalfwaysList[this.data.aHalfwaysList.length - 1];

    const endInfo = {
      address: oEndInfo.addressName,
      location: {
        lat: oEndInfo.y,
        lng: oEndInfo.x
      },
      mobile: oEndInfo.phone,
      name: oEndInfo.contact,
      siteName: oEndInfo.siteName,
      street: oEndInfo.street,
      cityCode: oEndInfo.cityCode
    };

    this.setData({
      endInfo
    }, () => {
      getCalcCosts(this);
    });

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
    getCalcCosts(this);
  },

  // 点击额外服务
  getServices() {
    if (!this.data.additionalServicesList.length) {
      this.getAdditionListData(true);
      return;
    }
    this.data.oSelect.show();
  },

  // 获取车型列表
  getCartypeListData() {
    ghbRequest({
      url: API.CARTYPE
    }).then((res) => {
      if (res.statusCode === 200) {
        const carTypeList = res.data;
        let carSelected = this.data.carSelected;
        if (!carSelected.id) {
          carSelected = {
            name: carTypeList[0].name,
            id: carTypeList[0].id
          };
        }
        this.setData({
          carTypeList,
          carSelected
        });
      }
    });
  },

  // 获取额外服务
  getAdditionListData(isClick = false) {
    ghbRequest({
      url: API.GETADDITIONALSERVICES
    }).then((res) => {
      if (!res.data.length) {
        isClick && showToastError('获取额外服务列表失败，请登录后再重试');
        return;
      }
      this.setData({
        additionalServicesList: res.data
      });
      if (isClick) {
        this.selectSlider = true;
      }
    });
  },

  // 额外服务选择
  checkboxChange(e) {
    const aSelected = e.detail.aSelected;
    const sSelected = e.detail.sSelected;
    this.setData({
      aSelected,
      sSelected
    });
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
      vehicleTypeId: this.data.carSelected.id,
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

  nextStep() {

    if (!checkNextstepParmas(this)) return;

    const PARAMS_LOGISTICSORDER_REQUEST = getNextstepParams(this);

    if (this.data.couponInfo.id) {
      this.data.costs.couponInfo = this.data.couponInfo;
    }

    // console.log('请求参数', PARAMS_LOGISTICSORDER_REQUEST);
    // console.log('costs', this.data.costs);
    // return;

    wx.navigateTo({
      url: `../paynow/paynow?logisticsorder=${JSON.stringify(
        PARAMS_LOGISTICSORDER_REQUEST
      )}&costs=${JSON.stringify(this.data.costs)}`
    });

  },

  // 页面刷新（更新 token，然后获取车型列表和额外服务列表）
  pageReload() {
    refreshToken(API.REFRESH).then(() => {
      // 请求各种页面数据
      this.getCartypeListData();
      this.getAdditionListData();
    });
  },

  onShow() {
    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    });
  },

  onLoad() {
    updateApp();
    this.pageReload();

    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false,
      oSelect: this.selectComponent('#my-select'),
      oPicker: this.selectComponent('#my-timepicker')
    });

    // 监听选中起始点、中途点（目的地）后，重新计算运费通知
    eventBusOn('getSiteInfo', this, (searchInfo) => {
      if (searchInfo.from.includes('start')) {
        this.setData({
          startInfo: searchInfo
        }, () => {
          getCalcCosts(this);
        });
      } else if (searchInfo.from.includes('des')) {

        const oHalfway = {
          x: searchInfo.location.lng,
          y: searchInfo.location.lat,
          siteName: searchInfo.siteName,
          addressName: searchInfo.address,
          street: searchInfo.street,
          phone: searchInfo.mobile,
          contact: searchInfo.name,
          cityCode: searchInfo.cityCode
        };

        let aHalfwaysList = this.data.aHalfwaysList;
        aHalfwaysList[Number(searchInfo.desIndex)] = oHalfway;
        this.setData({
          aHalfwaysList
        }, () => {
          this.getHalfwaysCost();
        });
      }
    });

    // 监听车型选择通知
    eventBusOn('getSelectedCartype', this, (res) => {
      const carInfo = res.carInfo;
      if (this.data.carSelected.id !== carInfo.id) {
        const carSelected = {
          name: carInfo.name,
          id: carInfo.id
        };
        this.setData({
          carSelected
        }, () => {
          getCalcCosts(this);
        });
      }
    });

    // 监听选中优惠券后，重新计算运费通知
    eventBusOn('getCoupon', this, (item) => {
      let couponInfo = {};
      if (item && item.id) {
        couponInfo = item;
      }
      this.setData({
        couponInfo
      }, () => {
        getCalcCosts(this);
      });
    });

    // 监听货物通知
    eventBusOn('getGoodsRemark', this, (res) => {
      const goodsRemark = res.goodsRemark || '';
      this.setData({
        goodsRemark
      });
    });

    // 监听重置通知
    eventBusOn('indexReset', this, () => {
      resetIndex(this);
    });

  },

  // 移除监听
  onUnload() {
    eventBusRemove('getSiteInfo', this);
    eventBusRemove('getSelectedCartype', this);
    eventBusRemove('getCoupon', this);
    eventBusRemove('getGoodsRemark', this);
    eventBusRemove('indexReset', this);
  },

  // 首页分享描述
  onShareAppMessage() {
    return {
      title: '发货就用广货宝，专业市场货运平台'
    };
  }
});