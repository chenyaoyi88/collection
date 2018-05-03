<template>
  <div class="site-box">

    <div class="site-search-box">
      <div class="search-box">

        <div class="search-input-box">
          <div class="search-icon-box">
            <icon class="search-icon" size="12" type="search"></icon>
          </div>
          <input class="search-input" focus="true" type="text" :placeholder="'请输入' + desText" @input="search($event.target.value)" :value="inputValue">
          <div class="clear-icon-box" @click="clear">
            <icon class="clear-icon" size="15" type="clear"></icon>
          </div>
        </div>

        <div class="search-cancel">
          <p @click="goBack">取消</p>
        </div>
      </div>
    </div>

    <div class="site-current-pos" v-if="from === 'start'" @click="selected(oCurrentPosition)">
      <div class="site-current-title">当前位置</div>
      <div class="site-current-box">
        <div class="site-current-name">{{sCurrentPosition || '--'}}</div>
        <div class="site-current-info" @click.stop="getPositionAuto">
          <img class="site-current-img" :src="imgTarget" mode="aspectFit" alt="">{{ isGettingPosition ? '正在定位' : '重新定位'}}
        </div>
      </div>
    </div>

    <div class="site-current-pos" v-if="from === 'start' && oCurrentPosition">
      <div class="site-current-title">当前位置附近</div>
      <ul class="site-list">
        
        <li v-if="isGettingPosition">
            <div class="site-list-item">
              <p>正在获取当前位置附近信息...</p>
            </div>
        </li>
        
        <li v-if="!isGettingPosition" v-for="(item, index) of aNearbyPosition" :key="index" @click="selected(item)">
            <div class="site-list-item">
              <p>{{ item.name }}</p>
              <p class="light">{{ item.address }}</p>
            </div>
        </li>

      </ul>
    </div>

    <div class="site-list-box" v-show="results.length">
      <ul class="site-list">
        <li v-for="(item, index) of results" :key="index" @click="selected(item)" v-if="item.address">
            <div class="site-list-item">
              <p>{{ item.name }}</p>
              <p class="light">{{ item.address }}</p>
            </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

