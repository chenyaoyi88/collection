<template>
  <div class="idx-box">

    <div class="idx-main-box">
      <div class="idx-site-box">
        <item 
          iconType="point" 
          textTop="" 
          :textCenter="startPoint" 
          textBottom=""  
          v-on:itemClick="getPonit('start')"
          noBorderTop="true"
        ></item>
        <item 
          iconType="point" 
          pointType="end" 
          textTop="" 
          textCenter="选择收货地点" 
          textBottom=""  
          v-on:itemClick="getPonit('end')"
        ></item>
      </div>

      <div class="idx-cartype-box">
        <item 
          iconType="cartype" 
          textCenter="车型" 
          value="小型面包" 
          noBorderTop="true"
          v-on:itemClick="carTypeSelect"
        ></item>
        <item 
          iconType="time" 
          textCenter="时间" 
          value="立即叫车"
        ></item>
        <item 
          iconType="extra" 
          textCenter="额外服务" 
          value="装卸搬运等额外服务" 
          valueColor="light"
        ></item>
        <item 
          itemType="input"
          inputType="text"
          inputPlc="货物信息、备注"
          iconType="cartype" 
        ></item>
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
