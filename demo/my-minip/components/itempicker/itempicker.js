import {
  getMinsArray,
  getHoursArray,
  getDateList
} from '../../utils/index'

Component({
  externalClasses: ['item-picker-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  properties: {
    // item 类型（input/point/custom)
    itemType: {
      type: String,
      value: 'normal'
    }
  },
  data: {
    bookingTime: '',
    dateArray: getDateList(),
    dateIndex: [0, 0, 0]
  },
  methods: {
    reset() {
      const bookingTime = '';
      const dateArray = getDateList();
      const dateIndex = [0, 0, 0];
      this.setData({
        bookingTime,
        dateArray,
        dateIndex
      });

      this.setData({
        bookingTime
      }, () => {
        this.triggerEvent('getDateValue', { bookingTime }, {});
      });
    },

    dateChange(e) {
      const myIndex = e.detail.value;

      const index0 = myIndex[0];
      const index1 = myIndex[1];
      const index2 = myIndex[2];

      const sDate = this.data.dateArray[0][index0].value;
      const sHour = this.data.dateArray[1][index1].value;
      const sMin =
        this.data.dateArray[2] &&
        this.data.dateArray[2][index2] &&
        this.data.dateArray[2][index2].value;

      let bookingTime = '';

      if (sHour) {
        bookingTime = `${sDate} ${sHour}:${sMin}:00`;
      } else {
        bookingTime = '';
      }

      this.setData({
        bookingTime
      }, () => {
        this.triggerEvent('getDateValue', { bookingTime }, {});
      });
    },

    // 时间选择器内部逻辑（TODO：抽离出来作为独立组件逻辑）
    dateColumnchange(e) {

      const data = {
        dateArray: this.data.dateArray,
        dateIndex: this.data.dateIndex
      };

      data.dateIndex[e.detail.column] = e.detail.value;

      switch (e.detail.column) {
        case 0:
          switch (data.dateIndex[0]) {
            case 0:
              data.dateArray[1] = getHoursArray(new Date().getHours());
              data.dateArray[2] = [];
              break;
            case 1:
            case 2:
              data.dateArray[1] = getHoursArray();
              data.dateArray[2] = getMinsArray();
              break;
            default:
          }
          data.dateIndex[1] = 0;
          data.dateIndex[2] = 0;
          break;
        case 1:
          switch (data.dateIndex[0]) {
            case 0:
              data.dateArray[2] = data.dateIndex[1] === 0 ? [] : getMinsArray();
              break;
            default:
          }
          data.dateIndex[2] = 0;
          break;

        default:
      }

      this.setData(data);
    }
  },
  ready() {
    this.triggerEvent('pickerEvent', {
      oPicker: this
    }, {});
  }
})