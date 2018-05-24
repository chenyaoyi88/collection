
import { goBackSetData, getDesText, getCurrentPosition } from '../../utils/index';
import API from '../../api/api';

Page({
  data: {
    from: '',
    // 是否显示定位模块
    isShowPosition: false,
    // 输入的搜索地址
    inputValue: '',
    // 输入的搜索地址之后百度接口返回来的地址信息列表
    results: [],
    // placeholder 显示文字（发货/收货）
    desText: '地址',
    // 从首页带过来的数据
    searchResult: null,
    // 定位图片
    imgTarget: './target.svg',
    // 当前位置附近信息列表
    aNearbyPosition: [],
    // 当前位置文字
    sCurrentPosition: '',
    // 当前位置信息（对象集合）
    oCurrentPosition: null,
    // 是否正在定位
    isGettingPosition: false,
  },
  // 自动获取当前位置
  getPositionAuto() {
    let isGettingPosition = this.data.isGettingPosition;
    let sCurrentPosition = '';

    if (isGettingPosition) return;
    isGettingPosition = true;

    sCurrentPosition = '定位中...';

    this.setData({
      isGettingPosition,
      sCurrentPosition
    }, () => {
      // 获取地址
      getCurrentPosition(API.BAIDU_MAP.GETCURRENTPOS).then((aPosList) => {
        let oCurrentPosition = {};
        let sCurrentPosition = '';
        let aNearbyPosition = [];
        // 如果百度返回附近信息列表有数据
        if (aPosList.length) {
          for (let item of aPosList) {
            item.siteName = item.name;
            item.address = item.addr;
            item.location = {
              lat: item.point.y,
              lng: item.point.x
            };
          }
          aNearbyPosition = aPosList;
          sCurrentPosition = aPosList[0].siteName;
          oCurrentPosition = aPosList[0];
        } else {
          // 没有没有返回数据
          sCurrentPosition = '获取位置失败，请到空旷的位置再重试';
          oCurrentPosition = null;
        }

        this.setData({
          aNearbyPosition,
          sCurrentPosition,
          oCurrentPosition,
          isGettingPosition: false
        });

      });
    });
  },

  // 搜索
  search(e) {
    const inputValue = e.detail.value;
    if (inputValue === '') {
      this.setData({
        results: []
      });
      return;
    }
    this.setData({
      inputValue
    });
    this.getMapData(inputValue);
  },

  // 获取搜索结果
  getMapData(inputValue) {
    const _this = this;
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
    wx.request({
      url: API.BAIDU_MAP.SEARCH,
      data: {
        query: inputValue,
        region: '广州',
        city_limit: true
      },
      success: function (res) {
        if (res.data && res.data.results && res.data.results.length) {
          for (let item of res.data.results) {
            item.siteName = item.name;
          }
          const results = res.data.results;
          _this.setData({
            results
          });
        }
      }
    });
  },

  // 点击搜索结果
  selected(e) {
    const mapPosInfo = e.currentTarget.dataset.info;
    // 如果没有地址数据，返回
    if (!mapPosInfo) return;

    const searchInfo = {
      from: this.data.from,
      address: mapPosInfo.address,
      siteName: mapPosInfo.siteName,
      location: mapPosInfo.location,
      uid: mapPosInfo.uid,
      name: this.data.searchResult.name || '',
      mobile: this.data.searchResult.mobile || '',
      street: this.data.searchResult.street || '',
      desIndex: this.data.searchResult.desIndex || -1
    };

    wx.navigateTo({
      url: `../contact/contact?from=${this.data.from}&searchInfo=${JSON.stringify(searchInfo)}`
    });
  },

  // 返回
  goBack() {
    wx.navigateBack();
  },

  // 清空搜素结果
  clear() {
    this.setData({
      inputValue: '',
      results: []
    });
  },
  // 获取传过来的参数（从开始还是结束进来的）
  onLoad(options) {
    const from = options.from || 'start';
    const searchResult = JSON.parse(options.searchResult || '{}');
    searchResult.desIndex = options.desIndex;
    const inputValue = searchResult.siteName || '';
    const desText = `${getDesText(from)}地点`;
    let isShowPosition = false;

    // 如果首页的发货/收货地址有之前填写的信息，则显示出来
    inputValue && this.getMapData(inputValue);

    // 如果是点击发货地址栏进来的，定位获取当前位置信息
    if (from.includes('start')) {
      isShowPosition = true;
      this.getPositionAuto();
    }

    this.setData({
      from,
      searchResult,
      inputValue,
      desText,
      isShowPosition
    });

  }
})
