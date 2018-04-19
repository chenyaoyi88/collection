<template>
  <div>
    <div class="title-box">
      <div class="title">标题1</div>
      <div class="title">标题2</div>
      <div class="title">标题3</div>
      <div class="title-slider" :style="{width: titleSlider.width + '%;',left: titleSlider.left + '%;'}"></div>
    </div>
    <swiper class="content-box">

      <swiper-item>
        <scroll-view class="content" scroll-y @scrolltolower="v1bottom" @scrolltoupper="v1Top">
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
        </scroll-view>
      </swiper-item>

      <swiper-item>
        <scroll-view class="content" scroll-y>
          <div>456</div>
        </scroll-view>
      </swiper-item>

      <swiper-item>
        <scroll-view class="content" scroll-y>
          <div>789</div>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.title-box {
  width: 100%;
  height: 47px;
  background-color: #fff;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  .title {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .title-slider {
    position: absolute;
    bottom: 0;
    transition: left 0.5s;
    z-index: 2;
    height: 2px;
    background-color: red;
  }
}
.content-box {
  width: 100%;
  height: calc(100vh - 47px);
  background-color: #ccc;
  .content {
    height: 100%;
  }
}
</style>
