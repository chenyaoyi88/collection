import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackGetData } from '../../../utils';
import item from '@/components/item/item.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item
  }
})
class Index extends Vue {
  // computed
  get msg() {
    return this.$store.state.msg;
  }

  @Provide() startPoint: string = '选择发货地点';
  @Provide() endPoint: string = '选择收货地点';

  getPonit() {
    wx.navigateTo({
      url: '../../site/main'
    });
  }

  carTypeSelect() {
    const url = '../../login/main';
    wx.navigateTo({ url });
  }

  goBacksendParams() {
    const url = '../../login/main';
    wx.navigateTo({ url });
  }

  nextStep() {
    console.log('nextStep');
  }

  onShow() {
    // if (goBackGetData().startPoint) {
    //   this.startPoint = goBackGetData().startPoint;
    // }
    // if (goBackGetData().endPoint) {
    //   this.endPoint = goBackGetData().endPoint;
    // }
    console.log(goBackGetData());
  }

}

export default Index;
