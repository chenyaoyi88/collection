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
    item,
  }
})
class Index extends Vue {
  searchInfo: any = {};
  name: string = '';
  mobile: string = '';
  street: string = '';

  icon: any = {
    contact,
    mobile,
    street
  };

  onLoad(option: any) {
    this.name = '';
    this.mobile = '';
    this.street = '';
    this.searchInfo = JSON.parse(option.searchInfo);
    this.searchInfo.from = formatTrim(this.searchInfo.from);
    console.log(this.searchInfo);
    if (this.searchInfo) {
      this.name = this.searchInfo.userName;
      this.mobile = this.searchInfo.mobile;
      this.street = this.searchInfo.street;
    }
    // 获取地点所在城市

    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    this.getCityCode();
  }

  onReady() {
    wx.setNavigationBarTitle({
      title: `输入${getDesText(this.searchInfo.from)}联系人`
    });
  }

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

  getValue(value: any, type: string) {
    this[type] = value;
  }

  confirmGoback() {
    this.searchInfo.userName = this.name;
    this.searchInfo.mobile = this.mobile;
    this.searchInfo.street = this.street;

    if (!(/\S/.test(this.searchInfo.userName)) || !(/\S/.test(this.searchInfo.mobile))) {
      showToastError('联系人姓名和联系方式不能为空');
      return;
    }

    if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(this.searchInfo.mobile)) {
      showToastError('您输入的手机号码格式有误');
      return;
    }

    const PARAMRS_CERATE_REQUEST = {
      address: this.searchInfo.name,
      street: this.searchInfo.street,
      isDefault: false,
      serviceType: 1,
      longitude: this.searchInfo.location.lng,
      latitude: this.searchInfo.location.lat,
      remark: '',
      mobile: this.searchInfo.mobile,
      name: this.searchInfo.userName,
      addressName: this.searchInfo.address,
      cityCode: this.searchInfo.cityCode,
    };

    // 保存联系人和地址
    ghbRequest({
      url: API.CREATE,
      method: 'POST',
      data: PARAMRS_CERATE_REQUEST
    }).then((res: any) => {
      if (res.statusCode !== 200) {
        showToastError(res.data.message);
      } else {
        // console.log('保存成功');
      }
    });

    goBackSetData({
      searchInfo: this.searchInfo
    }, 3);
    wx.navigateBack({
      delta: 2
    });
  }

}

export default Index;
