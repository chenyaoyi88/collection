import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue'; // mpvue目前只支持的单文件组件
import { goBackSetData, getDesText, showToastError, formatTrim, ghbRequest } from '../../utils';
import API from '../../api';

import contact from '../../components/item/icon/contact.png';
import mobile from '../../components/item/icon/mobile.png';
import street from '../../components/item/icon/street.png';

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

  getCityCode() {
    const __this = this;
    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    wx.request({
      url: API.BAIDU_MAP.GEOCODER,
      data: {
        location: `${this.searchInfo.location.lat},${this.searchInfo.location.lng}`
      },
      success: function(res: any) {
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

  getValue(value: any, type: string) {
    this[type] = value;
  }

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

    // 点击新增按钮进来，保存联系人和地址
    if (from.includes('new')) {
      this.addressAdd();
    } else if (from.includes('edit')) {
      this.addressEdit();
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
  addressAdd() {
    if (this.isBtnClick) return;
    this.isBtnClick = true;
    const PARAMRS_CERATE_REQUEST = {
      address: this.searchInfo.siteName,
      street: this.searchInfo.street,
      isDefault: false,
      serviceType: 1,
      longitude: this.searchInfo.location.lng,
      latitude: this.searchInfo.location.lat,
      remark: '',
      mobile: this.searchInfo.mobile,
      name: this.searchInfo.name,
      addressName: this.searchInfo.address,
      cityCode: this.searchInfo.cityCode
    };

    // 保存联系人和地址
    ghbRequest({
      url: API.CREATE,
      method: 'POST',
      data: PARAMRS_CERATE_REQUEST
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
            this.$store.commit('isSavedGoBackChange', {
              isSavedGoBack: true
            });
          }, 300);
        }
      })
      .catch(() => {
        this.isBtnClick = false;
      });
  }

  // 编辑保存地址 TODO：保存之后回去原位刷新
  addressEdit() {
    if (this.isBtnClick) return;
    this.isBtnClick = true;
    const PARAMRS_EDIT_REQUEST = {
      id: this.searchInfo.id,
      name: this.name,
      mobile: this.mobile,
      street: this.street
    };
    
    showToastError('编辑成功');
    setTimeout(() => {
      wx.navigateBack();
      this.isBtnClick = false;
      this.$store.commit('isSavedGoBackChange', {
        isSavedGoBack: true
      });
    }, 300);
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
    this.getCityCode();
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
