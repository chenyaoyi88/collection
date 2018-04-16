import { Vue, Component } from 'vue-property-decorator';
import { goBackGetData, getDateList, getHoursArray, getMinsArray } from '../../../utils';
import item from '@/components/item/item.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item
  }
})
class Index extends Vue {
  nextStepParams: any = {};
  startPoint: string = '选择发货地点';
  endPoint: string = '选择收货地点';
  dateArray: Array<any> = getDateList();
  dateIndex: Array<number> = [0, 0, 0];

  bookingDate: string = '';

  animation: any = null;
  chooseSize: boolean = false;
  animationData: any = {};

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

  getPonit(type: string) {
    wx.navigateTo({
      url: '../../search/main?from=' + type
    });
  }

  carTypeSelect() {
    const url = '../../cartype/main';
    wx.navigateTo({ url });
  }

  nextStep() {
    console.log('nextStep');
  }

  showModal() {
    // 用that取代this，防止不必要的情况发生
    const _this = this;
    // 创建一个动画实例
    const animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'ease'
    });
    // 将该变量赋值给当前动画
    _this.animation = animation;
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(50).step();
    // 用setData改变当前动画
    this.animationData = animation.export();
    this.chooseSize = true;
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step();
      _this.animationData = animation.export();
    }, 200);
  }

  hideModal() {
    const _this = this;
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    });
    _this.animation = animation;
    animation.translateY(200).step();
    _this.animationData = animation.export();
    setTimeout(function() {
      animation.translateY(0).step();
      _this.animationData = animation.export();
      _this.chooseSize = false;
    }, 200);
  }

  test() {
    this.showModal();
  }

  onShow() {
    // console.log(goBackGetData());
  }
}

export default Index;
