<template>
  <div class="site-box">

    <div class="site-search-box">
      <div class="site-suggest">
        <input type="text" @input="search" focus="true">
      </div>
      <div class="site-cancel">
        <p>取消</p>
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

