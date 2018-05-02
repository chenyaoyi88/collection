<template>
  <div>
    <!-- <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="(item, index) in items" :key="item.name">
        <radio :value="item.name" :checked="item.checked"/> {{item.value}}
      </label>
    </radio-group>
    <div>{{tabIndex}}</div> -->
    
    <!-- <picker mode="multiSelector" @change="dateChange" @columnchange="aateColumnchange" :value="dateIndex" range-key="name" :range="dateArray">
      {{ bookingTime || '立即叫车'}}
    </picker>

    <button @click="reset">重置</button> -->
    

    <sliderSelect 
      :dataList="dataList" 
      :isSliderShow="selectSlider"
      name="name"
      value="remark"
      v-on:hideSlider="fnHideSlider"
      v-on:checkboxChange="fnCheckboxChange"
    ></sliderSelect>

    <button @click="getUUID">按钮</button>

    
    <!-- <sliderSelect 
      type="radio"
      :dataList="cancelReasonList" 
      :isSliderShow="selectSlider"
      title="取消订单原因"
      name="reason"
      value="id"
      @hideSlider="fnHideSlider"
      @sliderComfirm="fnRadioComfirm"
    ></sliderSelect> -->

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
  height: 100%;;
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
