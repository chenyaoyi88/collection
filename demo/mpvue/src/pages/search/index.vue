<template>
  <div class="site-box">

    <div class="site-search-box">
      <div class="search-box">

        <div class="search-input-box">
          <div class="search-icon-box">
            <icon class="search-icon" size="12" type="search"></icon>
          </div>
          <input class="search-input" type="text" :placeholder="'请输入' + desText" @input="search" focus="true" :value="inputValue">
          <div class="clear-icon-box" @click="clear">
            <icon class="clear-icon" size="15" type="clear"></icon>
          </div>
        </div>

        <div class="search-cancel">
          <p @click="goBack">取消</p>
        </div>
      </div>
    </div>

    <div class="site-list-box" :style="{height: listHeight + 'px'}">
      <ul class="site-list">
        <li v-for="(item, index) of results" v-bind:key="index" @click="selected(item)">
          <p>{{ item.name }}</p>
          <p class="light">{{ item.address }}</p>
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

