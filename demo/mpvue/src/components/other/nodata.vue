<template>
  <div class="login-box">
    <div class="login-page-box">
      <img class="login-page-img" :src="IMG_NODATA" alt=""  mode="aspectFit">
      <p class="login-page-tips">{{ text }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IMG_NODATA from './img/nodata.png';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      IMG_NODATA
    };
  }
};
</script>

<style lang="scss">
.login-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-page-box {
    width: 100%;
    margin-bottom: 30%;
    .login-page-img {
      width: 100%;
      height: 140px;
    }
    .login-page-tips {
      font-size: 12px;
      text-align: center;
      color: #8f8f8f;
      margin: 8px 0 15px;
    }
  }
}
</style>
