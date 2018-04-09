<template>
  <div class="tabswitch-box">
    <Tab :tabList="tabList">
      <swiper-item>
        <div class="order-box">
          <p>123阿斯达斯</p>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="order-box">
          <p>哇哇哇哇</p>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="order-box">
          <p>丫丫丫啊</p>
        </div>
      </swiper-item>
    </Tab>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
.tabswitch-box {
  .tabswitch-title-box {
    .title-list {
      text-align: center;
      .title-list-item {
        display: inline-block;
        margin: 0 5px;
        background: yellow;
        &.active {
          background: green;
        }
      }
    }
  }
  .tabswitch-content-box {
  }
}
.order-box {
  width: 100%;
  height: 100%;
  background: red;
  p {
    width: 100%;
    height: 100%;
    background: red;
  }
}
</style>
