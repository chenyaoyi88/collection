<template>
  <div class="ghb-me-box">
    <div v-if="!isLogin" class="login-box">
      <div class="login-page-box">
        <button class="login-page-btn" @click="gotoLogin">请登录</button>
      </div>
    </div>
    <div v-if="isLogin">
      <!-- <p>已登录</p> -->
      <div class="me-hd-box">
        <div class="me-avantar">
          <img :src="userInfo.avatarUrl || '../../../../static/images/avantar.png'" alt="">
          <p>{{ mobile || '--' }}</p>
        </div>
      </div>
      <div class="me-main-box">
        <div class="main-list-box">
          <item 
          textCenter="收费标准" 
          noBorderTop="true"
          v-on:itemClick="ghbLogisticFee"
        ></item>
        </div>
        <div class="logout-btn-box">
          <button class="ghb-btn logout-btn" @click="logout">退出登录</button>
        </div>
      </div>
      <p class="version">版本号 V1.0.0</p>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
