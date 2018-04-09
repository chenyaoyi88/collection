<template>
  <div class="ghb-order-box">
    <div v-if="!isLogin" class="login-box">
      <div class="login-page-box">
        <button class="login-page-btn" @click="gotoLogin">请登录</button>
      </div>
    </div>
    <div v-if="isLogin" class="order-box">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
