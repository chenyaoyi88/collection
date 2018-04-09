<template>
  <div class="ghb-order-box">
    <div v-if="!isLogin" class="login-box">
      <div class="login-page-box">
        <button class="login-page-btn" @click="gotoLogin">请登录</button>
      </div>
    </div>
    <div v-if="isLogin" @click="sayFuck">
      <Tab :tabList="tabList" v-on:tabChange="tabChange">
        <swiper-item class="tab1-swiper-item">
          <div class="tab1">
            <p>啊实打实的</p>
            <button>改变tab3</button>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="order-box">
            <p>哇哇哇哇</p>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="order-box">
            <p>丫丫丫啊1</p>
            <p>{{ tabText }}</p>
          </div>
        </swiper-item>
      </Tab>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
