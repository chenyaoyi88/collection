<template>
  <div>

    <template v-if="from === 'me'">
      <div class="title-box">
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item.name }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',transform: 'translate3d(' + titleSlider.left + '%,0,0)'}">
          <div class="slider"></div>
        </div>
      </div>

      <div class="tab-box">

        <div class="tab" :class="{active: currentIndex === 0}">
          <div class="coupon-list-box">
            <block v-if="isUsedList.length" v-for="(item, index) of isUsedList" :key="index">
              <coupon :isFail="false" :couponInfo="item"></coupon>
            </block>
          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 1}">
          <div class="coupon-list-box">
            <block v-if="isExpireList.length" v-for="(item, index) of isExpireList" :key="index">
              <coupon :isFail="true" :couponInfo="item"></coupon>
            </block>
          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 2}">
          <div class="coupon-list-box">
            <block v-if="isUsedList.length" v-for="(item, index) of isUsedList" :key="index">
              <coupon :isFail="true" :couponInfo="item"></coupon>
            </block>
          </div>
        </div>

      </div>
    </template>

    <template v-if="from === 'index'">
      <div>来自首页</div>
    </template>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

