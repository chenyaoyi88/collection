import { Vue, Component, Provide } from 'vue-property-decorator';
import mockData from './mock';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {

  @Provide() cartypeList: Array<any> = mockData;

  cartypeSelect(item: any) {
    console.log(item);
  }

  onShow() {
    console.log('onShow');
  }

  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
  }
}

export default Index;
