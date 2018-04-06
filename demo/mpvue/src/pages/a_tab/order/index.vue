<template>
  <div class="container">
    <p>{{ msg }}</p>
        <item :iconName="'cartype'" :title="'车型'" :value="'小型面包'"></item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
    };
  },

  created() {
    this.msg = '订单页面';
  },

  mounted() {},

  onShow() {
    // console.log('onshow');
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
</style>
