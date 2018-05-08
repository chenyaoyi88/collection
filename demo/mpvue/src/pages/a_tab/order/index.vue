<template>
  <div class="ghb-order-box">

    <!-- 未登录 -->
    <noorder 
      :isShow="!isLogin" 
      isShowBtn="true" 
      text="您还未登录噢，速速去登录吧～" 
      v-on:btnEvent="gotoLogin"
    ></noorder>

    <!-- 已登录 -->
    <div v-if="isLogin">

      <div class="title-box">
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item.name }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',transform: 'translate3d(' + titleSlider.left + '%,0,0)'}">
          <div class="slider"></div>
        </div>
      </div>


      <div class="tab-box">

        <orderlist 
          :tabIndex="0"
          :currentIndex="currentIndex"
          :isShowNone="ingListNone"
          :dataList="ingList"
          @orderCancel="orderCancel"
          @orderPay="orderPay"
        ></orderlist>

        <orderlist 
          :tabIndex="1"
          :currentIndex="currentIndex"
          :isShowNone="finishListNone"
          :dataList="finishList"
        ></orderlist>

        <orderlist 
          :tabIndex="2"
          :currentIndex="currentIndex"
          :isShowNone="cancelListNone"
          :dataList="cancelList"
        ></orderlist>
        
      </div>

    </div>

    <sliderSelect 
      type="radio"
      :dataList="cancelReasonList" 
      :isSliderShow="selectSlider"
      title="取消订单原因"
      name="reason"
      value="id"
      @hideSlider="fnHideSlider"
      @radioChange="fnRadioChange"
      @sliderComfirm="fnRadioComfirm"
    ></sliderSelect>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
