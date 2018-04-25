import { Vue, Component, Provide } from 'vue-property-decorator';

import { getDateList, getHoursArray, getMinsArray, uuid } from '../../utils';
import item from '@/components/item/item.vue';
import sliderSelect from '@/components/slider/slider_select.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item,
    sliderSelect
  }
})
class Index extends Vue {
  bookingTime: string = '';
  dateArray: any = getDateList();
  dateIndex: any = [0, 0, 0];

  dataList: any = [{ "id": 8, "name": "推车", "remark": "需要司机提供推车设备" }, { "id": 9, "name": "搬运", "remark": "需要司机提供搬运服务，价格面议" }, { "id": 10, "name": "代收", "remark": "需要司机提供代收货款的服务，价格方式面议" }];

  // logisticsorder: any = {
  //   name: 'cyy',
  //   age: 18,
  //   time: new Date().getTime()
  // };

  get logisticsorder() {
    console.log(this.$store.state.logisticsorder);
    return this.$store.state.logisticsorder;
  }

  test() {
    const json = {
      name: 'cyy1',
      age: 19,
      time: new Date().getTime()
    };
    this.$store.commit('logisticsorderChange', {
      logisticsorder: json
    });
  }

  test2() {
    const json = {
      sex: 'male'
    };
    this.$store.commit('logisticsorderChange', {
      logisticsorder: json
    });
  }

  test3() {
    const json = {
      name: 'cyy100',
      age: 21,
      fuck: 'fuckme'
    };
    this.$store.commit('logisticsorderChange', {
      logisticsorder: json
    });
  }

  // 取消原因列表
  cancelReasonList: Array<any> = [
    {
      "id": 1,
      "reason": "下错订单"
    },
    {
      "id": 3,
      "reason": "6666666666"
    },
    {
      "id": 4,
      "reason": "价格太高"
    },
    {
      "id": 5,
      "reason": "车到现场发现装不下"
    },
    {
      "id": 6,
      "reason": "等太久了都没车"
    }
  ];

  // 控制额外服务的 slider 显示隐藏
  selectSlider: boolean = false;
  aList: Array<any> = [];
  sList: string = '';

  // 底部滑动隐藏
  fnHideSlider(isSliderShow: boolean) {
    this.selectSlider = isSliderShow;
  }

  // 获取选择的额外服务列表和显示的值
  fnCheckboxChange(list: any, str: string) {
    this.aList = list;
    this.sList = str;
  }

  // 点击确定取消订单
  fnRadioComfirm(item: any) {
    console.log(item);
  }

  reset() {
    this.bookingTime = '';
    this.dateArray = getDateList();
    this.dateIndex = [0, 0, 0];
    this.$emit('reset', this.bookingTime);
  }

  // 时间选择器选中逻辑（TODO：抽离出来作为独立组件逻辑）
  dateChange(e: any) {
    const myIndex = e.target.value;

    const index0 = myIndex[0];
    const index1 = myIndex[1];
    const index2 = myIndex[2];

    const sDate = this.dateArray[0][index0].value;
    const sHour = this.dateArray[1][index1].value;
    const sMin = this.dateArray[2] && this.dateArray[2][index2] && this.dateArray[2][index2].value;

    if (sHour) {
      this.bookingTime = `${sDate} ${sHour}:${sMin}:00`;
    } else {
      this.bookingTime = '';
    }

    // this.$emit('getDateValue', this.bookingTime);
  }

  // 时间选择器内部逻辑（TODO：抽离出来作为独立组件逻辑）
  aateColumnchange(e: any) {
    // console.log('修改的列为', e.target.column, '，值为', e.target.value);

    this.$set(this.dateIndex, e.target.column, e.target.value);

    switch (e.target.column) {
      case 0:
        switch (this.dateIndex[0]) {
          case 0:
            this.$set(this.dateArray, 1, getHoursArray(new Date().getHours()));
            this.$set(this.dateArray, 2, []);
            break;
          case 1:
          case 2:
            this.$set(this.dateArray, 1, getHoursArray());
            this.$set(this.dateArray, 2, getMinsArray());
            break;
          default:
        }
        this.$set(this.dateIndex, 1, 0);
        this.$set(this.dateIndex, 2, 0);
        break;
      case 1:
        switch (this.dateIndex[0]) {
          case 0:
            this.$set(this.dateArray, 2, this.dateIndex[1] === 0 ? [] : getMinsArray());
            break;
          default:
        }
        this.dateIndex[2] = 0;
        break;

      default:
    }
  }

  getUUID() {
    console.log(uuid());
  }

  // 全局
  mounted() {
    // this.selectSlider = true;
    // this.$store.commit('tabIndexChange', {
    //   tabIndex: 2
    // });
  }

  // computed
  get tabIndex() {
    return this.$store.state.tabIndex;
  }

  onLoad() {
    // const pages = getCurrentPages(); // eslint-disable-line
    // const currPage = pages[pages.length - 1];
    // console.log(currPage);
  }
}

export default Index;
