import { Vue, Component, Provide } from 'vue-property-decorator';
import Card from '@/components/card.vue'; // mpvue目前只支持的单文件组件

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    Card,
  }
})
class Index extends Vue {
  @Provide() tabList: Array<string> = ['进行中1', '已完成', '已取消'];
}

export default Index;
