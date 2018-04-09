import { Vue, Component, Provide } from 'vue-property-decorator';
import Card from '@/components/card.vue'; // mpvue目前只支持的单文件组件
import Tab from '@/components/tab/index.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    Card,
    Tab
  }
})
class Index extends Vue {
  @Provide() tabList: Array<string> = ['进行中', '已完成', '已取消'];
  
  // @Provide() currentIndex: number = 0;

  // tabClick(index: number) {
  //   this.currentIndex = index;
  // }

  // tabChange(e: any) {
  //   console.log(e);
  //   this.currentIndex = e.target.current;
  // }
 
}

export default Index;
