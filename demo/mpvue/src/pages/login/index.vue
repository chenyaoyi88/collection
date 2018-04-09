<template>
  <div class="ghb-container">

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
    
    <card :text="'哈哈哈'"></card>

    <div class="login-tips-box">
      <p>啊啊啊啊<span class="color-notice">撒打算打</span></p>
    </div>

    <div class="login-btn-box">
      <button class="ghb-btn login-btn" @click="login">登录广货宝</button>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
