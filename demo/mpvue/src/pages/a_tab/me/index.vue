<template>
  <div class="container">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },

  created () {
    this.msg = '我页面'
  },

  mounted () {
  },

  onShow () {
    console.log('onshow')
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
</style>
