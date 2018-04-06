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

  getStartPoint() {
    console.log('getStartPoint');
  }

  getEndPoint() {
    console.log('getEndPoint');
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

}

export default Index;
