<template>
  <div class="login-box" v-show="isShow">
      <div class="login-page-box">
      <img class="login-page-img" :src="imgNodata" alt=""  mode="aspectFit">
      <p class="login-page-tips">{{ text }}</p>
      <button v-if="isShowBtn" class="ghb-btn login-page-btn" @click="btnEvent">登录</button>
      </div>
  </div>
</template>

<script>
import IMG_NODATA from '../../../../static/images/nodata.png';

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isShowBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgNodata: IMG_NODATA
    };
  },
  methods: {
    btnEvent() {
      this.$emit('btnEvent');
    }
  }
};
</script>

<style lang="scss">

.login-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
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
    .login-page-btn {
      width: 70px;
      height: 35px;
      font-size: 14px;
      padding: 0;
    }
  }
}
</style>

