import { goBackSetData, getDesText, showToastError, formatTrim, ghbRequest } from '../../utils/index';
import { eventBusEmit, eventBusRemove } from '../event';
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

    this.setData({
      isLogin: wx.getStorageSync('token') ? true : false
    });

    this.data.searchInfo.name = this.data.name;
    this.data.searchInfo.mobile = this.data.mobile;
    this.data.searchInfo.street = this.data.street;

    if (!/\S/.test(this.data.searchInfo.name) || !/\S/.test(this.data.searchInfo.mobile)) {
      showToastError('联系人姓名和联系方式不能为空');
      return;
    }

    if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(this.data.searchInfo.mobile)) {
      showToastError('您输入的手机号码格式有误');
      return;
    }

    const from = this.data.searchInfo.from;

    const PARAMS_ADDRESS_REQUEST = {
      name: this.data.searchInfo.name,
      mobile: this.data.searchInfo.mobile,
      street: this.data.searchInfo.street,
      address: this.data.searchInfo.siteName,
      addressName: this.data.searchInfo.address,
      isDefault: false,
      serviceType: 1,
      cityCode: this.data.searchInfo.cityCode,
      longitude: this.data.searchInfo.location.lng,
      latitude: this.data.searchInfo.location.lat,
      remark: this.data.searchInfo.remark || ''
    };

    console.log(PARAMS_ADDRESS_REQUEST);

    // 点击新增按钮进来，保存联系人和地址
    if (from.includes('new')) {
      this.addressAdd(PARAMS_ADDRESS_REQUEST);
    } else if (from.includes('edit')) {
      this.addressEdit(PARAMS_ADDRESS_REQUEST);
    } else {
      // 未登录，带值返回首页
      const searchInfo = this.data.searchInfo;

      // eventBus.$emit(ghbEvent.getSiteInfo, searchInfo);
      eventBusEmit('getSiteInfo', searchInfo);

      wx.navigateBack({
        // 返回第3层，首页
        delta: 3
      });

    }

  },

  // 新增保存地址
  addressAdd(params) {
    this.addressCtrl({
      url: `${API.ADDRESS}/create`,
      method: 'POST',
      params,
      isReload: true
    });
  },

  // 编辑保存地址
  addressEdit(params) {
    this.addressCtrl({
      url: `${API.ADDRESS}/${this.data.searchInfo.id}/update`,
      method: 'PUT',
      params,
      isReload: false
    });
  },

  // 添加和编辑相同逻辑的操作
  addressCtrl(options) {
    let isBtnClick = this.data.isBtnClick;
    if (isBtnClick) return;
    isBtnClick = true;

    this.setData({
      isBtnClick
    }, () => {
      wx.showLoading({
        title: '保存中...'
      });
      // 保存联系人和地址
      ghbRequest({
        url: options.url,
        method: options.method,
        data: options.params
      }, true)
        .then((res) => {
          if (res.statusCode !== 200) {
            showToastError(res.data.message);
          } else {
            if (options.isReload) {
              wx.navigateBack({
                delta: 2
              });
            } else {
              wx.navigateBack();
            }
            // eventBus.$emit(ghbEvent.gobackReload, true);
            eventBusEmit('gobackReload', options.isReload);
          }
          this.setData({
            isBtnClick: false
          });
        })
        .catch(() => {
          this.setData({
            isBtnClick: false
          });
        });
    });
  },

  onLoad(options) {

    let searchInfo = JSON.parse(options.searchInfo || '{}');
    let pointType = '';
    let name = '';
    let mobile = '';
    let street = '';
    let btnName = '确定';

    if (searchInfo) {
      const from = searchInfo.from;
      pointType = from.includes('des') ? 'end' : 'start';

      if (from.includes('new') || from.includes('edit')) {
        name = searchInfo.name;
        mobile = searchInfo.mobile;
        street = searchInfo.street;
      }

      if (from.includes('add')) {
        btnName = '保存';
      } else if (from.includes('edit')) {
        btnName = '编辑';
      }
      wx.setNavigationBarTitle({
        title: `${getDesText(searchInfo.from)}联系人`
      });
    }

    this.setData({
      searchInfo,
      pointType,
      name,
      mobile,
      street,
      btnName
    }, () => {
      // 获取地点所在城市
      // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
      if (!searchInfo.cityCode) {
        this.getCityCode();
      }
    });

  }
})