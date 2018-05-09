import { Vue, Component } from 'vue-property-decorator';
import coupon from './coupon.vue';

import { isUsedList } from './mock';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    coupon
  }
})
class Index extends Vue {
  isUsedList: any = isUsedList;

  // 当前 tab 索引
  currentIndex: number = 0;
  // 来自何处
  from: string = '';

  // tab 标题
  tabTitle: Array<any> = [
    {
      name: '未使用(3)',
      value: 'notUsed '
    },
    {
      name: '已过期(3)',
      value: 'expired'
    },
    {
      name: '已使用(3)',
      value: 'used'
    }
  ];
  // tab 标题滑块
  titleSlider = {
    width: 100 / this.tabTitle.length,
    left: 0
  };

  // 点击 tab
  tabClick(index: number) {
    if (this.currentIndex === index) return;
    this.tabSwitch(index);
  }

  // 切换 tab
  tabSwitch(index: number) {
    this.currentIndex = index;
    this.titleSlider.left = 100 * this.currentIndex;
  }

  onLoad() {
    const options = this.$root['$mp'].query || {};
    this.from = options.from;
    switch (this.from) {
      case 'index':
        // 来自 首页
        console.log('来自 首页');
        break;
      case 'me':
        // 来自 我的
        console.log('来自 我的');
        break;
      default:
        this.from = 'me';
    }
  }

}

export default Index;
