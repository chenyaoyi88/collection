import { Vue, Component } from 'vue-property-decorator';
import { goBackSetData, getDesText, getCurrentPosition } from '../../utils';
import API from '../../api';
import IMG_TARGET from './target.svg';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  from: string = '';
  // 输入的搜索地址
  inputValue: string = '';
  // 输入的搜索地址之后百度接口返回来的地址信息列表
  results: Array<string> = [];
  // placeholder 显示文字（发货/收货）
  desText: string = '地址';
  // 从首页带过来的数据
  searchResult: any = null;
  // 定位图片
  imgTarget: any = IMG_TARGET;
  // 当前位置附近信息列表
  aNearbyPosition: Array<any> = [];
  // 当前位置文字
  sCurrentPosition: string = '';
  // 当前位置信息（对象集合）
  oCurrentPosition: any = null;
  // 是否正在定位
  isGettingPosition: boolean = false;

  // 获取传过来的参数（从开始还是结束进来的）
  onLoad(options: { from: string; searchResult: string }) {
    this.from = options.from;
    this.searchResult = JSON.parse(options.searchResult);
    this.inputValue = this.searchResult.name || '';
    this.desText = `${getDesText(this.from)}地点`;
    // 如果首页的发货/收货地址有之前填写的信息，则显示出来
    if (this.inputValue) {
      this.getMapData();
    }
    // 如果是点击发货地址栏进来的，定位获取当前位置信息
    if (this.from === 'start') {
      this.getPositionAuto();
    }
  }

  // 页面卸载之后重置页面
  onUnload() {
    this.clear();
    this.sCurrentPosition = '暂无定位信息';
    this.oCurrentPosition = null;
    this.aNearbyPosition = [];
  }

  // 设置标题
  onReady() {
    wx.setNavigationBarTitle({
      title: `输入${getDesText(this.from)}地点`
    });
  }

  // 自动获取当前位置
  getPositionAuto() {
    if (this.isGettingPosition) return;
    this.isGettingPosition = true;
    const _this = this;
    this.sCurrentPosition = '定位中...';
    // 获取地址
    getCurrentPosition(API.BAIDU_MAP.GETCURRENTPOS).then((aPosList: any) => {
      // 如果百度返回附近信息列表有数据
      if (aPosList.length) {
        for (let item of aPosList) {
          item.address = item.addr;
          item.location = {
            lat: item.point.y,
            lng: item.point.x
          }
        }
        this.aNearbyPosition = aPosList;
        this.sCurrentPosition = aPosList[0].name;
        this.oCurrentPosition = aPosList[0];
        this.isGettingPosition = false;
      } else {
        // 没有没有返回数据
        this.sCurrentPosition = '获取位置失败，请到空旷的位置再重试';
        this.oCurrentPosition = null;
        this.isGettingPosition = false;
      }
    });
  }

  // 搜索
  search(value: string) {
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
      success: function (res: any) {
        __this.results = res.data.results;
      }
    });
  }

  // 点击搜索结果
  selected(searchInfo: any) {
    // 如果没有地址数据，返回
    if (!searchInfo) return;
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
  }
}

export default Index;
