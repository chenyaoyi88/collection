import { Vue, Component } from 'vue-property-decorator';
import { goBackGetData, getDateList, getHoursArray, getMinsArray, ghbRequest } from '../../../utils';
import API from '../../../api';
import item from '@/components/item/item.vue';
import slider from '@/components/slider/slider.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item,
    slider
  }
})
class Index extends Vue {
  nextStepParams: any = {};
  startPoint: string = '选择发货地点';
  endPoint: string = '选择收货地点';
  dateArray: Array<any> = getDateList();
  dateIndex: Array<number> = [0, 0, 0];

  bookingDate: string = '';

  additionalServicesList: Array<any> = [
    // {
    //   id: 8,
    //   name: '推车',
    //   remark: '需要司机提供推车设备'
    // },
    // {
    //   id: 9,
    //   name: '搬运',
    //   remark: '需要司机提供搬运服务，价格面议'
    // },
    // {
    //   id: 10,
    //   name: '代收',
    //   remark: '需要司机提供代收货款的服务，价格方式面议'
    // }
  ];

  aSelectedServices: Array<any> = [];
  sSelectedServices: string = '';

  // （TODO：下次抽离部分）--------------------------start
  isShowMask: boolean = false;

  aniSlideMask: any = null;
  aniSlideMaskData: any = null;

  aniSlideContent: any = null;
  aniSlideContentData: any = null;
  // （TODO：下次抽离部分）--------------------------end

  // 提交参数
  clothsAmount: number = 0;
  // 货物信息
  goodsDesc: string = '';

  // 时间选择器选中逻辑（TODO：抽离出来作为独立组件逻辑）
  fnDateChange(e: any) {
    const myIndex = e.target.value;

    const index0 = myIndex[0];
    const index1 = myIndex[1];
    const index2 = myIndex[2];

    const sDate: string = this.dateArray[0][index0].value;
    const sHour: string = this.dateArray[1][index1].value;
    const sMin: string =
      this.dateArray[2] && this.dateArray[2][index2] && this.dateArray[2][index2].value;

    if (sHour) {
      this.bookingDate = `${sDate} ${sHour}:${sMin}:00`;
    } else {
      this.bookingDate = '';
    }
  }

  // 时间选择器内部逻辑（TODO：抽离出来作为独立组件逻辑）
  fnDateColumnchange(e: any) {
    // console.log('修改的列为', e.target.column, '，值为', e.target.value);

    this.$set(this.dateIndex, e.target.column, e.target.value);

    switch (e.target.column) {
      case 0:
        switch (this.dateIndex[0]) {
          case 0:
            this.$set(this.dateArray, 1, getHoursArray(new Date().getHours()));
            this.$set(this.dateArray, 2, []);
            break;
          case 1:
          case 2:
            this.$set(this.dateArray, 1, getHoursArray());
            this.$set(this.dateArray, 2, getMinsArray());
            break;
        }
        this.$set(this.dateIndex, 1, 0);
        this.$set(this.dateIndex, 2, 0);
        break;
      case 1:
        switch (this.dateIndex[0]) {
          case 0:
            this.$set(this.dateArray, 2, this.dateIndex[1] === 0 ? [] : getMinsArray());
            break;
        }
        this.dateIndex[2] = 0;
        break;
    }
  }

  // 选择发货/收货地点
  getPonit(type: string) {
    wx.navigateTo({
      url: '../../search/main?from=' + type
    });
  }

  // 选择车型
  carTypeSelect() {
    const url = '../../cartype/main';
    wx.navigateTo({ url });
  }

  // 点击额外服务
  extraServices() {
    this.showSlider();
  }

  getClothsAmount(value: any) {
    this.clothsAmount = value;
    console.log(this.clothsAmount);
  }

  // 货物信息
  fnGoodsInfo() {
    wx.navigateTo({
      url: '../../goodsinfo/main'
    });
  }

  // 下一步
  nextStep() {
    console.log('nextStep');
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

  // 底部滑动确定（TODO：抽离出来作为独立组件逻辑）
  sliderComfirm() {
    this.aSelectedServices = [];
    this.sSelectedServices = '';
    for (let item of this.additionalServicesList) {
      if (item.selected) {
        this.sSelectedServices += item.name + ' ';
        this.aSelectedServices.push(item);
      }
    }
    this.hideMask();
  }

  checkboxChange(item: any, index: number) {
    this.$set(this.additionalServicesList[index], 'selected', !this.additionalServicesList[index].selected);
  }

  onShow() {
    console.log(goBackGetData());
    const _this = this;
    ghbRequest({
      url: API.GETADDITIONALSERVICES
    }).then((res: any) => {
      console.log(res);
      _this.additionalServicesList = res.data;
    });

    this.goodsDesc = goBackGetData().goodsDesc || '';

    console.log('车型ID', goBackGetData().carInfo && goBackGetData().carInfo.id);
    console.log('额外服务', this.sSelectedServices);
    console.log('时间', this.bookingDate);
    console.log('货物信息-条数', this.clothsAmount);
    console.log('货物信息-备注', goBackGetData().goodsDesc);
  }
}

export default Index;
