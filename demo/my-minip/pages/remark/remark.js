
import { goBackSetData, ghbRequest, zerofillBack, showToastError } from '../../utils/index';

Page({
  data: {
    goodsRemark: ''
  },
  onLoad(options) {
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
    goBackSetData({
      goodsRemark: this.data.goodsRemark
    }, 2);
    wx.navigateBack();
  }
})
