<template>
  <ul class="cartype-list">
    <li class="list-item" v-for="(item, index) of cartypeList" :key="index" @click="cartypeSelect(item)">
      <div class="list-item-l">
        <img src="../../../static/images/cartype.svg" alt="">
        <p>{{ item.name }}</p>
      </div>
      <div class="list-item-r">
        <p>{{ item.long + ' x ' + item.wide + ' x ' + item.height + ' | ' + item.weight + '吨' }}</p>
        <p>{{ item.text1 }}</p>
        <p>{{ item.text2 }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>
