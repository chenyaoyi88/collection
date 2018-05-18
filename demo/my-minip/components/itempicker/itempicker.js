import {
  getMinsArray,
  getHoursArray,
  getDateList
} from '../../utils/index'

Component({
  relations: {
    'item': {
      type: 'child',
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
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
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

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
  }
})