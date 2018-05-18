
import { goBackSetData, ghbRequest, zerofillBack, showToastError } from '../../utils/index';
import API from '../../api/api';

Page({
  data: {
    img: {
      text_forbid_red: '../../assets/icons/text_forbid_red.png',
      text_forbid_yellow: '../../assets/icons/text_forbid_yellow.png',
      text_load: '../../assets/icons/text_load.png',
      text_night: '../../assets/icons/text_night.png',
      text_size: '../../assets/icons/text_size.png',
      arrow: '../../assets/icons/arrow.png',
      cartype_default: '../../assets/images/cartype_default.png',
    },
    carTypeList: [],
    isCartypeNone: false
  },
  // 展示数据处理
  getForbiddenStatus(result) {
    let status = {
      text: '',
      class: ''
    };
    switch (result.status) {
      case 0:
        status.text = result.diffMinute + '分钟后本车禁行';
        status.class = 'yellow';
        break;
      case 10:
        status.text = '禁行中';
        status.class = 'red';
        break;
      case 20:
        status.text = '无禁行';
        status.class = 'green';
        break;
      default:
        status.text = '无禁行';
        status.class = 'green';
    }
    return status;
  },

  // 选择车型
  cartypeSelect(e) {
    // console.log(e.currentTarget.dataset.item);
    goBackSetData({ carInfo: e.currentTarget.dataset.item }, 2);
    wx.navigateBack();
  },

  // 获取车型列表
  getCartypeList() {
    wx.showLoading({
      title: '加载中'
    });

    // 获取车型列表
    ghbRequest({
      url: API.CARTYPE
    }).then(res => {
      if (res.statusCode === 200) {
        // res.data = [];
        let carTypeList = [];
        let isCartypeNone = false;

        if (res.data.length) {

          for (let item of res.data) {
            item.startPrice = (item.startPrice && zerofillBack(item.startPrice)) || '--';
            item.startRange = (item.startPrice && zerofillBack(item.startRange)) || '--';
            item.nightServiceFee = (item.nightServiceFee && zerofillBack(item.nightServiceFee)) || '--';
            if (item.carTemplate) {
              if (item.carTemplate.carForbiddenTimeResult) {
                const result = item.carTemplate.carForbiddenTimeResult;
                item.forbiddenStatusCode = item.carTemplate.carForbiddenTimeResult.status;
                item.forbiddenStatusText = this.getForbiddenStatus(result).text;
                item.forbiddenStatusClass = this.getForbiddenStatus(result).class;
              } else {
                // 没有 carForbiddenTimeResult 字段的值时的默认状态
                item.forbiddenStatusCode = 20;
                item.forbiddenStatusText = '无禁行';
                item.forbiddenStatusClass = 'green';
              }
            }
          }

          carTypeList = res.data;

        } else {
          // 暂无数据
          isCartypeNone = true;
        }

        this.setData({
          carTypeList,
          isCartypeNone
        });

      } else {
        showToastError(res.data.message);
      }
    });
  },

  onLoad() {
    this.getCartypeList();
  }
})
