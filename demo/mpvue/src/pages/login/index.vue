<template>
  <div class="ghb-container">
    <div class="login-input-box">
      <div class="input-group">
        <input @input="getValue($event.target.value, 'phone')" placeholder-class="phcolor" type="number" placeholder="请输入手机号码" maxlength="11">
      </div>

      <div class="input-group input-group-split">
        <div class="input-box input-group-l">
          <input @input="getValue($event.target.value, 'msgCode')" type="number" maxlength="6" placeholder-class="phcolor" placeholder="请输入短信验证码" :value="msgCode">
        </div>
        <div class="msg-box input-group-r">
          <btnVcode v-on:getMsgCode="getMsgCode" :vcodeClass="'input-group-vcode'" :btnName="'发送验证码'"></btnVcode>
        </div>
      </div>
    </div>

    <div class="login-btn-box">
      <button class="ghb-btn login-btn" @click="login">登录</button>
    </div>
    
    <div class="login-tips-box">
      <p>登录广货宝，即表示您同意<span class="color-notice" @click="ghbRuleCallcar">《广货宝叫车规则》</span>和<span class="color-notice" @click="ghbRuleService">《广货宝使用条款和服务协议》</span></p>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
