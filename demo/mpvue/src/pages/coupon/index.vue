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
              <coupon :couponInfo="item"></coupon>
            </block>

            <!-- <div class="coupon-item1">
              <img :src="couponbgIMG" mode="aspectFit">
              <div class="coupon-content">
                <div class="coupon-content-l">
                  <div class="coupon-amount">
                    <span class="tag">￥</span>
                    <span class="amount">100</span>
                  </div>
                  <div class="coupon-amount-tips">满10元可用</div>
                </div>
                <div class="coupon-content-r">
                  <div class="coupon-title">恭喜发财</div>
                  <div class="coupon-desc">整车配送、小鸡快跑可用</div>
                  <div class="coupon-date">2017.05.05到期</div>
                </div>
              </div>
            </div> -->

          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 1}">
          已过期
        </div>

        <div class="tab" :class="{active: currentIndex === 2}">
          已使用
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

