import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackGetData } from '../../../utils';
import { item } from '../../../components';

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
    // 小程序 hook
    console.log('onShow');
  }

  mounted() {
    // vue hook
    console.log('mounted');
  }
}

export default Index;
