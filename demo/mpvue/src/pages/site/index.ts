import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackSetData } from '../../utils';
import bmap from '../../libs/bmap-wx.min.js'; 

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  @Provide() type: String = '';
  @Provide() listHeight: Number = 0;
  @Provide() inputValue: String = '';
  @Provide() results: Array<string> = [];

  // 获取传过来的参数
  onLoad(options: { type: string}) {
    this.type = options.type;
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
      url: 'http://api.map.baidu.com/place/v2/search?',
      data: {
        query: __this.inputValue,
        region: '广州',
        city_limit: true,
        output: 'json',
        ak: 'qLnjq14R4oIEEwtqHM3hcuRMsn1q61Hq'
      },
      success: function (res) {
        __this.results = res.data.results;
      }
    });
  }

  // 点击搜索结果
  selected(pointInfo: any) {
    pointInfo.type = this.type;
    wx.navigateTo({
      url: '../contact/main?pointInfo=' + JSON.stringify(pointInfo)
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
