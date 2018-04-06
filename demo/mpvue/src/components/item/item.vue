<template>
  <div class="item">
    <div class="item-l">
        <img class="item-icon" :src="icon">
    </div>
    <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
      <div class="item-r-title">
          <span class="title">{{ title }}</span>
      </div>
      <div class="item-r-value">
          <span :class="{light: valueColor ? valueColor : false}">{{ value }}</span>
      </div>
      <div class="item-r-arrow">
          <img class="img-item-arrow" :src="arrow">
      </div>
    </div>
  </div>
</template>

<script>
import arrow from './icon/arrow.png';
import cartype from './icon/cartype.svg';
import time from './icon/time.svg';
import extra from './icon/extra.svg';

export default {
  props: ['iconName', 'title', 'value', 'valueColor'],
  data() {
    return {
      arrow,
      cartype,
      time,
      extra,
      icon: ''
    };
  },

  created() {
    switch (this.iconName) {
      case 'cartype':
        this.icon = cartype;
        break;
      case 'time':
        this.icon = time;
        break;
      case 'extra':
        this.icon = extra;
        break;
      default:
        this.icon = cartype;
    }
    console.log('item', 'created');
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
    .item-r-title {
      color: #333333;
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
