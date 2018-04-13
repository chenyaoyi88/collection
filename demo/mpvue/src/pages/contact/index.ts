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
  @Provide() searchInfo: any = {};
  @Provide() name: string = '';
  @Provide() mobile: string = '';

  onLoad(option: any) {
    this.searchInfo = JSON.parse(option.searchInfo);
    console.log('option', this.searchInfo);
  }

  getValue(value: any, type: string) {
    this[type] = value;
  }

  confirmGoback() {
    this.searchInfo.userName = this.name;
    this.searchInfo.mobile = this.mobile;

    goBackSetData(this.searchInfo, 3);
    wx.navigateBack({
      delta: 2
    });
  }

}

export default Index;
