<template>
  <div class="login-box">

    <div class="login-input-box">
      <div class="input-group">
        <input @input="getValue($event.target.value, 'phone')" placeholder-class="phcolor" type="text" placeholder="请输入手机号码">
      </div>

      <div class="input-group input-group-split">
        <div class="input-box input-group-l">
          <input @input="getValue($event.target.value, 'imgCode')" type="tel" maxlength="6" placeholder-class="phcolor" placeholder="请输入图形验证码">
        </div>
        <div class="msg-box input-group-r">
          <img src="../../../static/images/code.png" alt="">
        </div>
      </div>

      <div class="input-group input-group-split">
        <div class="input-box input-group-l">
          <input @input="getValue($event.target.value, 'msgCode')" type="tel" maxlength="6" placeholder-class="phcolor" placeholder="请输入短信验证码">
        </div>
        <div class="msg-box input-group-r">
          <btnVcode v-on:getMsgCode="getMsgCode" :vcodeClass="'input-group-vcode ghb-btn'"></btnVcode>
        </div>
      </div>
    </div>

    <div class="login-tips-box">
      <p>啊啊啊啊<span class="color-notice">撒打算打</span></p>
    </div>

    <div class="login-btn-box">
      <button class="ghb-btn login-btn" @click="login" disabled>登录广货宝</button>
    </div>

  </div>
</template>

<script>
import btnVcode from '@/components/btn-vcode';

export default {
  data() {
    return {
      msg: '',
      phone: '',
      imgCode: '',
      msgCode: ''
    };
  },

  components: {
    btnVcode
  },

  methods: {
    getValue(value, type) {
      this[type] = value;
    },
    // 获取图形验证码
    getImgCode() {
      console.log('请求获取图形验证码');
    },
    // 获取短信验证码 + 短信验证码按钮倒计时
    getMsgCode(oMsgCode) {
      if (!/\S/.test(this.msgCode)) {
        wx.showToast({
          title: '您输入的短信验证码格式有误',
          icon: 'none'
        });
        return;
      }

      wx.showLoading({
        title: '加载中'
      });

      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '短信已发送'
        });
        oMsgCode.run();
      }, 1000);
    },
    // 登录
    login() {
      if (!(this.phone)) {
        wx.showToast({
          title: '手机号码不能为空',
          icon: 'none'
        });
        return;
      }
      wx.showLoading({
        title: '加载中'
      });
      setTimeout(() => {}, 1000);
    },
    // 请求数据
    created() {
      this.getImgCode();
    }
  }
};
</script>

<style lang="scss">
@import './index.scss';
</style>
