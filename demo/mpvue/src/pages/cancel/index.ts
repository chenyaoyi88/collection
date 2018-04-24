import { Vue, Component } from 'vue-property-decorator';
import { ghbRequest } from '../../utils';
import API from '../../api';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  cancelList: any = [
    // { name: 'USA', value: '美国' },
    // { name: 'CHN', value: '中国', checked: 'true' },
    // { name: 'BRA', value: '巴西' },
    // { name: 'JPN', value: '日本' },
    // { name: 'ENG', value: '英国' },
    // { name: 'TUR', value: '法国' },
  ];

  radioChange(e: any) {
    console.log('radio发生change事件，携带value值为：', e.target.value)
  }

  onUnload() {
    wx.showModal({
      title: '页面要关闭啦',
      content: '哈哈哈哈哈'
    });
    return false;
  }

  mounted() {
    const _this = this;
    wx.showLoading({
      title: '加载中'
    });
    ghbRequest({
      url: API.CANCELREASONS,
    }).then((res: any) => {
      // console.log(res);
      if (res.statusCode === 200) {
        _this.cancelList = res.data;
      } else {

      }
    });
  }
}

export default Index;
