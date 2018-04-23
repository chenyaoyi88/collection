import { Vue, Component, Provide } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {

  items = [
    {name: 'USA', value: '美国'},
    {name: 'CHN', value: '中国', checked: 'true'},
    {name: 'BRA', value: '巴西'},
    {name: 'JPN', value: '日本'},
    {name: 'ENG', value: '英国'},
    {name: 'TUR', value: '法国'}
  ];

  title: Array<any> = ['进行中', '已完成', '已取消'];

  titleSlider = {
    width: 100 / this.title.length,        // 百分比
    left: 0
  };

  value: any = '';

  // 全局
  mounted() {
    this.$store.commit('tabIndexChange', {
      tabIndex: 2
    });
    console.log(this.$store);
  }

  // computed
  get tabIndex () {
    return this.$store.state.tabIndex;
  }
  
  radioChange (e: any) {
    this.value = e.target.value;
    console.log(this.value);
  }

  v1bottom(e: any) {
    console.log('v1到底部了');
    console.log(e);
    wx.showToast({
      title: 'v1到底部了',
      icon: 'none'
    });
  }

  v1Top(e: any) {
    console.log('v1到顶部了');
    console.log(e);
    wx.showToast({
      title: 'v1到顶部了',
      icon: 'none'
    });
  }
}

export default Index;
