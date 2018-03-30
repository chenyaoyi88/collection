<template>
  <div class="idx-box">
    <div class="idx-hd-box">首页顶部</div>
    <div class="idx-main-box">
      <p>{{ msg }}</p>
      <p @click="carTypeSelect">车型</p>
    </div>
    <div class="idx-ft-box">
      <div class="idx-ft-price">
        <p class="price-text">￥---</p>
        <div class="price-text-detail-box">
        <span class="price-text-detail">价格明细</span>
        </div>
      </div>
      <div class="idx-ft-nextbtn">
        <button @click="nextStep">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    msg () {
      return this.$store.state.msg
    }
  },
  methods: {
    carTypeSelect () {
      const url = '../../cartype/main'
      wx.navigateTo({ url })
    },
    nextStep () {
      console.log(this.msg)
    }
  },

  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },
  onLoad () {
    console.log('onLoad')
  }
}
</script>

<style lang="scss">
@import './index.scss'
</style>
