<template>

    <div class="tab" :class="{active: currentIndex === tabIndex}">

        <noorder :isShow="isShowNone" :text="isShowNoneText"></noorder>
        
        <block v-if="orderList.length" v-for="(item, index) of orderList" :key="index">
            <div class="list-box" v-for="(order, orderIndex) of item" :key="orderIndex">
            <div class="list-tile">
                <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                <div class="list-tile-r" :class="{'color-notice': order.paymentStatus == 0 || order.paymentStatus == 10}">{{ order.statusText }}</div>
            </div>
            <div class="list-content">
                <item 
                iconType="point" 
                textTop="" 
                :textCenter="order.senderAddressName" 
                :textBottom="order.senderSiteName + ' ' + (order.senderStreet || '')"  
                noBorderTop="true"
                isArrowHide="true"
                itemClass="order"
                ></item>
                <item 
                iconType="point" 
                pointType="end" 
                textTop="" 
                :textCenter="order.receiverAddressName" 
                :textBottom="order.receiverSiteName + ' ' + (order.receiverStreet || '')"  
                noBorderTop="true"
                isArrowHide="true"
                itemClass="order"
                ></item>
                <div class="info">
                <p class="info-car">
                    <text class="info-box">
                    <text class="info-title">车型：</text><text class="info-text">{{ order.carTypeName }}</text>
                    </text>
                    <text class="info-box">
                    <text class="info-title">额外服务：</text><text class="info-text">{{ order.additionalRequests }}</text>
                    </text>
                </p>
                <p class="info-car">
                    <text class="info-title">订单信息：</text><text class="info-text">{{ order.goodsDesc }}</text>
                </p>
                </div>
            </div>
            <div class="list-msg">
                <div class="list-msg-l">订单金额:<text class="color-notice">￥{{ order.paymentAmount }}</text></div>
                <!-- 立即支付 + 未支付，显示2个按钮 -->
                <div class="list-msg-r" v-if="(order.status === 10 && order.paymentType === 1 && (order.paymentStatus == 0 || order.paymentStatus == 10)) || (order.status === 50 && order.paymentType === 2)">
                <!-- 已送达 + 未支付不可取消，隐藏取消订单按钮 -->
                <button v-if="!(order.status === 50 && order.paymentType === 2)" class="ghb-btn cancel" @click="orderCancel(order.id)">取消订单</button>
                <button class="ghb-btn" @click="orderPay(order)">支付订单</button>
                </div>
            </div>
            </div>
        </block>

    </div>
</template>

<script>
import item from '@/components/item/item';
import noorder from './noorder';

export default {
  components: {
    item,
    noorder
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    isShowNone: {
      type: Boolean,
      default: false
    },
    isShowNoneText: {
      type: String,
      default() {
        let text = '';
        switch (this.tabIndex) {
          case 0:
            text = '进行中';
            break;
          case 1:
            text = '已完成';
            break;
          case 2:
            text = '已取消';
            break;
          default:
        }
        return `您最近没有${text}订单`;
      }
    },
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      text: ''
    };
  },
  computed: {
    orderList() {
      return this.dataList;
    }
  },
  methods: {
    orderCancel(orderId) {
      this.$emit('orderCancel', orderId);
    },
    orderPay(order) {
      this.$emit('orderPay', order);
    }
  }
};
</script>

<style lang="scss">
.list-box {
  margin: 10px 0;
  background-color: #fff;
  .list-tile {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
    .list-tile-l {
      color: #888888;
    }
  }
  .list-content {
    padding: 5px 0;
  }
  .list-msg {
    border-top: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 15px;
    .list-msg-l {
      flex: 1;
      font-size: 15px;
      color: #888888;
    }
    .list-msg-r {
      display: flex;
      flex-direction: row;
      button {
        font-size: 14px;
        width: 75px;
        height: 30px;
        padding: 0;
        margin: 0;
        margin-left: 10px;
        border: 1px solid #fb0628;
        &.cancel {
          color: #fb0628;
          background-color: #fff;
        }
      }
    }
  }
}
</style>

