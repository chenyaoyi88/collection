import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackSetData } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  @Provide() listHeight: Number = 0;
  @Provide() inputValue: String = '';
  @Provide() results: Array<string> = [];

  onShow() {
    // 小程序 hook
    console.log('onShow');
  }

  search(e: any) {
    const _this = this;
    wx.request({
      url: 'https://sug.so.360.cn/suggest?callback=getData&encodein=utf-8&encodeout=utf-8',
      data: {
        word: encodeURI(e.target.value)
      },
      success: function (res) {
        const str = res.data;
        const str1 = str.substring(str.indexOf('[') + 1, str.lastIndexOf(']'));
        if (!str1.length) {
          _this.results = [];
          return;
        }
        const arr = str1.replace(/\"/g, '').split(',');
        _this.results = arr;
      }
    })
  }

  selected(point: string) {
    console.log(point);

    wx.navigateTo({
      url: '../contact/main?sitePoint=' + point
    });

    // goBackSetData({
    //   startPoint: item
    // });
    // wx.navigateBack();
    this.results = [];
  }

  mounted() {
    const _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.listHeight = res.windowHeight - res.windowWidth / 750 * 100;
      }
    });
  }
}

export default Index;
