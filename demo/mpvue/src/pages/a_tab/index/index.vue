<template>
  <div class="idx-box">
    <div class="idx-hd-box">首页顶部</div>
    <div class="idx-main-box">
      <p>{{ msg }}</p>
      <p @click="carTypeSelect">车型</p>
      <div>
        <p>{{ text }}</p>
        <p @click="goBacksendParams">导航回来带参数</p>
      </div>
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
import { goBackGetData } from '../../../utils'

export default {
  data () {
    return {
      text: ''
    }
  },
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
    goBacksendParams () {
      const url = '../../goback/main'
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
  },
  onShow () {
    // const pages = getCurrentPages() // eslint-disable-line
    // const currPage = pages[ pages.length - 1 ]
    // this.text = currPage.data.text
    this.text = goBackGetData().text
    console.log('text', this.text)
  }
}
</script>

<style lang="scss">
@import './index.scss'
</style>
