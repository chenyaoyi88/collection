import { Vue, Component, Emit } from 'vue-property-decorator';
// 方法
import {
  goBackGetData,
  ghbRequest,
  formatCurrency,
  showToastError,
  formatGhbGoodsRemarkDate,
  refreshToken
} from '../../../utils';
import API from '../../../api';
// 组件
import item from '@/components/item/item.vue';
import itemTimePicker from '@/components/item/item_time_picker.vue';
import sliderSelect from '@/components/slider/slider_select.vue';
// 图片
import imgGoods from '../../../components/item/icon/goods.png';
import imgArrow from '../../../components/item/icon/arrow.png';

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
    imgArrow
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

  // 如果填写了发货和收货地址，就可以计算运费
  fnCanCost(): void {
    if (!(this.startInfo.name && this.endInfo.name)) return;

    const _this = this;
    const PARAMS_COSTS_REQUEST: CalcCost_Request = {
      senderX: this.startInfo.location.lng,
      senderY: this.startInfo.location.lat,
      receiverX: this.endInfo.location.lng,
      receiverY: this.endInfo.location.lat,
      vehicleTypeId: this.carSelected.id,
      paymentType: 1,
      isBooking: this.bookingTime ? 'Y' : 'N',
      bookingTime: this.bookingTime ? this.bookingTime : null,
      isBuyInsurance: false
    };

    ghbRequest({
      url: API.COSTS,
      method: 'POST',
      data: PARAMS_COSTS_REQUEST
    }).then((res: any) => {
      if (res.statusCode === 200) {
        _this.costs = res.data;
        _this.costs.amount = formatCurrency(_this.costs.amount);
        _this.costs.zptFreight = formatCurrency(_this.costs.zptFreight);
        _this.costs.nightServiceFee = formatCurrency(_this.costs.nightServiceFee);
      } else {
        showToastError(res.data.message);
      }
    });
  }

  // 获取预定时间
  fnGetDateValue(value: string) {
    this.bookingTime = value;
    this.fnCanCost();
  }

  // 选择发货/收货地点
  fnGetPonit(type: string, searchResult: any) {
    wx.navigateTo({
      url: `../../search/main?from=${type}&searchResult=${JSON.stringify(searchResult)}`
    });
  }

  // 选择车型
  fnCarTypeSelect() {
    if (!this.carTypeList.length) {
      showToastError('获取车型列表失败，请登录后再重试');
      return;
    }
    wx.navigateTo({
      url: '../../cartype/main'
    });
  }

  // 点击额外服务
  fnExtraServices() {
    if (!this.additionalServicesList.length) {
      showToastError('获取额外服务列表失败，请登录后再重试');
      return;
    }
    this.selectSlider = true;
  }

  // 底部滑动隐藏
  fnHideSlider(isSliderShow: boolean) {
    this.selectSlider = isSliderShow;
  }

  // 获取条数
  fnGetClothsAmount(value: any) {
    this.clothsAmount = value;
  }

  // 货物信息
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

  // 重置预约时间
  fnResetComponent() {
    for (let i = 0; i < this.$children.length; i++) {
      const comp = this.$children[i];
      comp['reset'] && comp['reset']();
    }
  }

  // 清空/重置所有填写项目
  fnResetAll() {
    this.endInfo = {};
    this.fnSetDefaultCar(true);
    this.fnResetComponent();
    this.fnCheckboxChange([], '');
    this.clothsAmount = 1;
    this.goodsRemark = '';
    this.bookingTime = '';
    this.costs = null;
  }

  // 下一步
  fnNextStep() {
    // 没有登录去登录页面
    if (!this.isLogin) {
      wx.navigateTo({
        url: '../../login/main'
      });
      return;
    }

    // 已登录，检查必填项，通过则前往下一步
    if (!this.startInfo.address) {
      showToastError('请填写发货详细地址');
      return;
    }
    if (!this.endInfo.address) {
      showToastError('请填写收货详细地址');
      return;
    }
    if (!this.carSelected.id) {
      showToastError('请选择车型');
      return;
    }
    if (!this.clothsAmount) {
      showToastError('请填写货物信息');
      return;
    }

    const sGoodsRemarkDate = formatGhbGoodsRemarkDate(this.bookingTime);
    const sClothsAmount = `${this.clothsAmount && `${this.clothsAmount}件`}`;
    const goodsDesc = `${sGoodsRemarkDate && sGoodsRemarkDate + ' 接货'} ${
      this.goodsRemark
    } ${sClothsAmount}`;

    if (!/\S/.test(this.goodsRemark)) {
      showToastError('请输入货物信息');
      return;
    }

    if (!(this.costs && this.costs.amount)) {
      showToastError('运费获取中，请稍后');
      return;
    }

    // 下单所需参数
    const PARAMS_LOGISTICSORDER_REQUEST: Logisticsorder_Request = {
      type: 1,
      vehicleTypeId: this.carSelected.id,
      bookingTime: this.bookingTime,
      isBooking: this.bookingTime ? true : false,
      clothsAmount: this.clothsAmount,
      goodsDesc,
      insuranceStatus: 0,
      listOfAdditionalRequest: this.aSelectedServices,
      uuid: '',
      needLoading: false,
      paymentType: 1,
      receiverAddressName: this.endInfo.address,
      receiverContact: this.endInfo.userName,
      receiverPhone: this.endInfo.mobile,
      receiverSiteName: this.endInfo.name,
      receiverStreet: this.endInfo.street,
      receiverX: this.endInfo.location.lng,
      receiverY: this.endInfo.location.lat,
      endCityCode: this.endInfo.cityCode,
      senderAddressName: this.startInfo.address,
      senderContact: this.startInfo.userName,
      senderPhone: this.startInfo.mobile,
      senderSiteName: this.startInfo.name,
      senderStreet: this.startInfo.street,
      senderX: this.startInfo.location.lng,
      senderY: this.startInfo.location.lat,
      startCityCode: this.startInfo.cityCode
    };
    // console.log(PARAMS_LOGISTICSORDER_REQUEST);
    wx.navigateTo({
      url: `../../paynow/main?logisticsorder=${JSON.stringify(
        PARAMS_LOGISTICSORDER_REQUEST
      )}&costs=${JSON.stringify(this.costs)}`
    });
  }

  onShow() {
    const _this = this;
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;

    // TODO：页面重置在用户界面出现瞬变的情况，需要优化
    if (this.$store.state.isIndexReset) {
      // 重置所有输入
      this.fnResetAll();
      this.$store.commit('isIndexResetChange', {
        isIndexReset: false
      });
    } else {
      const pages = getCurrentPages(); // eslint-disable-line
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
          this.fnCanCost();
        }
      }

      // 从货物信息页面返回
      if (currPage.data.goodsRemark) {
        this.goodsRemark = currPage.data.goodsRemark || '';
        currPage.data.goodsRemark = '';
      }

      // 从发货/收货地点返回
      const searchInfo = currPage.data.searchInfo;
      if (searchInfo && searchInfo.from) {
        if (searchInfo.from.includes('start')) {
          if (
            this.startInfo.uid !== searchInfo.uid ||
            this.startInfo.userName !== searchInfo.userName ||
            this.startInfo.mobile !== searchInfo.mobile ||
            this.startInfo.street !== searchInfo.street
          ) {
            this.startInfo = searchInfo;
            currPage.data.searchInfo = {};
            this.fnCanCost();
          }
        } else if (searchInfo.from.includes('end')) {
          if (
            this.endInfo.uid !== searchInfo.uid ||
            this.endInfo.userName !== searchInfo.userName ||
            this.endInfo.mobile !== searchInfo.mobile ||
            this.endInfo.street !== searchInfo.street
          ) {
            this.endInfo = searchInfo;
            currPage.data.searchInfo = {};
            this.fnCanCost();
          }
        }
      }
    }

    // console.log(goBackGetData());
  }

  get additionalServicesList() {
    return this.$store.state.additionalServicesList;
  }

  getListData() {
    const _this = this;
    // 获取车型列表
    ghbRequest({
      url: API.CARTYPE
    }).then((res: any) => {
      if (res.statusCode === 200) {
        _this.carTypeList = res.data;
        if (_this.carTypeList.length) {
          _this.$store.commit('carTypeListChange', {
            carTypeList: _this.carTypeList
          });
          _this.fnSetDefaultCar();
        }
      }
    });

    // 获取额外服务
    ghbRequest({
      url: API.GETADDITIONALSERVICES
    }).then((res: any) => {
      _this.$store.commit('additionalServicesListChange', {
        additionalServicesList: res.data
      });
    });
  }

  // 页面刷新
  pageReload() {
    // 更新 token
    // 处理逻辑：本地存有 token 先更新 token
    refreshToken(API.REFRESH).then(() => {
      this.getListData();
    });
  }

  created() {
    this.pageReload();
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
