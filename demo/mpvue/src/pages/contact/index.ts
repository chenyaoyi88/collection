import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue'; // mpvue目前只支持的单文件组件

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item,
  }
})
class Index extends Vue {
  ver: number = 123;

  onShow() {
    // 小程序 hook
    console.log('onShow');
  }

  mounted() {
    // vue hook
    console.log('mounted');
  }
}

export default Index;
