import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue'; // mpvue目前只支持的单文件组件
import { goBackSetData, getDesText } from '../../utils';
import API from '../../api';

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

  onLoad(option: any) {
    this.searchInfo = JSON.parse(option.searchInfo);
    console.log('option', this.searchInfo);
    // 获取地点所在城市

    // 参考：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
    this.getCityCode();
  }

  onReady() {
    wx.setNavigationBarTitle({
      title: `输入${getDesText(this.searchInfo.from)}联系人`
    })
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
        console.log(res);
        if (res.statusCode === 200) {
          if (res.data && res.data.result && res.data.result.cityCode) {
            __this.searchInfo.cityCode = res.data.result.cityCode;
          } else {
            __this.searchInfo.cityCode = '';
          }
        } else {
          wx.showToast({
            title: '获取地址所在城市失败',
            icon: 'none'
          });
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

    if (!(/\S/.test(this.searchInfo.userName)) || !(/\S/.test(this.searchInfo.mobile))) {
      wx.showToast({
        title: '联系人姓名和联系方式不能为空',
        icon: 'none'
      });
      return;
    }

    goBackSetData({
      searchInfo: this.searchInfo
    }, 3);
    wx.navigateBack({
      delta: 2
    });
  }

}

export default Index;
