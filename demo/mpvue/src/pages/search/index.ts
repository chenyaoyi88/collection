import { Vue, Component } from 'vue-property-decorator';
import { goBackSetData, getDesText } from '../../utils';
import API from '../../api';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  from: string = '';
  listHeight: number = 0;
  inputValue: string = '';
  results: Array<string> = [];
  desText: string = '地址';
  searchResult: any = null;

  // 获取传过来的参数（从开始还是结束进来的）
  onLoad(options: { from: string, searchResult: string }) {
    this.from = options.from;
    this.searchResult = JSON.parse(options.searchResult);
    this.inputValue = this.searchResult.name;
    this.desText = `${getDesText(this.from)}地点`;
    if (this.inputValue) {
      this.getMapData();
    }
  }

  onReady() {
    wx.setNavigationBarTitle({
      title: `输入${getDesText(this.from)}地点` 
    })
  }

  // 计算/设置搜索结果的高度
  mounted() {
    const _this = this;
    if (!this.inputValue) {
      this.results = [];
    }
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

    this.getMapData();
  }

  // 获取搜索结果
  getMapData(): void {
    const __this = this;
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
    wx.request({
      url: API.BAIDU_MAP.SEARCH,
      data: {
        query: __this.inputValue,
        region: '广州',
        city_limit: true,
      },
      success: function (res: any) {
        __this.results = res.data.results;
      }
    });
  }

  // 点击搜索结果
  selected(searchInfo: any) {
    searchInfo.from = this.from;
    searchInfo.userName = this.searchResult.userName ? this.searchResult.userName : '';
    searchInfo.mobile = this.searchResult.mobile ? this.searchResult.mobile : '';
    wx.navigateTo({
      // url: '../contact/main?searchInfo=' + JSON.stringify(searchInfo)
      url: `../contact/main?searchInfo=${JSON.stringify(searchInfo)}`
    });
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
