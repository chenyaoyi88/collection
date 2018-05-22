<template>
  <div>

    <template v-if="from === 'me'">
      <div class="title-box">
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item.name + '(' + (item.count || '0') + ')' }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',transform: 'translate3d(' + titleSlider.left + '%,0,0)'}">
          <div class="slider"></div>
        </div>
      </div>

      <div class="tab-box">

        <div class="tab" :class="{active: currentIndex === 0}">
          <div class="coupon-list-box">

            <block v-if="canUse.listNone">
              <div class="coupon-list-none fixed">-- 暂无可使用优惠券 --</div>
            </block>

            <block v-if="canUse.list.length" v-for="(item, index) of canUse.list" :key="index">
              <block v-for="(list, listIndex) of item" :key="listIndex">
                <coupon :isFail="false" :couponInfo="list"></coupon>
              </block>
            </block>

            <div class="list-nomore" v-show="canUse.listnomore">-- 没有更多数据了 --</div>
          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 1}">
          <div class="coupon-list-box">

            <block v-if="expire.listNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="expire.list.length" v-for="(item, index) of expire.list" :key="index">
              <block v-for="(list, listIndex) of item" :key="listIndex">
                <coupon :isFail="true" :couponInfo="list"></coupon>
              </block>
            </block>

            <div class="list-nomore" v-show="expire.listnomore">-- 没有更多数据了 --</div>

          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 2}">
          <div class="coupon-list-box">

            <block v-if="used.listNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="used.list.length" v-for="(item, index) of used.list" :key="index">
              <block v-for="(list, listIndex) of item" :key="listIndex">
                <coupon :isFail="true" :couponInfo="list"></coupon>
              </block>
            </block>
            
            <div class="list-nomore" v-show="used.listnomore">-- 没有更多数据了 --</div>

          </div>
        </div>

      </div>
    </template>

    <template v-if="from === 'index'">

        <block v-if="LogisticsCouponsNone">
          <div class="coupon-list-none fixed">-- 暂无可使用优惠券 --</div>
        </block>

        <div v-else>
          <div v-if="LogisticsCoupons.length" class="coupon-not-use" @click="couponSelectFormIndex(null)">
            <div>不使用优惠券</div>
            <div v-if="!isNotUseCoupon" class="unselect-circle"></div>
            <img v-else class="select-circle" :src="IMG_SELECT" alt="" mode="aspectFit">
          </div>
          <div class="coupon-list-box">
            <block v-if="LogisticsCoupons.length" v-for="(item, index) of LogisticsCoupons" :key="index">
              <coupon :isFail="false" :isShowSlect="true" :couponInfo="item" @couponClick="couponSelectFormIndex(item)"></coupon>
            </block>
            <div class="list-nomore" v-show="LogisticsCouponsNomore">-- 没有更多数据了 --</div>
          </div>
        </div>

    </template>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

