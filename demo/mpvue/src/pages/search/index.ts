import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackSetData } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  @Provide() from: String = '';
  @Provide() listHeight: Number = 0;
  @Provide() inputValue: String = '';
  @Provide() results: Array<string> = [];
  @Provide() desText: String = '地址';

  // 获取传过来的参数（从开始还是结束进来的）
  onLoad(options: { from: string}) {
    this.from = options.from;
    if (this.from === 'start') {
      this.desText = '发货地点';
    } else if (this.from === 'end') {
      this.desText = '收货地点';
    }
  }

  // 每次来的时候都清空搜素结果
  onShow() {
    this.results = [];
  }

  // 计算/设置搜索结果的高度
  mounted() {
    this.inputValue = '';
    const _this = this;
    wx.getSystemInfo({
      success: function (res: any) {
        _this.listHeight = res.windowHeight - 50;
      }
    });
  }

  // 搜索
  search(e: any) {
    const __this = this;
    this.inputValue = e.target.value;
    if (this.inputValue === '') {
      this.results = [];
      return;
    }
    
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
    wx.request({
      url: 'https://api.map.baidu.com/place/v2/search?',
      data: {
        query: __this.inputValue,
        region: '广州',
        city_limit: true,
        output: 'json',
        ak: 'R2xVO3xWBt8aLM8pf0ONUB0eTWmlclck'
      },
      success: function (res) {
        __this.results = res.data.results;
      }
    });
  }

  // 点击搜索结果
  selected(searchInfo: any) {
    searchInfo.from = this.from;
    console.log(searchInfo);
    wx.navigateTo({
      url: '../contact/main?searchInfo=' + JSON.stringify(searchInfo)
    });
    this.results = [];
  }

  // 返回
  goBack() {
    wx.navigateBack();
  }

  // 清空搜素结果
  clear() {
    this.inputValue = '';
    this.results = [];
  }
}

export default Index;
