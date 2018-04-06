<template>
  <div class="idx-box">

    <div class="idx-main-box">
      <div class="idx-site-box">

        <div class="idx-site">
          <div class="site-l">
            <div class="site-point start"></div>
          </div>
          <div class="site-r no-boder-top">
            <div class="site-r-text">
              <p class="site-info-t"></p>
              <p class="site-info-c">选择发货地点</p>
              <p class="site-info-b"></p>
            </div>
            <div class="site-r-arrow">
              <img class="img-site-arrow" src="../../../../static/images/site-arrow.png" alt="">
            </div>
          </div>
        </div>

        <div class="idx-site">
          <div class="site-l">
            <div class="site-point end"></div>
          </div>
          <div class="site-r">
            <div class="site-r-text">
              <p class="site-info-t"></p>
              <p class="site-info-c">选择收货地点</p>
              <p class="site-info-b"></p>
            </div>
            <div class="site-r-arrow">
              <img class="img-site-arrow" src="../../../../static/images/site-arrow.png" alt="">
            </div>
          </div>
        </div>
        
      </div>


      <div class="idx-cartype-box">

        <Item :iconName="'cartype'" :title="'车型'" :value="'小型面包'"></Item>
        <Item :iconName="'time'" :title="'时间'" :value="'立即叫车'"></Item>
        <Item :iconName="'extra'" :title="'额外服务'" :value="'装卸搬运等额外服务'" :valueColor="'light'"></Item>
      
      </div>

    </div>

    <div class="idx-ft-box">
      <div class="idx-ft-price">
        <p class="price-text">￥400.00</p>
      </div>
      <div class="idx-ft-nextbtn">
        <button class="ghb-btn next-btn" @click="nextStep">下一步</button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
