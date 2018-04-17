<template>
  <div class="ghb-me-box">
    <div>
      <div class="me-hd-box">
        <div class="me-avantar">
          <div class="avantar-box" @click="gotoLogin">
            <img :src="avantar" alt="">
            <p>{{ mobile || '--' }}</p>
          </div>
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
        <div class="logout-btn-box" v-if="isLogin">
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
