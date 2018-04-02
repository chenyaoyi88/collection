<template>
  <div class="container">
    <p @click="setGobackParams">点击这里返回上一个页面</p>
  </div>
</template>

<script>
import { goBackSetData } from '../../utils'
export default {
  methods: {
    setGobackParams () {
      setTimeout(() => {
        // var pages = getCurrentPages() // eslint-disable-line
        // var prevPage = pages[ pages.length - 2 ]
        // prevPage.setData({
        //   text: '恭喜发财'
        // })
        goBackSetData({
          text: '恭喜发财'
        })
        wx.navigateBack({
          delta: 1,
          success: function (res) {
            const pages = getCurrentPages() // eslint-disable-line
            console.log('pages', pages)
          }
        })
      }, 1000)
    }
  }
}
</script>

<style>
</style>
