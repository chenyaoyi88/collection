<template>
  <div class="tabswitch-box">
    <div class="tabswitch-title-box" v-if="tabList.length" :style="{height: headerHeight + 'px'}">
      <ul class="title-list">
        <li v-for="(item, index) in tabList" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item }}</li>
      </ul>
    </div>
    <div class="tabswitch-content-box" :style="{height: contentHeight + 'px'}">
      <swiper 
        class="tabswitch-content" @change="tabChange" :current="currentIndex"
        :duration="duration"
      >
        <slot></slot>
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
    },
    headerHeight: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      currentIndex: 0,
      contentHeight: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
    },
    tabChange(e) {
      this.currentIndex = e.target.current;
    },
  },
  mounted() {
    const oTab = this;
    wx.getSystemInfo({
      success(res) {
        oTab.contentHeight = res.windowHeight - oTab.headerHeight;
      }
    });
    // this.$emit('tabChange', this.currentIndex);
  }
};
</script>

<style lang="scss">
@import './index.scss';
</style>