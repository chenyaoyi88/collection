import { Vue, Component } from 'vue-property-decorator';
import { goBackSetData, getDesText, getCurrentPosition } from '../../utils';
import API from '../../api';
import IMG_POS from './pos.svg';
import IMG_TARGET from './target.svg';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  from: string = '';
  listHeight: number = 0;
  inputValue: string = '';
  results: Array<string> = [];
  desText: string = '地址';
  searchResult: any = null;
  imgPos: any = IMG_POS;
  imgTarget: any = IMG_TARGET;

  sCurrentPosition: string = '';
  oCurrentPosition: any = null;
  isGettingPosition: boolean = false;

  // 获取传过来的参数（从开始还是结束进来的）
  onLoad(options: { from: string; searchResult: string }) {
    this.from = options.from;

    this.searchResult = JSON.parse(options.searchResult);
    this.inputValue = this.searchResult.name;
    this.desText = `${getDesText(this.from)}地点`;

    if (this.inputValue) {
      this.getMapData();
    }

    if (this.from === 'start') {
      this.getPositionAuto();
    }
  }

  onUnload() {
    this.clear();
    this.sCurrentPosition = '定位失败，请重试';
    this.oCurrentPosition = null;
  }

  onReady() {
    wx.setNavigationBarTitle({
      title: `输入${getDesText(this.from)}地点`
    });
  }

  // 计算/设置搜索结果的高度
  mounted() {
    if (!this.inputValue) {
      this.results = [];
    }
  }

  // 自动获取当前位置
  getPositionAuto() {
    if (this.isGettingPosition) return;
    this.isGettingPosition = true;
    const _this = this;
    this.sCurrentPosition = '定位中...';
    // 获取地址
    getCurrentPosition(API.BAIDU_MAP.GETCURRENTPOS).then((sPosition: any) => {
      wx.request({
        url: API.BAIDU_MAP.SEARCH,
        data: {
          query: sPosition,
          region: '广州',
          city_limit: true
        },
        success: function(res: any) {
          if (res.data && res.data.results && res.data.results.length) {
            _this.sCurrentPosition = res.data.results[0].name;
            _this.oCurrentPosition = res.data.results[0];
          } else {
            _this.sCurrentPosition = '定位失败，请重试';
            _this.oCurrentPosition = null;
          }
        },
        fail: function() {
          _this.sCurrentPosition = '定位失败，请重试';
          _this.oCurrentPosition = null;
        },
        complete: function() {
          _this.isGettingPosition = false;
        }
      });
    });
  }

  // 搜索
  search(value: string, isSetTag: boolean = false) {
    this.inputValue = value;
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
        city_limit: true
      },
      success: function(res: any) {
        __this.results = res.data.results;
      }
    });
  }

  // 点击搜索结果
  selected(searchInfo: any) {
    searchInfo.from = this.from;
    searchInfo.userName = this.searchResult.userName ? this.searchResult.userName : '';
    searchInfo.mobile = this.searchResult.mobile ? this.searchResult.mobile : '';
    searchInfo.street = this.searchResult.street ? this.searchResult.street : '';
    wx.navigateTo({
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
    // this.sCurrentPosition = '';
    // this.oCurrentPosition = null;
  }
}

export default Index;
