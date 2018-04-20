<template>
  <div class="cancel-box">
    <radio-group class="radio-group" @change="radioChange">
      <div class="reason-list" v-for="(item, index) of cancelList" :key="index">
        <label class="reason">
          <div class="reason-name">{{item.reason}}</div><radio class="reason-value" :value="item.id" :checked="item.checked"/>
        </label>
      </div>
    </radio-group>
    <div class="cancel-btn-box">
      <button class="ghb-btn">确定</button>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.radio-group {
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
  .reason-list {
    font-size: 14px;
    padding: 5px 0;
    .reason {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .reason-name {
      }
      .reason-value {
      }
    }
  }
}

.cancel-btn-box {
  padding: 5px 15px;
}
</style>
