<template>
  <div class="goodsinfo-input-box">
    <textarea 
      placeholder="输入货物信息（备注等）" 
      maxlength="200" 
      placeholder-style="font-size:14px;"
      cols="30" 
      rows="10"
      @input="getGoodsRemark($event.target.value)"
    ></textarea>
    <div class="goodsinfo-btn-box">
      <button class="ghb-btn" @click="submit">确认</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.goodsinfo-input-box {
  textarea {
    margin-top: 10px;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    font-size: 14px;
  }
  .goodsinfo-btn-box {
    padding: 20px;
  }
}
</style>
