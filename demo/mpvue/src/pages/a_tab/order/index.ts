import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest } from '../../../utils';
import API from '../../../api';
import IMG_NOORDER from '../../../../static/images/callcar.png';

// NOTE：/api/v1/logistics/logisticsorders 接口缺少【车型】 和 【额外服务】字段

@Component({
  components: {
    item
  }
})
class Order extends Vue {
  imgNoOrder: any = IMG_NOORDER;
  isLogin: boolean = false;
  tabList: Array<string> = ['进行中', '已完成', '已取消'];
  currentIndex: number = 0;
  contentHeight: number = 0;
  headerHeight: number = 30;

  ingOffset: number = 0;
  pageLimit: number = 10;

  ingList: Array<any> = [];
  finishList: Array<any> = [];
  cancelList: Array<any> = [];

  mounted() {
    const oTab = this;
    wx.getSystemInfo({
      success(res: any) {
        oTab.contentHeight = res.windowHeight - oTab.headerHeight;
      }
    });
  }

  onShow() {
    const token = wx.getStorageSync('token');
    this.isLogin = token ? true : false;
    // this.currentIndex = 0;
    this.getList('finishList', 3);
  }

  getList(listType: string, searchType: number, offset: number = 0, limit: number = 10) {
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
        oTab[listType] = res.data;
      }
    });
  }

  tabClick(index: number) {
    console.log(index);
    this.currentIndex = index;
  }

  tabChange(e: any) {
    this.currentIndex = e.target.current;
  }

  gotoLogin() {
    wx.navigateTo({
      url: '../../login/main'
    });
  }
}

export default Order;
