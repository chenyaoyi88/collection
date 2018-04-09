<template>
  <div class="contact-box">
    <div class="contact-info-box">
      <p class="contact-info-title">{{ sitePoint.name }}</p>
      <p class="contact-info-content">{{ sitePoint.address }}</p>
    </div>
    <div class="contact-item-box">
      <item 
        itemType="input"
        inputPlc="联系人"
        iconType="extra" 
        noBorderTop="true"
        v-on:itemInput="getValue($event.target.value, 'name')"
      ></item>
      <item 
        itemType="input"
        inputType="tel"
        inputPlc="联系方式"
        iconType="extra" 
        v-on:itemInput="getValue($event.target.value, 'mobile')"
      ></item>
    </div>
    <div class="contact-btn-box">
      <button class="ghb-btn" @click="confirmGoback">确认</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

