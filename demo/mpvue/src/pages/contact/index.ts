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
  @Provide() sitePoint: any = {};
  @Provide() name: string = '';
  @Provide() mobile: string = '';

  onLoad(option: any) {
    this.sitePoint = JSON.parse(option.pointInfo);
    console.log('option', this.sitePoint);
  }

  getValue(value: any, type: string) {
    this[type] = value;
  }

  confirmGoback() {
    const options: any = {
      name: this.name,
      mobile: this.mobile,
      sitePoint: this.sitePoint
    };

    goBackSetData(options, 3);
    wx.navigateBack({
      delta: 2
    });
  }

}

export default Index;
