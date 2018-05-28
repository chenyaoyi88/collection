import {
  goBackSetData,
  ghbRequest,
  zerofillBack,
  showToastError
} from '../../utils/index';
import {
  eventBusEmit,
  eventBusRemove,
  eventBusOn,
  ghbEvent
} from '../../utils/event';

Page({
  data: {
    goodsRemark: ''
  },
  onLoad(options) {
    console.log(options);
    this.setData({
      goodsRemark: options.goodsRemark
    });
  },

  getGoodsRemark(e) {
    this.setData({
      goodsRemark: e.detail.value
    });
  },
  submit() {
    if (!/\S/.test(this.data.goodsRemark)) {
      showToastError('货物信息、备注不能为空');
      return;
    }
    eventBusEmit(ghbEvent.getGoodsRemark, {
      goodsRemark: this.data.goodsRemark
    });
    wx.navigateBack();
  }
})