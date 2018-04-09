<template>
  <div class="tabswitch-box">
    <div class="tabswitch-title-box" v-if="tabList.length">
      <ul class="title-list">
        <li v-for="(item, index) in tabList" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item }}</li>
      </ul>
    </div>
    <div class="tabswitch-content-box">
      <swiper @change="tabChange" :current="currentIndex">
        <slot></slot>
          <!-- <swiper-item>
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
          </swiper-item> -->
      </swiper>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
    },
    tabChange(e) {
      this.currentIndex = e.target.current;
    }
  }
};
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