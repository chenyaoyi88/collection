import { Vue, Component, Provide } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {

  title: Array<any> = ['进行中', '已完成', '已取消'];

  titleSlider = {
    width: 100 / this.title.length,        // 百分比
    left: 0
  };

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
