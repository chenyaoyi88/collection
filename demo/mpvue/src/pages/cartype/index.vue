<template>
  <div>
    <!-- <button @click="test">测试按钮</button> -->
    <ul class="cartype-list">
      <li class="list-item" v-for="(item, index) of carTypeList" :key="index" @click="cartypeSelect(item)">

        <div class="list-item-title">
          <div class="title-box">
            <div class="title">{{ item.name }}
              <img class="arrow" :src="img.arrow">
            </div>
          </div>
        </div>

        <div class="list-item-main">
          <div class="list-item-l">
            <img :src="item.icon" alt="" mode="aspectFit">
          </div>
          <div class="list-item-r">

            <div class="size-info-box">
              <div class="info-text">
                <div class="size-info size-info-l">
                  <img :src="img.text_size" alt=""  mode="aspectFit">
                  <p>{{ item.volume }}</p>
                </div>
                <div class="size-info size-info-r">
                  <img :src="img.text_load" alt=""  mode="aspectFit">
                  <p>{{ item.load + item.loadUnit }}</p>
                </div>
              </div>
              <p class="info-desc">(起步{{ item.startPrice + '元' + item.startRange + (item.mileageUnit || '--') + ',后续' + (item.price || '--')}}元/公里)</p>
            </div>

            <div class="run-info-box">
              <div class="icon_forbid" :class="item.forbiddenStatusClass">禁</div>
              <span :class="item.forbiddenStatusClass">{{ item.forbiddenStatusText }}</span>
            </div>
            <div class="run-info-box">
              <div class="icon_forbid black">夜</div>
              <span class="color-light">夜间服务：{{ item.nightServiceFee }}元/次</span>
            </div>

          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>
