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
        <div class="picker-time">
          <item 
            iconType="time" 
            textCenter="时间" 
            :value="bookingDate || '立即出发'"
          ></item>
          <picker class="picker" mode="multiSelector" @change="fnDateChange" @columnchange="fnDateColumnchange" :value="dateIndex" range-key="name" :range="dateArray">
              <view class="picker-cover"></view>
          </picker>
        </div>
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

        <button @click="test">按钮</button>
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

    <!--隐藏区域  -->
    <div class='maskLayer' v-if="chooseSize" @click='hideModal'></div>
    <div class='choose' v-if="chooseSize" :animation='animationData'>
      <p>这里面是内容</p>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
