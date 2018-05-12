<template>
  <div class="coupon-item" @click="couponClick">
    <div class="coupon-content">
      <div class="coupon-content-l">
        <img v-if="isFail" class="coupon-content-l-bg" :src="IMG_COUPONBG_FAIL" mode="aspectFit">
        <img v-if="!isFail" class="coupon-content-l-bg" :src="IMG_COUPONBG" mode="aspectFit">
        <div class="coupon-amount">
          <span class="tag">￥</span>
          <span class="amount">{{ oCoupon.priceValue || '--' }}</span>
        </div>
        <template v-if="oCoupon.startPrice === 0">
          <div class="coupon-amount-tips">无最低金额限制</div>
        </template>
        <template v-else>
          <div class="coupon-amount-tips">满 {{ oCoupon.startPrice || '--'}} 元可用</div>
        </template>
      </div>

      <div class="coupon-content-r">

        <div class="coupon-content-main">
          <div class="coupon-title" :class="{'fail': isFail}">{{ oCoupon.name || '--' }}</div>
          <div class="coupon-desc">{{ oCoupon.introduction || '--' }}</div>
          <template v-if="isFail && oCoupon.isExpire">
            <div class="coupon-date fail">{{ oCoupon.endDateFormat || '--' }} 已到期</div>
          </template>
          <template v-if="isFail && oCoupon.isUsed">
            <div class="coupon-date fail">{{ oCoupon.usedDateFormat || '--' }} 已使用</div>
          </template>
          <template v-if="!isFail">
            <div class="coupon-date">{{ oCoupon.endDateFormat || '--' }} 到期</div>
          </template>
        </div>
        
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
  computed: {
    oCoupon() {
      this.couponInfo.beginDateFormat = this.formatCouponTime(
            this.couponInfo.beginDate);
      this.couponInfo.endDateFormat = this.formatCouponTime(
            this.couponInfo.endDate);
      this.couponInfo.usedDateFormat = this.formatCouponTime(
            this.couponInfo.usedDate);
      return this.couponInfo;
    }
  },
  methods: {
    couponClick() {
      this.$emit('couponClick');
    },
    couponRuleClick() {
      wx.showModal({
        title: '使用说明',
        content: this.oCoupon.termOfUse,
        showCancel: false
      });
    },
    formatCouponTime(timestamp) {
      return formatTime(new Date(timestamp))
        .split(' ')[0]
        .replace(/\//g, '.');
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
      background-color: #fff;

      .coupon-content-main {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 20px;
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
          padding: 8px 0 4px;
        }
        .coupon-date {
          font-size: 12px;
          color: #ff8320;
          &.fail {
            color: #a0a0a0;
          }
        }
      }
      .coupon-rule {
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

