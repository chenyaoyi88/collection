import { Vue, Component, Emit } from 'vue-property-decorator';
// 方法
import {
  goBackGetData,
  ghbRequest,
  formatCurrency,
  showToastError,
  formatGhbGoodsRemarkDate,
  refreshToken,
  zerofillBack
} from '../../../utils';
import API from '../../../api';
// 组件
import item from '@/components/item/item.vue';
import itemTimePicker from '@/components/item/item_time_picker.vue';
import sliderSelect from '@/components/slider/slider_select.vue';
// 图片
import imgGoods from '../../../components/item/icon/goods.png';
import imgArrow from '../../../components/item/icon/arrow.png';
import imgAdd from '../../../../static/images/add.png';

import { eventBus, ghbEvent } from '../../eventbus';
import {
  updateApp,
  checkNextstepParmas,
  getNextstepParams,
  getCalcCosts,
  resetAll
} from './services';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item,
    itemTimePicker,
    sliderSelect
  }
})
class Index extends Vue {
  img: any = {
    imgGoods,
    imgArrow,
    imgAdd
  };

  isLogin: boolean = false;

  // 下单需要的参数
  // 发货信息
  startInfo: any = {};
  // 收货信息
  endInfo: any = {};
  // 车型ID
  vehicleTypeId: number = 0;
  // 预约时间
  bookingTime: string = '';
  // 已选择的额外服务列表
  aSelectedServices: Array<any> = [];
  // 优惠券列表
  aCouponList: Array<any> = [];
  // 优惠券ID
  couponInfo: any = {};

  // 车型列表
  carTypeList: Array<any> = [];
  // 默认车型
  carSelected: any = {
    name: '',
    id: null
  };

  // 额外服务页面显示
  sSelectedServices: string = '';
  // 提交条数
  clothsAmount: number = 1;
  // 货物备注
  goodsRemark: string = '';

  // 页面显示变量
  costs: any = null;

  // 控制额外服务的 slider 显示隐藏
  selectSlider: boolean = false;

  // 中途点（默认为一个，如果只有一个的时候，作为终点）
  aHalfwaysList: Array<any> = [{}];

  // 获取预定时间
  fnGetDateValue(value: string) {
    this.bookingTime = value;
    getCalcCosts(this);
  }

  // 选择发货/收货地点
  fnGetPonit(from: string, searchResult: any, desIndex: number = -1) {
    let sGoto: string = this.isLogin ? 'address' : 'search';
    wx.navigateTo({
      url: `../../${sGoto}/main?from=${from}&desIndex=${desIndex}&searchResult=${JSON.stringify(
        searchResult
      )}`
    });
  }

  // 选择车型
  fnCarTypeSelect() {
    wx.navigateTo({
      url: '../../cartype/main'
    });
  }

  // 点击额外服务
  fnExtraServices() {
    if (!this.additionalServicesList.length) {
      this.getAdditionListData(true);
      return;
    }
    this.selectSlider = true;
  }

  // 点击优惠券
  fnCouponSelect() {
    if (!(this.startInfo.location && this.endInfo.location)) {
      showToastError('请填写发货和收货地址');
      return;
    }

    if (!this.carSelected.id) {
      showToastError('请选择车型');
    }

    const PARAMS_LOGISTICSORDER_REQUEST: LogisticsCoupons_Request = {
      senderX: this.startInfo.location.lng,
      senderY: this.startInfo.location.lat,
      receiverX: this.endInfo.location.lng,
      receiverY: this.endInfo.location.lat,
      vehicleTypeId: this.carSelected.id,
      orderType: 2
    };

    // 去优惠券页面，带去优惠券所需参数
    wx.navigateTo({
      url:
        '../../coupon/main?from=index&LogisticsCoupons=' +
        JSON.stringify(PARAMS_LOGISTICSORDER_REQUEST) +
        '&couponInfo=' +
        JSON.stringify(this.couponInfo)
    });
  }

  // 底部滑动隐藏
  fnHideSlider(isSliderShow: boolean) {
    this.selectSlider = isSliderShow;
  }

  // 获取货物信息条数（默认为1）
  fnGetClothsAmount(value: any) {
    this.clothsAmount = value;
  }

  // 去货物信息页面填写信息、备注（默认为空）
  fnGetGoodsInfo() {
    wx.navigateTo({
      url: '../../goodsinfo/main?goodsRemark=' + this.goodsRemark
    });
  }

  // 获取选择的额外服务列表和显示的值
  fnCheckboxChange(list: any, str: string) {
    this.aSelectedServices = list;
    this.sSelectedServices = str;
  }

  // 设置默认车型
  fnSetDefaultCar(resetCar: boolean = false) {
    // 设置默认车型
    if (!resetCar) {
      if (!this.carSelected.id) {
        this.carSelected.name = this.carTypeList[0].name;
        this.carSelected.id = this.carTypeList[0].id;
      }
    } else {
      this.carSelected.name = this.carTypeList[0].name;
      this.carSelected.id = this.carTypeList[0].id;
    }
  }

  // 删除中途点
  delHalfway(index: number) {
    if (this.aHalfwaysList.length < 2) return;
    this.aHalfwaysList.splice(index, 1);
    // console.log('删除中途点', this.aHalfwaysList);
    this.getHalfwaysCost();
  }

  // 添加中途点
  addHalfways() {
    if (this.aHalfwaysList.length > 5) {
      showToastError('途经点最多设置5个');
      return;
    }

    // 一个填写完再填写下一个
    const oNewHalfway = this.aHalfwaysList[this.aHalfwaysList.length - 1];
    if (!oNewHalfway.x || !oNewHalfway.y) {
      showToastError('请输入目的地');
      return;
    }

    // 添加新的目的地
    const oHalfway: Halfways = {
      x: null,
      y: null,
      siteName: '',
      addressName: '',
      street: '',
      phone: '',
      contact: ''
    };

    this.aHalfwaysList.push(oHalfway);
    this.endInfo = {};
  }

  // 获取价格（包括中途点）
  getHalfwaysCost() {
    const oEndInfo = this.aHalfwaysList[this.aHalfwaysList.length - 1];

    this.endInfo = {
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

    getCalcCosts(this);
  }

  // 下一步
  fnNextStep() {
    if (!checkNextstepParmas(this)) return;

    const PARAMS_LOGISTICSORDER_REQUEST: Logisticsorder_Request = getNextstepParams(this);

    if (this.couponInfo.id) {
      this.costs.couponInfo = this.couponInfo;
    }

    wx.navigateTo({
      url: `../../paynow/main?logisticsorder=${JSON.stringify(
        PARAMS_LOGISTICSORDER_REQUEST
      )}&costs=${JSON.stringify(this.costs)}`
    });
  }

  get additionalServicesList() {
    return this.$store.state.additionalServicesList;
  }

  // 获取车型列表
  getCartypeListData() {
    ghbRequest({
      url: API.CARTYPE
    }).then((res: any) => {
      if (res.statusCode === 200) {
        this.carTypeList = res.data;
        if (this.carTypeList.length) {
          this.$store.commit('carTypeListChange', {
            carTypeList: this.carTypeList
          });
          this.fnSetDefaultCar();
        }
      }
    });
  }

  // 获取额外服务
  getAdditionListData(isClick: boolean = false) {
    ghbRequest({
      url: API.GETADDITIONALSERVICES
    }).then((res: any) => {
      if (!res.data.length) {
        if (isClick) {
          showToastError('获取额外服务列表失败，请登录后再重试');
        }
        return;
      }
      this.$store.commit('additionalServicesListChange', {
        additionalServicesList: res.data
      });
      if (isClick) {
        this.selectSlider = true;
      }
    });
  }

  // 页面刷新（更新 token，然后获取车型列表和额外服务列表）
  pageReload() {
    refreshToken(API.REFRESH).then(() => {
      // 请求各种页面数据
      this.getCartypeListData();
      this.getAdditionListData();
    });
  }

  // 每次回到当前页面需要处理的逻辑
  onShow() {
    this.isLogin = wx.getStorageSync('token') ? true : false;

    // 收到重置消息
    if (this.$store.state.isIndexReset) {
      // 重置所有输入
      resetAll(this);
      this.$store.commit('isIndexResetChange', {
        isIndexReset: false
      });
    } else {
      const pages = getCurrentPages();
      const currPage = pages[pages.length - 1];

      // 从车型选择页面返回
      const carInfo = currPage.data.carInfo;
      if (carInfo) {
        if (this.carSelected.id !== carInfo.id) {
          this.carSelected = {
            name: carInfo.name,
            id: carInfo.id
          };
          currPage.data.carInfo = null;
          getCalcCosts(this);
        }
      }

      // 从货物信息页面返回
      if (currPage.data.goodsRemark) {
        this.goodsRemark = currPage.data.goodsRemark || '';
        currPage.data.goodsRemark = '';
      }
    }
  }

  created() {
    updateApp();
    this.pageReload();
  }

  // 监听跨页面事件
  onLoad() {
    this.isLogin = wx.getStorageSync('token') ? true : false;
    // 监听选中优惠券后，重新计算运费
    eventBus.$on(ghbEvent.getCoupon, (item: any) => {
      if (item && item.id) {
        this.couponInfo = item;
      } else {
        this.couponInfo = {};
      }
      getCalcCosts(this);
    });

    // 监听选中起始点、中途点（目的地）后，重新计算运费
    eventBus.$on(ghbEvent.getSiteInfo, (searchInfo: SearchInfo) => {
      // console.log(searchInfo);
      if (searchInfo.from.includes('start')) {
        this.startInfo = searchInfo;
        getCalcCosts(this);
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

        this.$set(this.aHalfwaysList, Number(searchInfo.desIndex), oHalfway);
        this.getHalfwaysCost();
        // console.log(this.aHalfwaysList);
      }
    });
  }

  onUnload() {
    // TODO：如果发现 eventBus 的事件有重复监听，可以在这里移除，目前没有发现问题所以暂时不处理
  }

  // 用户下拉动作，当前页面请求重新请求一次
  onPullDownRefresh() {
    this.pageReload();
  }

  // 首页分享描述
  onShareAppMessage() {
    return {
      title: '发货就用广货宝，专业市场货运平台'
    };
  }
}

export default Index;
