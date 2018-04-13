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

  @Provide() nextStepParams: any = {};
  @Provide() startPoint: string = '选择发货地点';
  @Provide() endPoint: string = '选择收货地点';
  @Provide() time: string = '12:01';
  @Provide() aTime: Array<any> = [['立即预约', '今天', '明天'], ['c', 'd']];

  timeChange(e: any) {
    console.log(e.target.value);
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

  bindTimeChange(e: any) {
    console.log('picker发送选择改变，携带值为', e.target.value);
    this.time = e.target.value;
  }

  nextStep() {
    console.log('nextStep');
  }

  onHide() {
    console.log(getCurrentPages())// eslint-disable-line);
  }

  onShow() {
    console.log(goBackGetData());
  }

}

export default Index;
