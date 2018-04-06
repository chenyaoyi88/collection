<template>
  <div class="idx-site">
    <div class="site-l">
      <div class="site-point" :class="iconType"></div>
    </div>
    <div class="site-r no-boder-top">
      <div class="site-r-text">
        <p class="site-info-t">{{ topText }}</p>
        <p class="site-info-c">{{ centerText }}</p>
        <p class="site-info-b">{{ buttonText }}</p>
      </div>
      <div class="site-r-arrow">
        <img class="img-site-arrow" :src="arrow" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import arrow from './icon/arrow.png';

export default {
  props: {
    iconType: {
      type: String,
      default: 'start'
    },
    topText: {
      type: String,
      default: ''
    },
    centerText: {
      type: String,
      default: '选择发货地点'
    },
    buttonText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      arrow
    };
  }
};
</script>

<style lang="scss">
.idx-site {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .site-l {
    width: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 18px;
    .site-point {
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
  .site-r {
    flex: 1;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 2;
    padding: 12px 15px 12px 0;
    border-top: 1px solid #ededed;
  }
}

.site-r-text {
  flex: 1;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.6;
  .site-info-t {
    color: #aaaaaa;
  }
  .site-info-c {
    color: #333333;
  }
  .site-info-b {
    font-size: 12px;
  }
}

.site-r-arrow {
  position: absolute;
  right: 15px;
  top: 0px;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .img-site-arrow {
    width: 8px;
    height: 13px;
  }
}
</style>
