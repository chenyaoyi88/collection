<template>
  <div class="container">
    <p @click="setCarType1">{{ msg1 }}</p>
    <p @click="setCarType2">{{ msg2 }}</p>
  </div>
</template>

<script>
import API from '../../api'
export default {
  data () {
    return {
      msg1: '车辆选择返回1',
      msg2: '车辆选择返回2'
    }
  },
  methods: {
    setCarType1 () {
      this.$store.commit({
        type: 'msgChange',
        msg: 'fuck'
      })
      wx.navigateBack()
    },
    setCarType2 () {
      wx.request({
        url: API.TEST,
        data: {
          name: 'cyy'
        },
        success: (res) => {
          this.$store.commit({
            type: 'msgChange',
            msg: res.data.msg
          })
          wx.navigateBack()
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style>
</style>
