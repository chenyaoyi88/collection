<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <p>
      <button @click="requestTest">请求测试</button>
    </p>

    <p>请求回来的信息：{{ name }}</p>

    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import API from '../../api'

export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    requestTest () {
      wx.request({
        url: API.TEST,
        data: {
          name: 'cyy'
        },
        success: (res) => {
          this.name = res.data.msg
          console.log(this)
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
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
