import { Vue, Component } from 'vue-property-decorator';
import { goBackGetData, getDateList, getHoursArray, getMinsArray, ghbRequest, formatCurrency } from '../../../utils';
import API from '../../../api';
import item from '@/components/item/item.vue';
import itemTimePicker from '@/components/item/item_time_picker.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item,
    itemTimePicker
  }
})
class Index extends Vue {
  isLogin: boolean = false;

  // 下一步需要的参数
  nextStepParams: any = {};

  searchInfo: any = null;
  startInfo: any = {};
  endInfo: any = {};

  // 计算运费
  oCostRequest: any = {};

  carInfo: any = null;
  bookingTime: string = '';

  additionalServicesList: Array<any> = [];

  // 车型列表
  carTypeList: Array<any> = [];
  // 默认车型
  carSelected: any = {
    name: '小面包',
    id: null
  };

  aSelectedServices: Array<any> = [];
  sSelectedServices: string = '';

  // （TODO：下次抽离部分）--------------------------start
  isShowMask: boolean = false;

  aniSlideMask: any = null;
  aniSlideMaskData: any = null;

  aniSlideContent: any = null;
  aniSlideContentData: any = null;

  isClickSelected: boolean = false;
  // （TODO：下次抽离部分）--------------------------end

  // 提交参数
  clothsAmount: number = 0;
  // 货物信息
  goodsDesc: string = '';

  // 页面显示变量
  costs: any = '';

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
      console.log(res);
      if (res.statusCode === 400) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        });
      } else {
        _this.costs = formatCurrency(res.data.amount);
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
      url: `../../search/main?from=${type}&searchResult=${searchResult.name || ''}`
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
      wx.showToast({
        title: '获取额外服务列表失败，请登录后再尝试',
        icon: 'none'
      });
      return;
    }
    this.showSlider();
  }

  // 条数
  fnGetClothsAmount(value: any) {
    this.clothsAmount = value;
  }

  // 货物信息
  fnGetGoodsInfo() {
    wx.navigateTo({
      url: '../../goodsinfo/main'
    });
  }

  // 下一步
  fnNextStep() {
    console.log('nextStep');
    console.log(this.carSelected);
    if (!this.isLogin) {
      wx.navigateTo({
        url: '../../login/main'
      });
    }
  }

  // 显示底部滑动内容（TODO：抽离出来作为独立组件逻辑）
  showSlider() {
    const animationMask = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    });
    const animationContent = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    });

    this.aniSlideMask = animationMask;
    this.aniSlideContent = animationContent;

    this.isShowMask = true;

    setTimeout(() => {
      this.aniSlideMask.opacity(0.5).step();
      this.aniSlideContent.translateY(0).step();
      this.aniSlideMaskData = this.aniSlideMask.export();
      this.aniSlideContentData = this.aniSlideContent.export();
    }, 0);
  }

  // 隐藏底部滑动内容（TODO：抽离出来作为独立组件逻辑）
  hideMask() {
    this.aniSlideMask.opacity(0).step();
    this.aniSlideContent.translateY(300).step();
    this.aniSlideMaskData = this.aniSlideMask.export();
    this.aniSlideContentData = this.aniSlideContent.export();
    setTimeout(() => {
      this.isShowMask = false;
    }, 300);
  }

  // 底部滑动取消（TODO：抽离出来作为独立组件逻辑）
  sliderCancel() {
    this.hideMask();
  }

  sliderSelect() {
    this.aSelectedServices = [];
    this.sSelectedServices = '';
    for (let item of this.additionalServicesList) {
      if (item.selected) {
        this.sSelectedServices += item.name + ' ';
        this.aSelectedServices.push(item);
      }
    }
  }

  // 底部滑动确定（TODO：抽离出来作为独立组件逻辑）
  sliderComfirm() {
    this.sliderSelect();
    this.hideMask();
  }

  checkboxChange(item: any, index: number) {
    this.$set(this.additionalServicesList[index], 'selected', !this.additionalServicesList[index].selected);
    this.sliderSelect();
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;

    console.log(goBackGetData());

    const _this = this;

    // 获取额外服务
    ghbRequest({
      url: API.GETADDITIONALSERVICES
    }).then((res: any) => {
      console.log(res);
      _this.additionalServicesList = res.data;
    });

    // 获取车型列表（NOTE：因为默认要选择小面包，所以要提前请求一次）
    ghbRequest({
      url: API.CARTYPE,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        _this.carTypeList = res.data;
        wx.setStorageSync('carTypeList', _this.carTypeList);
        for (let item of _this.carTypeList) {
          if (item.name === _this.carSelected.name) {
            _this.carSelected.id = item.id;
          }
        }
      }
    });

    this.carInfo = goBackGetData().carInfo;
    // 从车型选择页面返回
    if (this.carInfo) {
      this.carSelected = {
        name: this.carInfo.name,
        id: this.carInfo.id
      };
      this.fnCanCost();
    }
    this.goodsDesc = goBackGetData().goodsDesc || '';

    this.searchInfo = goBackGetData().searchInfo;
    if (this.searchInfo && this.searchInfo.from) {
      if (this.searchInfo.from === 'start') {
        this.startInfo = this.searchInfo;

        this.fnCanCost();

      } else if (this.searchInfo.from === 'end') {
        this.endInfo = this.searchInfo;

        this.fnCanCost();
      }
    }

    console.log('endInfo', this.endInfo);

    console.log('车型信息', this.carInfo);
    console.log('额外服务', this.sSelectedServices);
    console.log('时间', this.bookingTime);
    console.log('货物信息-条数', this.clothsAmount);
    console.log('货物信息-备注', this.goodsDesc);

    console.log();
  }
}

export default Index;
