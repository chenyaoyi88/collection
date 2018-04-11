<template>
  <div class="item" @click="itemClick">
    <block v-if="iconType">
      <div class="item-l">
        <block v-if="!icon && (point === 'start' || point ==='end')">
          <div v-if="!icon" class="item-point" :class="point"></div>
          <div v-if="point === 'start' && !isStartPointlineHide" class="line s"></div>
          <div v-if="point === 'end' && !isEndPointlineHide" class="line e"></div>
        </block>
        <block v-if="icon">
          <img v-if="icon" class="item-icon" :src="icon" mode="aspectFit">
        </block>
      </div>
    </block>
    <block v-if="!iconType">
      <div class="item-l-none"></div>
    </block>
    <block v-if="!itemType">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <div class="item-r-title">
          <p v-if="textTop" class="item-info-t">{{ textTop }}</p>
          <p v-if="textCenter" class="item-info-c">{{ textCenter }}</p>
          <p v-if="textBottom" class="item-info-b">{{ textBottom }}</p>
        </div>
        <div class="item-r-value">
            <p :class="{light: valueColor ? valueColor : false}">{{ value }}</p>
        </div>
        <div v-if="!isArrowHide" class="item-r-arrow">
            <img class="img-item-arrow" :src="arrow">
        </div>
      </div>
    </block>
    <block v-if="itemType === 'input'">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <input class="item-input" :type="inputType || 'text'" :placeholder="inputPlc" placeholder-style="color:#b2b2b2" :value="value" @input="itemInput($event)" :maxlength="maxlength || 140">
      </div>
    </block>
  </div>
</template>

<script>
import arrow from './icon/arrow.png';
import cartype from './icon/cartype.png';
import time from './icon/time.png';
import extra from './icon/extra.png';
import mobile from './icon/mobile.png';
import contact from './icon/contact.png';

export default {
  props: [
    // item 类型
    'itemType',
    // input 的 placeholder
    'inputPlc',
    // input 的类型
    'inputType',
    // input 的最大输入位数
    'maxlength',
    // item 的 icon 类型
    'iconType',
    // icon 是原点的 item 类型
    'pointType',
    // 是否显示开始原点那条线
    'isStartPointlineHide',
    // 是否显示结束原点那条线
    'isEndPointlineHide',
    // item 三行文字的顶部文字
    'textTop',
    // item 三行文字的中间文字
    'textCenter',
    // item 三行文字的底部文字
    'textBottom',
    // input 的值
    'value',
    // item 右侧文字颜色（light 或者 dark）
    'valueColor',
    // 是否显示 item 的顶部边线
    'noBorderTop',
    // 是否隐藏右侧箭头
    'isArrowHide'
  ],
  data() {
    return {
      arrow,
      cartype,
      time,
      extra,
      icon: '',
      point: ''
    };
  },
  methods: {
    itemClick() {
      this.$emit('itemClick', this);
    },
    itemInput(e) {
      this.$emit('itemInput', e);
    }
  },

  created() {
    if (this.iconType) {
      switch (this.iconType) {
        case 'cartype':
          this.icon = cartype;
          break;
        case 'time':
          this.icon = time;
          break;
        case 'extra':
          this.icon = extra;
          break;
        case 'mobile':
          this.icon = mobile;
          break;
        case 'contact':
          this.icon = contact;
          break;
        case 'point':
          this.icon = '';
          switch (this.pointType) {
            case 'start':
              this.point = 'start';
              break;
            case 'end':
              this.point = 'end';
              break;
            default:
              this.point = 'start';
          }
          break;
        default:
          this.icon = '';
      }
    }
  }
};
</script>

<style lang="scss">
.no-boder-top {
  border-top: none !important;
}
.item {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .item-l-none {
    padding-left: 15px;
  }
  .item-l {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 3;
    .item-icon {
      width: 18px;
      height: 18px;
    }
    .item-point {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      position: relative;
      z-index: 5;
      &.start {
        background-color: #15c145;
      }
      &.end {
        background-color: #f13744;
      }
    }
    .line {
      position: absolute;
      left: 50%;
      width: 1px;
      height: 50%;
      z-index: 4;
      background: #eeeeee;
      &.s {
        bottom: 0;
      }
      &.e {
        top: 0;
      }
    }
  }
  .item-r {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 15px 35px 15px 0;
    border-top: 1px solid #eeeeee;
    line-height: 1.6;
    .item-r-title {
      .item-info-t {
        color: #888888;
      }
      .item-info-c {
        color: #333333;
      }
      .item-info-b {
        font-size: 12px;
        color: #888888;
      }
    }
    .item-r-value {
      color: #4a4a4a;
      .light {
        color: #c2c2c2;
      }
    }
    .item-r-arrow {
      position: absolute;
      right: 15px;
      top: 0px;
      z-index: 3;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .img-item-arrow {
        width: 8px;
        height: 13px;
      }
    }
    .item-input {
      width: 100%;
    }
  }
}
</style>
