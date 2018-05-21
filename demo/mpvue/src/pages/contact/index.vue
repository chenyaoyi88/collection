<template>
  <div class="contact-box">
    <div class="contact-info-box">

      <div class="item">
        <div class="item-l">
          <div class="item-point" :class="pointType"></div>
        </div>
        <div class="item-r no-boder-top">
          <div class="item-r-title">
            <p v-if="searchInfo.siteName" class="item-info-c">{{ searchInfo.siteName }}</p>
            <p v-if="searchInfo.address" class="item-info-b">{{ searchInfo.address }}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="contact-stree">
      <div class="item">
        <div class="item-l">
          <img class="item-icon" :src="icon.street" mode="aspectFit">
        </div>
        <div class="item-r no-boder-top">
          <textarea 
            auto-height
            class="item-textarea"
            maxlength="140"
            placeholder="地址附加说明，如楼层、门牌、档口等" 
            placeholder-style="color:#b2b2b2" 
            :value="street" 
            @input="getValue($event.target.value, 'street')" 
          ></textarea>
        </div>
      </div>
    </div>

    <div class="contact-item-box">
      
      <div class="item">
        <div class="item-l">
          <img class="item-icon" :src="icon.contact" mode="aspectFit">
        </div>
        <div class="item-r">
          <input 
            class="item-input" 
            type="text" 
            maxlength="10"
            placeholder="联系人姓名" 
            placeholder-style="color:#b2b2b2" 
            :value="name" 
            @input="getValue($event.target.value, 'name')" 
          >
        </div>
      </div>
      <div class="item">
        <div class="item-l">
          <img class="item-icon" :src="icon.mobile" mode="aspectFit">
        </div>
        <div class="item-r">
          <input 
            class="item-input" 
            type="number" 
            maxlength="11"
            placeholder="联系方式" 
            placeholder-style="color:#b2b2b2" 
            :value="mobile" 
            @input="getValue($event.target.value, 'mobile')" 
          >
        </div>
      </div>

    </div>
    <div class="contact-btn-box">
      <button class="ghb-btn contact-btn" :disabled="isBtnClick" @click="confirmGoback">{{btnName || '确认'}}</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

