<template>
  <div class="ghb-order-box">
    <div v-if="!isLogin" class="login-box">
      <div class="login-page-box">
        <button class="login-page-btn" @click="gotoLogin">请登录</button>
      </div>
    </div>
    <div v-if="isLogin">
      <div class="tabswitch-box">
        <div class="tabswitch-title-box" v-if="tabList.length" :style="{height: headerHeight + 'px'}">
          <ul class="title-list">
            <li v-for="(item, index) in tabList" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item }}</li>
          </ul>
        </div>
        <div class="tabswitch-content-box" :style="{height: contentHeight + 'px'}">
          <swiper 
            class="tabswitch-content" @change="tabChange" :current="currentIndex"
            duration="200"
          >
            <swiper-item class="tab1-swiper-item">
              <div class="tab1">
                <p>啊实打实的</p>
                <button @click="sayFuck">改变tab3</button>
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
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
