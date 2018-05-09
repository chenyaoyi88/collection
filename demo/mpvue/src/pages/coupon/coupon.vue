<template>
  <div class="coupon-item" @click="couponClick">
    <div class="coupon-content">
      <div class="coupon-content-l">
        <img v-if="isFail" class="coupon-content-l-bg" :src="IMG_COUPONBG_FAIL" mode="aspectFit">
        <img v-if="!isFail" class="coupon-content-l-bg" :src="IMG_COUPONBG" mode="aspectFit">
        <div class="coupon-amount">
          <span class="tag">￥</span>
          <span class="amount">{{ couponInfo.priceValue || '--' }}</span>
        </div>
        <template v-if="couponInfo.startPrice === 0">
          <div class="coupon-amount-tips">无最低金额限制</div>
        </template>
        <template v-else>
          <div class="coupon-amount-tips">满 {{ couponInfo.startPrice || '--'}} 元可用</div>
        </template>
      </div>

      <div class="coupon-content-r">
        <div class="coupon-title" :class="{'fail': isFail}">{{ couponInfo.name || '--' }}</div>
        <div class="coupon-desc">{{ couponInfo.introduction || '--' }}</div>
        <template v-if="isFail && couponInfo.isExpire">
          <div class="coupon-date fail">{{ couponInfo.expireDate || '--' }} 已到期</div>
        </template>
        <template v-if="isFail && couponInfo.isUsed">
          <div class="coupon-date fail">{{ couponInfo.usedDateFormat || '--' }} 已使用</div>
        </template>
        <template v-if="!isFail">
          <div class="coupon-date">{{ couponInfo.usedDateFormat || '--' }} 到期</div>
        </template>
        
        <div class="coupon-rule" @click.stop="couponRuleClick">
          <span class="coupon-rule-text">适用规则</span>
          <img class="coupon-rule-arrow" :src="IMG_ARROW" alt="" mode="aspectFit">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import IMG_COUPONBG from '../../../static/images/couponbg.png';
import IMG_COUPONBG_FAIL from '../../../static/images/couponbg_fail.png';
import IMG_ARROW from '../../../static/images/arrow-coupon.png';
import { formatTime } from '../../utils/index.ts';

export default {
  props: {
    couponInfo: {
      type: Object,
      default: {}
    },
    isFail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      IMG_COUPONBG,
      IMG_COUPONBG_FAIL,
      IMG_ARROW
    };
  },
  methods: {
    couponClick() {
      console.log('点击优惠券');
      this.$emit('couponClick');
    },
    couponRuleClick() {
      console.log('点击优惠券适用规则');
    },
    formatCouponTime(timestamp) {
      return formatTime(new Date(timestamp))
        .split(' ')[0]
        .replace(/\//g, '.');
    }
  },
  created() {
    if (this.couponInfo) {
      if (this.couponInfo.usedDate) {
        this.couponInfo.usedDateFormat = this.formatCouponTime(this.couponInfo.usedDate);
      }
    }
  }
};
</script>

<style lang="scss">
.coupon-item {
  width: 345px;
  height: 120px;
  position: relative;
  z-index: 1;
  margin-bottom: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  .coupon-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    .coupon-content-l {
      width: 120px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
      .coupon-content-l-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
      .coupon-amount {
        font-size: 28px;
        padding: 5px 0 3px;
        .tag {
          margin-right: -3px;
        }
      }
      .coupon-amount-tips {
        font-size: 12px;
      }
    }
    .coupon-content-r {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;
      position: relative;
      z-index: 2;
      background-color: #fff;
      .coupon-title {
        font-size: 15px;
        font-weight: bold;
        color: #0c0c0e;
        &.fail {
          color: #a0a0a0;
        }
      }
      .coupon-desc {
        font-size: 12px;
        color: #a0a0a0;
        padding: 10px 0 4px;
      }
      .coupon-date {
        font-size: 12px;
        color: #ff8320;
        &.fail {
          color: #a0a0a0;
        }
      }
      .coupon-rule {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 3;
        width: 100%;
        height: 24px;
        border-top: 1px dashed #c4c4c4;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .coupon-rule-text {
          font-size: 12px;
          color: #9e9e9e;
        }
        .coupon-rule-arrow {
          width: 11px;
          height: 10px;
          margin: 0 8px;
        }
      }
    }
  }
}
</style>

