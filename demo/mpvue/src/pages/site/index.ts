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

  search(e: any) {
    const __this = this;
    if (e.target.value === '') {
      this.results = [];
      return;
    }
    
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
    wx.request({
      url: 'http://api.map.baidu.com/place/v2/search?',
      data: {
        query: e.target.value,
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

  selected(pointInfo: any) {
    pointInfo.type = this.type;
    wx.navigateTo({
      url: '../contact/main?pointInfo=' + JSON.stringify(pointInfo)
    });
    this.results = [];
  }

  onLoad(options: { type: string}) {
    this.type = options.type;
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
