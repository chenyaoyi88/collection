import { goBackSetData, getDesText, showToastError, formatTrim, ghbRequest } from '../../utils/index';
import API from '../../api/api';

Page({
  data: {
    icon: {
      contact: '../../assets/icons/contact.png',
      mobile: '../../assets/icons/mobile.png',
      street: '../../assets/icons/street.png'
    },
    searchInfo: {},
    name: '',
    mobile: '',
    street: '',
    isLogin: false,
    btnName: '',
    isBtnClick: false,
    // 那点的样式名
    pointType: ''
  },
  // 获取城市码
  getCityCode() {
    const _this = this;
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    wx.request({
      url: API.BAIDU_MAP.GEOCODER,
      data: {
        location: `${this.data.searchInfo.location.lat},${this.data.searchInfo.location.lng}`
      },
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data && res.data.result && res.data.result.cityCode) {
            _this.data.searchInfo.cityCode = res.data.result.cityCode;
          } else {
            _this.data.searchInfo.cityCode = '';
          }
        } else {
          showToastError('获取地址所在城市失败');
        }
      }
    });
  },
  // 获取值
  getValue(e) {
    const value = e.detail.value || e.detail.e.detail.value;
    const inputType = e.target.dataset.name;

    this.setData({
      [inputType]: value
    });
  },

  // 确认返回
  confirmGoback() {
    console.log(this.data);

    // this.isLogin = wx.getStorageSync('token') ? true : false;

    // this.searchInfo.name = this.name;
    // this.searchInfo.mobile = this.mobile;
    // this.searchInfo.street = this.street;

    // if (!/\S/.test(this.searchInfo.name) || !/\S/.test(this.searchInfo.mobile)) {
    //   showToastError('联系人姓名和联系方式不能为空');
    //   return;
    // }

    // if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(this.searchInfo.mobile)) {
    //   showToastError('您输入的手机号码格式有误');
    //   return;
    // }

    // const from = this.searchInfo.from;

    // const PARAMS_ADDRESS_REQUEST = {
    //   name: this.searchInfo.name,
    //   mobile: this.searchInfo.mobile,
    //   street: this.searchInfo.street,
    //   address: this.searchInfo.siteName,
    //   addressName: this.searchInfo.address,
    //   isDefault: false,
    //   serviceType: 1,
    //   cityCode: this.searchInfo.cityCode,
    //   longitude: this.searchInfo.location.lng,
    //   latitude: this.searchInfo.location.lat,
    //   remark: this.searchInfo.remark || ''
    // };

    // // 点击新增按钮进来，保存联系人和地址
    // if (from.includes('new')) {
    //   this.addressAdd(PARAMS_ADDRESS_REQUEST);
    // } else if (from.includes('edit')) {
    //   this.addressEdit(PARAMS_ADDRESS_REQUEST);
    // } else {
    //   // 未登录，带值返回首页
    //   const searchInfo = this.searchInfo;
    //   eventBus.$emit(ghbEvent.getSiteInfo, searchInfo);
    //   wx.navigateBack({
    //     // 返回第3层，首页
    //     delta: 3
    //   });
    // }

  },

  onLoad(options) {

    // let searchInfo = JSON.parse(options.searchInfo || '{}');
    // let pointType = '';
    // let name = '';
    // let mobile = '';
    // let street = '';

    // if (searchInfo) {
    //   const from = searchInfo.from;
    //   pointType = from.includes('des') ? 'end' : 'start';
    //   if (from.includes('new') || from.includes('edit')) {
    //     name = searchInfo.name;
    //     mobile = searchInfo.mobile;
    //     street = searchInfo.street;
    //   }
    // }

    // // 获取地点所在城市
    // // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    // if (!searchInfo.cityCode) {
    //   // this.getCityCode();
    // }

    // this.setData({
    //   searchInfo,
    //   pointType,
    //   name,
    //   mobile,
    //   street
    // });

  }
})