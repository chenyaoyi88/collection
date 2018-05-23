<template>
  <div class="address-container">

    <div class="address-none" v-if="addressListNone">暂无数据</div>

    <div class="address-list">

       <block v-if="addressListData.length" v-for="(item, index) of addressListData" :key="index">
         <block v-for="(list, listIndex) of item" :key="listIndex">
           <div class="address-box">
             <div class="address-info" @click="select(list)">
               <div class="user-info">
                 <div class="user-info-l">
                   <span class="user-name">{{ list.name }}</span>
                   <span class="user-mobile">{{ list.mobile }}</span>
                 </div>
                 <div class="user-info-r">{{ list.remark }}</div>
               </div>
               <div class="address-name">{{ list.address }}</div>
               <div class="address-detail">{{ list.addressName }} {{ list.street || '' }}</div>
             </div>
             <div class="address-ctrl" v-if="isShowEdit">
               <div class="address-ctrl-btn address-edit" @click="edit(list)">编辑</div>
               <div class="address-ctrl-btn address-delete" @click="del(list, index, listIndex)">删除</div>
             </div>
           </div>
         </block>
       </block>

      <div class="list-nomore" v-if="isShowNomore">-- 没有更多数据了 --</div>

    </div>

    <div class="address-add-btn">
      <button class="ghb-btn" @click="addNewAddress">+ 新增地址</button>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.address-none {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: calc(100vh - 47px);
  display: flex;
  justify-content: center;
  align-items: center;
  // font-size: 16px;
  color: #ccc;
}

.address-box {
  background-color: #fff;
  font-size: 14px;
  margin-top: 10px;
  .address-info {
    padding: 10px;
    .user-info {
      color: #aaaaaa;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .address-name {
      margin: 3px 0;
    }
  }
  .address-ctrl {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border-top: 1rpx solid #eaeaea;
    .address-ctrl-btn {
      padding: 8px 10px;
      margin: 0 10px;
    }
    .address-delete {
      color: #f13744;
    }
  }
}

.user-info-l {
  .user-mobile {
    margin: 0 10px;
  }
}
.address-list {
  padding-bottom: 47px;
}

.address-add-btn {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  box-shadow: 0 -1rpx 0 #eaeaea;
  .ghb-btn {
    font-size: 16px;
    color: #f13744;
    background-color: #fff;
  }
}
</style>
