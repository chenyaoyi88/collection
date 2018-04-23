import { Vue, Component } from 'vue-property-decorator';
import { goBackGetData, ghbRequest, formatCurrency, showToastError, uuid } from '../../../utils';
import API from '../../../api';
import item from '@/components/item/item.vue';
import itemTimePicker from '@/components/item/item_time_picker.vue';
import sliderSelect from '@/components/slider/slider_select.vue';
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

  // searchInfo: any = null;
  // carInfo: any = null;

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
  // 货物信息
  goodsDesc: string = '';

  // 额外服务列表
  additionalServicesList: Array<any> = [];
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
      vehicleTypeId: this.vehicleTypeId,
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
      if (res.statusCode === 400) {
        showToastError(res.data.message);
      } else {
        _this.costs = res.data;
        _this.costs.amount = formatCurrency(_this.costs.amount);
        _this.costs.zptFreight = formatCurrency(_this.costs.zptFreight);
        _this.costs.nightServiceFee = formatCurrency(_this.costs.nightServiceFee);
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
    // wx.navigateTo({
    //   url: `../../search/main?from=${type}&searchResult=${searchResult.name || ''}`
    // });
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
    if (!this.vehicleTypeId) {
      showToastError('请选择车型');
      return;
    }
    const sBookingTime = `${this.bookingTime && `${this.bookingTime}接货`}`;
    const sClothsAmount = `${this.clothsAmount && `${this.clothsAmount}件`}`;
    this.goodsDesc = `${sBookingTime} ${this.goodsRemark} ${sClothsAmount}`;
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
      vehicleTypeId: this.vehicleTypeId,
      bookingTime: this.bookingTime,
      isBooking: this.bookingTime ? true : false,
      clothsAmount: this.clothsAmount,
      goodsDesc: this.goodsDesc,
      insuranceStatus: 0,
      listOfAdditionalRequest: this.aSelectedServices,
      uuid: uuid(),
      needLoading: false,
      paymentType: 1,
      receiverAddressName: this.endInfo.address,
      receiverContact: this.endInfo.userName,
      receiverPhone: this.endInfo.mobile,
      receiverSiteName: this.endInfo.name,
      receiverX: this.endInfo.location.lng,
      receiverY: this.endInfo.location.lat,
      endCityCode: this.endInfo.cityCode,
      senderAddressName: this.startInfo.address,
      senderContact: this.startInfo.userName,
      senderPhone: this.startInfo.mobile,
      senderSiteName: this.startInfo.name,
      senderX: this.startInfo.location.lng,
      senderY: this.startInfo.location.lat,
      startCityCode: this.startInfo.cityCode,
    }
    console.log('下单参数', PARAMS_LOGISTICSORDER_REQUEST);
    console.log('运费', this.costs);
    wx.navigateTo({
      url: `../../paynow/main?logisticsorder=${JSON.stringify(PARAMS_LOGISTICSORDER_REQUEST)}&costs=${JSON.stringify(this.costs)}`
    });
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;

    const _this = this;

    // 获取额外服务
    ghbRequest({
      url: API.GETADDITIONALSERVICES
    }).then((res: any) => {
      _this.additionalServicesList = res.data;
    });

    const carInfo = goBackGetData().carInfo;
    // 从车型选择页面返回
    if (carInfo) {
      if (this.carSelected.id !== carInfo.id) {
        this.carSelected = {
          name: carInfo.name,
          id: carInfo.id
        };
        this.fnCanCost();
      }
    }
    this.goodsRemark = goBackGetData().goodsRemark || '';

    const searchInfo = goBackGetData().searchInfo;
    if (searchInfo && searchInfo.from) {
      if (searchInfo.from === 'start') {
        if (
          this.startInfo.uid !== searchInfo.uid || 
          this.startInfo.userName !== searchInfo.userName ||
          this.startInfo.mobile !== searchInfo.mobile) {
          this.startInfo = searchInfo;
          this.fnCanCost();
        }
      } else if (searchInfo.from === 'end') {
        if (this.endInfo.uid !== searchInfo.uid ||
          this.endInfo.userName !== searchInfo.userName ||
          this.endInfo.mobile !== searchInfo.mobile
        ) {
          this.endInfo = searchInfo;
          this.fnCanCost();
        }
      }
    }

    console.log(goBackGetData());
    // console.log('endInfo', this.endInfo);
    // console.log('车型信息', carInfo);
    // console.log('额外服务', this.sSelectedServices);
    // console.log('时间', this.bookingTime);
    // console.log('货物信息-条数', this.clothsAmount);
    // console.log('货物信息-备注', this.goodsRemark);

  }

  mounted() {
    const _this = this;
    // 获取车型列表（NOTE：因为默认要选择小面包，所以要提前请求一次）
    ghbRequest({
      url: API.CARTYPE,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        _this.carTypeList = res.data;
        if (_this.carTypeList.length) {
          wx.setStorageSync('carTypeList', _this.carTypeList);
          for (let item of _this.carTypeList) {
            // 设置小面包为默认车型
            if (item.name === '小面包') {
              if (!_this.carSelected.id) {
                _this.carSelected.name = item.name;
                _this.carSelected.id = _this.vehicleTypeId = item.id;
              }
            }
          }
        }
      }
    });

    wx.login({
      success: function (res: any) {
        // console.log(res);
      }
    });
    // wx.getLocation({
    //   success: function (res: any) {
    //     console.log(res);
    //   }
    // })
  }
}

export default Index;
