<template>
  <div>

    <template v-if="from === 'me'">
      <div class="title-box">
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item.name + '（' + item.count + '）' }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',transform: 'translate3d(' + titleSlider.left + '%,0,0)'}">
          <div class="slider"></div>
        </div>
      </div>

      <div class="tab-box">

        <div class="tab" :class="{active: currentIndex === 0}">
          <div class="coupon-list-box">

            <block v-if="isLogisticsCouponsNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="LogisticsCoupons.length" v-for="(item, index) of LogisticsCoupons" :key="index">
              <coupon :isFail="false" :couponInfo="item"></coupon>
            </block>
          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 1}">
          <div class="coupon-list-box">

            <block v-if="isExpireListNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="expireList.length" v-for="(item, index) of expireList" :key="index">
              <coupon :isFail="true" :couponInfo="item"></coupon>
            </block>
          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 2}">
          <div class="coupon-list-box">

            <block v-if="isUsedListNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="usedList.length" v-for="(item, index) of usedList" :key="index">
              <coupon :isFail="true" :couponInfo="item"></coupon>
            </block>
          </div>
        </div>

      </div>
    </template>

    <template v-if="from === 'index'">
      <div class="coupon-list-box">

        <block v-if="isLogisticsCouponsNone">
          <div class="coupon-list-none fixed">-- 暂无可使用优惠券 --</div>
        </block>

        <block v-if="LogisticsCoupons.length" v-for="(item, index) of LogisticsCoupons" :key="index">
          <coupon :isFail="false" :couponInfo="item" @couponClick="couponSelectFormIndex(item)"></coupon>
        </block>

      </div>
    </template>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

