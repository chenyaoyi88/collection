<template>
  <div>
    <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="(item, index) in items" :key="item.name">
        <radio :value="item.name" :checked="item.checked"/> {{item.value}}
      </label>
    </radio-group>
    <div>{{tabIndex}}</div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.title-box {
  width: 100%;
  height: 47px;
  background-color: #fff;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  .title {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .title-slider {
    position: absolute;
    bottom: 0;
    transition: left 0.5s;
    z-index: 2;
    height: 2px;
    background-color: red;
  }
}
.content-box {
  width: 100%;
  height: calc(100vh - 47px);
  background-color: #ccc;
  .content {
    height: 100%;
  }
}
</style>
