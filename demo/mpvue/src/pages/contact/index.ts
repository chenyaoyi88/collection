import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue'; // mpvue目前只支持的单文件组件
import { goBackSetData, getDesText, showToastError, formatTrim, ghbRequest } from '../../utils';
import API from '../../api';

import contact from '../../components/item/icon/contact.png';
import mobile from '../../components/item/icon/mobile.png';
import street from '../../components/item/icon/street.png';

import { eventBus, ghbEvent } from '../eventbus';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item
  }
})
class Index extends Vue {
  searchInfo: any = {};
  name: string = '';
  mobile: string = '';
  street: string = '';
  isLogin: boolean = false;
  btnName: string = '';
  isBtnClick: boolean = false;

  icon: any = {
    contact,
    mobile,
    street
  };

  // 获取城市码
  getCityCode() {
    const __this = this;
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    wx.request({
      url: API.BAIDU_MAP.GEOCODER,
      data: {
        location: `${this.searchInfo.location.lat},${this.searchInfo.location.lng}`
      },
      success: function (res: any) {
        if (res.statusCode === 200) {
          if (res.data && res.data.result && res.data.result.cityCode) {
            __this.searchInfo.cityCode = res.data.result.cityCode;
          } else {
            __this.searchInfo.cityCode = '';
          }
        } else {
          showToastError('获取地址所在城市失败');
        }
      }
    });
  }

  // 获取值
  getValue(value: any, type: string) {
    this[type] = value;
  }

  // 确认返回
  confirmGoback() {
    this.isLogin = wx.getStorageSync('token') ? true : false;

    this.searchInfo.name = this.name;
    this.searchInfo.mobile = this.mobile;
    this.searchInfo.street = this.street;

    if (!/\S/.test(this.searchInfo.name) || !/\S/.test(this.searchInfo.mobile)) {
      showToastError('联系人姓名和联系方式不能为空');
      return;
    }

    if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(this.searchInfo.mobile)) {
      showToastError('您输入的手机号码格式有误');
      return;
    }

    const from = this.searchInfo.from;
    
    const PARAMS_ADDRESS_REQUEST = {
      name: this.searchInfo.name,
      mobile: this.searchInfo.mobile,
      street: this.searchInfo.street,
      address: this.searchInfo.siteName,
      addressName: this.searchInfo.address,
      isDefault: false,
      serviceType: 1,
      cityCode: this.searchInfo.cityCode,
      longitude: this.searchInfo.location.lng,
      latitude: this.searchInfo.location.lat,
      remark: ''
    };

    // 点击新增按钮进来，保存联系人和地址
    if (from.includes('start')) {
      this.addressAdd(PARAMS_ADDRESS_REQUEST);
    } else if (from.includes('edit')) {
      this.addressEdit(PARAMS_ADDRESS_REQUEST);
    } else {
      goBackSetData(
        {
          searchInfo: this.searchInfo
        },
        3
      );
      wx.navigateBack({
        delta: 2
      });
    }
  }

  // 新增保存地址
  addressAdd(params: any) {
    if (this.isBtnClick) return;
    this.isBtnClick = true;

    // 保存联系人和地址
    ghbRequest({
      url: `${API.ADDRESS}/create`,
      method: 'POST',
      data: params
    })
      .then((res: any) => {
        if (res.statusCode !== 200) {
          showToastError(res.data.message);
          this.isBtnClick = false;
        } else {
          showToastError('保存成功');
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            });
            this.isBtnClick = false;
            eventBus.$emit(ghbEvent.gobackReload, true);
          }, 300);
        }
      })
      .catch(() => {
        this.isBtnClick = false;
      });
  }

  // 编辑保存地址 TODO：保存之后回去原位刷新
  addressEdit(params: any) {
    if (this.isBtnClick) return;
    this.isBtnClick = true;
    
    ghbRequest({
      url: `${API.ADDRESS}/${this.searchInfo.id}/update`,
      method: 'PUT',
      data: params
    })
    .then((res: any) => {
      if (res.statusCode !== 200) {
        showToastError(res.data.message);
        this.isBtnClick = false;
      } else {
        showToastError('编辑成功');
        setTimeout(() => {
          wx.navigateBack();
          this.isBtnClick = false;
          eventBus.$emit(ghbEvent.gobackReload, false);
        }, 50);
      }
    })
    .catch(() => {
      this.isBtnClick = false;
    });
  }

  reset() {
    this.name = '';
    this.mobile = '';
    this.street = '';
    this.btnName = '';
    this.isBtnClick = false;
  }

  onLoad(option: any) {
    this.searchInfo = JSON.parse(option.searchInfo || '{}');
    console.log(this.searchInfo);
    if (this.searchInfo) {
      const from = this.searchInfo.from;
      if (from.includes('start') || from.includes('edit')) {
        this.name = this.searchInfo.name;
        this.mobile = this.searchInfo.mobile;
        this.street = this.searchInfo.street;
      }
    }
    // 获取地点所在城市

    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    if (!this.searchInfo.cityCode) {
      this.getCityCode();
    }
  }

  // 页面卸载之后重置页面
  onUnload() {
    this.reset();
  }

  onReady() {
    const from = this.searchInfo.from;
    if (from.includes('add')) {
      this.btnName = '保存';
    } else if (from.includes('edit')) {
      this.btnName = '编辑';
    } else {
      this.btnName = '确定';
    }
    wx.setNavigationBarTitle({
      title: `${getDesText(this.searchInfo.from)}联系人`
    });
  }
}

export default Index;
