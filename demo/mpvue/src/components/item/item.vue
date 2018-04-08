<template>
  <div class="item" @click="itemClick">
    <div class="item-l">
        <div v-if="!icon" class="item-point" :class="point"></div>
        <img v-if="icon" class="item-icon" :src="icon">
    </div>
    <template v-if="!itemType">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <div class="item-r-title">
          <p v-if="textTop" class="item-info-t">{{ textTop }}</p>
          <p v-if="textCenter" class="item-info-c">{{ textCenter }}</p>
          <p v-if="textBottom" class="item-info-b">{{ textBottom }}</p>
        </div>
        <div class="item-r-value">
            <p :class="{light: valueColor ? valueColor : false}">{{ value }}</p>
        </div>
        <div class="item-r-arrow">
            <img class="img-item-arrow" :src="arrow">
        </div>
      </div>
    </template>
    <template v-if="itemType === 'input'">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <input type="text" :placeholder="inputPlc" :value="value">
      </div>
    </template>
  </div>
</template>

<script>
import arrow from './icon/arrow.png';
import cartype from './icon/cartype.svg';
import time from './icon/time.svg';
import extra from './icon/extra.svg';

export default {
  props: [
    'itemType',
    'inputPlc',
    'iconType',
    'pointType',
    'textTop',
    'textCenter',
    'textBottom',
    'value',
    'valueColor',
    'noBorderTop'
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
    }
  },

  created() {
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
  .item-l {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .item-icon {
      width: 30px;
      height: 30px;
    }
    .item-point {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.start {
        background-color: #15c145;
      }
      &.end {
        background-color: #f13744;
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
    border-top: 1px solid #ededed;
    line-height: 1.6;
    .item-r-title {
      .item-info-t {
        color: #aaaaaa;
      }
      .item-info-c {
        color: #333333;
      }
      .item-info-b {
        font-size: 12px;
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
  }
}
</style>
