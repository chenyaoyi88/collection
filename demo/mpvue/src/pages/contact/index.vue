<template>
  <div class="contact-box">
    <div class="contact-info-box">
      <item 
        iconType="point" 
        :pointType="searchInfo.from === 'start' ? 'start' : 'end' "
        :textCenter="searchInfo.name" 
        :textBottom="searchInfo.address"  
        isStartPointlineHide="true"
        isEndPointlineHide="true"
        isArrowHide="true"
        noBorderTop="true"
      ></item>
    </div>
    <div class="contact-item-box">
      <item 
        itemType="input"
        inputPlc="联系人姓名"
        iconType="contact" 
        noBorderTop="true"
        v-on:itemInput="getValue($event.target.value, 'name')"
      ></item>
      <item 
        itemType="input"
        inputType="number"
        inputPlc="联系方式"
        iconType="mobile" 
        v-on:itemInput="getValue($event.target.value, 'mobile')"
      ></item>
    </div>
    <div class="contact-btn-box">
      <button class="ghb-btn contact-btn" @click="confirmGoback">确认</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

