<template>
  <div class="contact-box">
    <div class="contact-info-box">
      <item 
        iconType="point" 
        :pointType="searchInfo.from"
        :textCenter="searchInfo.name" 
        :textBottom="searchInfo.address"  
        isStartPointlineHide="true"
        isEndPointlineHide="true"
        isArrowHide="true"
        noBorderTop="true"
      ></item>
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

      <!-- 框架BUG：input 子组件绑定 value 会闪烁，所以暂时没法用 -->
      <!-- <item 
        itemType="input"
        inputPlc="联系人姓名"
        iconType="contact" 
        noBorderTop="true"
        maxlength="10"
        v-on:itemInput="getValue($event.target.value, 'name')"
      ></item> -->
      <!-- <item 
        itemType="input"
        inputType="number"
        inputPlc="联系方式"
        iconType="mobile" 
        maxlength="11"
        v-on:itemInput="getValue($event.target.value, 'mobile')"
      ></item> -->
      
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

