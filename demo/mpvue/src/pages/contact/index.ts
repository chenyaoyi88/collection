import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue'; // mpvue目前只支持的单文件组件
import { goBackSetData } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item,
  }
})
class Index extends Vue {
  @Provide() sitePoint: string = '';
  @Provide() name: string = '';
  @Provide() mobile: string = '';

  onLoad(option: any) {
    this.sitePoint = option.sitePoint;
    // 小程序 hook
    console.log('option', option);
  }

  getValue(value: string, type: string) {
    this[type] = value;
  }

  confirmGoback() {
    const options = {
      name: this.name,
      mobile: this.mobile,
      sitePoint: this.sitePoint
    };
    console.log(options);
    goBackSetData(options);
    wx.navigateBack({
      delta: 2
    });
  }

  mounted() {
    // vue hook
    console.log('mounted');
  }
}

export default Index;
