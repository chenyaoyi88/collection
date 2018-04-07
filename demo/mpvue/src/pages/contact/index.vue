<template>
  <div class="contact-box">
    <div class="contact-info-box">
      <p class="contact-info-title">标题</p>
      <p class="contact-info-content">内容内容内容内容</p>
    </div>
    <div class="contact-item-box">
      <item 
        itemType="input"
        inputPlc="联系人"
        iconType="extra" 
        value="" 
        noBorderTop="true"
      ></item>
      <item 
        itemType="input"
        inputPlc="联系方式"
        iconType="extra" 
        value=""
      ></item>
    </div>
    <div class="contact-btn-box">
      <button class="ghb-btn">确认</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

