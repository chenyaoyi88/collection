import { mockCheckboxList, mockRadioList } from './mock';

Page({
  data: {
    isShowSelect: false,
    oSelect: null,
    mockCheckboxList,
    mockRadioList,
    dataList: []
  },
  test() {
    this.data.oSelect.show();
  },
  selectEvent(e) {
    this.setData({
      oSelect: e.detail.oSelect
    });
  },
  checkboxChange(e) {
    const aSelected = e.detail.aSelected;
    const sSelected = e.detail.sSelected;
    // console.log('选中的数组', aSelected);
    // console.log('选中的数组转字符串', sSelected);
  },
  radioChange(e) {
    console.log(e.detail);
  },
  selectComfirm(e) {
    console.log(e.detail);
  },
  onLoad: function () {

    setTimeout(() => {
      this.setData({
        // dataList: mockCheckboxList
        dataList: mockRadioList
      });
    }, 300);

  }
})
