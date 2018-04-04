<template>
  <div class="idx-box">
    <!-- <div class="idx-hd-box">
      
    </div> -->
    <div class="idx-main-box">

      <div class="idx-route-box">
        <div class="idx-route">
          <div class="route-l">
            <div class="route-point start"></div>
          </div>
          <div class="route-r no-boder-top">
            <div class="route-r-text">
              <p class="route-info-t">李先生 13800138000</p>
              <p class="route-info-c">中大交易市场</p>
              <p class="route-info-b">什么什么路133号</p>
            </div>
            <div class="route-r-arrow">
              <img class="img-route-arrow" src="../../../../static/images/route-arrow.png" alt="">
            </div>
          </div>
        </div>

        <div class="idx-route">
          <div class="route-l">
            <div class="route-point end"></div>
          </div>
          <div class="route-r">
            <div class="route-r-text">
              <p class="route-info-t">李先生 13800138000</p>
              <p class="route-info-c">中大交易市场</p>
              <p class="route-info-b">什么什么路133号什么什么路133号什么什么路133号什么什么路133号什么什么路133号</p>
            </div>
            <div class="route-r-arrow">
              <img class="img-route-arrow" src="../../../../static/images/route-arrow.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="idx-cartype-box">

        <div class="item">
          <div class="item-l"></div>
          <div class="item-r">
            <div class="item-r-title"></div>
            <div class="item-r-value"></div>
            <div class="item-r-arrow">
              <img class="img-item-arrow" src="../../../../static/images/route-arrow.png" alt="">
            </div>
          </div>
        </div>
      
      </div>

    </div>

    <div class="idx-ft-box">
      <div class="idx-ft-price">
        <p class="price-text">￥400.00</p>
        <div class="price-text-detail-box">
        </div>
      </div>
      <div class="idx-ft-nextbtn">
        <button @click="nextStep">下一步</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
