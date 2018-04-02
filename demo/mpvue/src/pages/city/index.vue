<template>
  <div class="city-container" v-bind:class="{selecting: isSelecting ? true : false}">

    <div class="city-show-box">
      <div class="city-box curcity">
        <p class="city-title">定位城市</p>
        <ul class="city-list">
          <li class="city-list-item">北京</li>
        </ul>
      </div>

      <div class="city-box reccity">
        <p class="city-title">最近访问城市</p>
        <ul class="city-list">
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
        </ul>
      </div>

      <div class="city-box reccity">
        <p class="city-title">热门城市</p>
        <ul class="city-list">
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
          <li class="city-list-item">北京</li>
        </ul>
      </div>
    </div>

    <div class="city-select-box">

      <div class="city-select">
        <p class="city-title">A</p>
        <ul class="city-select-list">
          <li class="city-select-item">啊啊啊啊</li>
          <li class="city-select-item">啊啊啊啊</li>
          <li class="city-select-item">啊啊啊啊</li>
          <li class="city-select-item">啊啊啊啊</li>
        </ul>
      </div>

      <div class="city-select">
        <p class="city-title">B</p>
        <ul class="city-select-list">
          <li class="city-select-item">啊啊啊啊</li>
          <li class="city-select-item">啊啊啊啊</li>
          <li class="city-select-item">啊啊啊啊</li>
          <li class="city-select-item">啊啊啊啊</li>
        </ul>
      </div>

    </div>

    <div class="city-sidebar-box">
      <ul class="city-sidebar-list" @touchstart="chStart" @touchmove="chMove" @touchend="chEnd">
        <li class="city-sidebar-item" v-for="(item, index) in sideBarList" :key="item.value" :data-flag="item.value" :data-index="index">{{ item.name }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import sideBar from './data-sidebar'
export default {
  data () {
    return {
      sideBarList: sideBar,
      curCity: null,
      isSelecting: false
    }
  },

  methods: {
    chStart () {
      this.isSelecting = true
    },
    chMove (e) {
      // console.log(e.target.dataset.flag)
      console.log('target', e.mp.detail)
    },
    chEnd (e) {
      this.isSelecting = false
      console.log(e.mp)
    }
  },

  created () {
    console.log('created')
  },

  mounted () {
    console.log('mounted')
  },

  onShow () {
    console.log('onshow')
  }
}
</script>

<style lang="scss">
@import './index.scss'
</style>