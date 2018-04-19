import { Vue, Component } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest, getOrderStatusText } from '../../../utils';
import API from '../../../api';
import IMG_NOORDER from '../../../../static/images/callcar.png';
import IMG_NODATA from '../../../../static/images/nodata.png';
import nodata from '@/components/other/nodata.vue';

// NOTE：/api/v1/logistics/logisticsorders 接口缺少【车型】 和 【额外服务】字段

@Component({
  components: {
    item,
    nodata
  }
})
class Order extends Vue {
  imgNoOrder: any = IMG_NOORDER;
  imgNodata: any = IMG_NODATA;

  isLogin: boolean = false;
  tabList: Array<string> = ['进行中', '已完成', '已取消'];

  titleSlider = {
    width: 100 / this.tabList.length,
    left: 0
  };

  currentIndex: number = 0;
  pageLimit: number = 10;

  ingList: Array<any> = [];
  finishList: Array<any> = [];
  cancelList: Array<any> = [];

  ingListTmp: Array<any> = [];
  ingListOffet: number = 10;

  finishListTmp: Array<any> = [];
  finishListOffet: number = 10;

  cancelListTmp: Array<any> = [];
  cancelListOffet: number = 10;

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
    // this.currentIndex = 0;
  }

  getList(listType: string, searchType: number, offset: number = 10, limit: number = 10) {
    wx.showLoading({
      title: '加载中'
    });
    const oTab = this;
    ghbRequest({
      url: API.LOGISTICSORDERS,
      data: {
        searchType,
        offset,
        limit
      }
    }).then((res: any) => {
      console.log(res);
      wx.hideLoading();
      if (res.statusCode === 200) {
        oTab[listType + 'Tmp'] = res.data;
        if (res.data && res.data.length) {
          for (let item of res.data) {
            item.statusText = getOrderStatusText(item.status);
            oTab[listType].push(item);
          }
        }
      }
    });
  }

  v1bottom() {
    this.updateList('ingList', 2);
  }

  v2bottom() {
    this.updateList('finishList', 3);
  }

  v3bottom() {
    this.updateList('cancelList', 4);
  }

  updateList(name: string, type: number) {
    if (this[name + 'Tmp'].length < this.pageLimit) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      });
      return;
    };
    this.getList(name, type, this[name + 'Offet'] += 10);
  }

  tabClick(index: number) {
    this.currentIndex = index;
  }

  tabChange(e: any) {
    this.currentIndex = e.target.current;
    this.titleSlider.left = this.titleSlider.width * this.currentIndex;
    switch (this.currentIndex) {
      case 0:
        this.getList('ingList', 2, this.ingListOffet);
        break;
      case 1:
        this.getList('finishList', 3, this.finishListOffet);
        break;
      case 2:
        this.getList('cancelList', 4, this.cancelListOffet);
        break;
      default:
    }
  }

  gotoLogin() {
    wx.navigateTo({
      url: '../../login/main'
    });
  }
}

export default Order;
