<template>
    <div class="picker-time">
        <item 
        iconType="time" 
        textCenter="时间" 
        :value="bookingTime || '立即叫车'"
        ></item>
        <picker class="picker" mode="multiSelector" @change="dateChange" @columnchange="aateColumnchange" :value="dateIndex" range-key="name" :range="dateArray">
            <view class="picker-cover"></view>
        </picker>
    </div>
</template>

<script>
import { getDateList, getHoursArray, getMinsArray } from '../../utils/index.ts';
import item from './item';

export default {
  components: {
    item
  },
  props: [],
  data() {
    return {
      bookingTime: '',
      dateArray: getDateList(),
      dateIndex: [0, 0, 0]
    };
  },
  methods: {
    // 时间选择器选中逻辑（TODO：抽离出来作为独立组件逻辑）
    dateChange(e) {
      const myIndex = e.target.value;

      const index0 = myIndex[0];
      const index1 = myIndex[1];
      const index2 = myIndex[2];

      const sDate = this.dateArray[0][index0].value;
      const sHour = this.dateArray[1][index1].value;
      const sMin =
        this.dateArray[2] &&
        this.dateArray[2][index2] &&
        this.dateArray[2][index2].value;

      if (sHour) {
        this.bookingTime = `${sDate} ${sHour}:${sMin}:00`;
      } else {
        this.bookingTime = '';
      }

      this.$emit('getDateValue', this.bookingTime);
    },

    // 时间选择器内部逻辑（TODO：抽离出来作为独立组件逻辑）
    aateColumnchange(e) {
      // console.log('修改的列为', e.target.column, '，值为', e.target.value);

      this.$set(this.dateIndex, e.target.column, e.target.value);

      switch (e.target.column) {
        case 0:
          switch (this.dateIndex[0]) {
            case 0:
              this.$set(
                this.dateArray,
                1,
                getHoursArray(new Date().getHours())
              );
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
              this.$set(
                this.dateArray,
                2,
                this.dateIndex[1] === 0 ? [] : getMinsArray()
              );
              break;
            default:
          }
          this.dateIndex[2] = 0;
          break;

        default:
      }
    }
  }
};
</script>

<style lang="scss">
.picker-time {
  position: relative;
  z-index: 1;
  .picker {
    .picker-cover {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      background-color: #fff;
      opacity: 0;
    }
  }
}
</style>