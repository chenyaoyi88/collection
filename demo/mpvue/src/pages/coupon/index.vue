<template>
  <div>

    <template v-if="from === 'me'">
      <div class="title-box">
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item.name + '(' + (item.count || '0') + ')' }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',transform: 'translate3d(' + titleSlider.left + '%,0,0)'}">
          <div class="slider"></div>
        </div>
      </div>

      <div class="tab-box">

        <div class="tab" :class="{active: currentIndex === 0}">
          <div class="coupon-list-box">

            <block v-if="canUse.listNone">
              <div class="coupon-list-none fixed">-- 暂无可使用优惠券 --</div>
            </block>

            <block v-if="canUse.list.length" v-for="(item, index) of canUse.list" :key="index">
              <block v-for="(list, listIndex) of item" :key="listIndex">
                <!-- <coupon :isFail="false" :couponInfo="list"></coupon> -->
                <div class="coupon-item">
                  <div class="coupon-content">
                    <div class="coupon-content-l">
                      <img class="coupon-content-l-bg" :src="IMG_COUPONBG" mode="aspectFit">
                      <div class="coupon-amount">
                        <span class="tag">￥</span>
                        <span class="amount">{{ list.priceValue || '--' }}</span>
                      </div>
                      <template v-if="list.startPrice === 0">
                        <div class="coupon-amount-tips">无最低金额限制</div>
                      </template>
                      <template v-else>
                        <div class="coupon-amount-tips">满 {{ list.startPrice || '--'}} 元可用</div>
                      </template>
                    </div>
                    <div class="coupon-content-r">
                      <div class="coupon-content-main">
                        <div class="coupon-title">{{ list.name || '--' }}</div>
                        <div class="coupon-desc">{{ list.introduction || '--' }}</div>
                        <div class="coupon-date">{{ list.endDateFormat || '--' }} 到期</div>
                      </div>
                      <div class="coupon-rule" @click.stop="couponRuleClick(list.termOfUse)">
                        <span class="coupon-rule-text">适用规则</span>
                        <img class="coupon-rule-arrow" :src="IMG_ARROW" alt="" mode="aspectFit">
                      </div>
                    </div>
                  </div>
                </div>
              </block>
            </block>

            <div class="list-nomore" v-show="canUse.listnomore">-- 没有更多数据了 --</div>
          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 1}">
          <div class="coupon-list-box">

            <block v-if="expire.listNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="expire.list.length" v-for="(item, index) of expire.list" :key="index">
              <block v-for="(list, listIndex) of item" :key="listIndex">
                <!-- <coupon :isFail="true" :couponInfo="list"></coupon> -->
                <div class="coupon-item">
                  <div class="coupon-content">
                    <div class="coupon-content-l">
                      <img class="coupon-content-l-bg" :src="IMG_COUPONBG_FAIL" mode="aspectFit">
                      <div class="coupon-amount">
                        <span class="tag">￥</span>
                        <span class="amount">{{ list.priceValue || '--' }}</span>
                      </div>
                      <template v-if="list.startPrice === 0">
                        <div class="coupon-amount-tips">无最低金额限制</div>
                      </template>
                      <template v-else>
                        <div class="coupon-amount-tips">满 {{ list.startPrice || '--'}} 元可用</div>
                      </template>
                    </div>
                    <div class="coupon-content-r">
                      <div class="coupon-content-main">
                        <div class="coupon-title fail">{{ list.name || '--' }}</div>
                        <div class="coupon-desc">{{ list.introduction || '--' }}</div>
                        <div class="coupon-date fail">{{ list.endDateFormat || '--' }} 已到期</div>
                      </div>
                      
                      <div class="coupon-rule" @click.stop="couponRuleClick(list.termOfUse)">
                        <span class="coupon-rule-text">适用规则</span>
                        <img class="coupon-rule-arrow" :src="IMG_ARROW" alt="" mode="aspectFit">
                      </div>
                    </div>
                  </div>
                </div>
              </block>
            </block>

            <div class="list-nomore" v-show="expire.listnomore">-- 没有更多数据了 --</div>

          </div>
        </div>

        <div class="tab" :class="{active: currentIndex === 2}">
          <div class="coupon-list-box">

            <block v-if="used.listNone">
              <div class="coupon-list-none fixed">-- 暂无数据 --</div>
            </block>

            <block v-if="used.list.length" v-for="(item, index) of used.list" :key="index">
              <block v-for="(list, listIndex) of item" :key="listIndex">
                <!-- <coupon :isFail="true" :couponInfo="list"></coupon> -->
                <div class="coupon-item">
                  <div class="coupon-content">
                    <div class="coupon-content-l">
                      <img class="coupon-content-l-bg" :src="IMG_COUPONBG_FAIL" mode="aspectFit">
                      <div class="coupon-amount">
                        <span class="tag">￥</span>
                        <span class="amount">{{ list.priceValue || '--' }}</span>
                      </div>
                      <template v-if="list.startPrice === 0">
                        <div class="coupon-amount-tips">无最低金额限制</div>
                      </template>
                      <template v-else>
                        <div class="coupon-amount-tips">满 {{ list.startPrice || '--'}} 元可用</div>
                      </template>
                    </div>
                    <div class="coupon-content-r">
                      <div class="coupon-content-main">
                        <div class="coupon-title fail">{{ list.name || '--' }}</div>
                        <div class="coupon-desc">{{ list.introduction || '--' }}</div>
                        <div class="coupon-date fail">{{ list.usedDateFormat || '--' }} 已使用</div>
                      </div>
                      <div class="coupon-rule" @click.stop="couponRuleClick(list.termOfUse)">
                        <span class="coupon-rule-text">适用规则</span>
                        <img class="coupon-rule-arrow" :src="IMG_ARROW" alt="" mode="aspectFit">
                      </div>
                    </div>
                  </div>
                </div>
              </block>
            </block>
            
            <div class="list-nomore" v-show="used.listnomore">-- 没有更多数据了 --</div>

          </div>
        </div>

      </div>
    </template>

    <template v-if="from === 'index'">

        <block v-if="LogisticsCouponsNone">
          <div class="coupon-list-none fixed">-- 暂无可使用优惠券 --</div>
        </block>

        <div v-else>
          <div v-if="LogisticsCoupons.length" class="coupon-not-use" @click="couponSelectFormIndex(null)">
            <div>不使用优惠券</div>
            <div v-if="!isNotUseCoupon" class="unselect-circle"></div>
            <img v-else class="select-circle" :src="IMG_SELECT" alt="" mode="aspectFit">
          </div>
          <div class="coupon-list-box">
            <block v-if="LogisticsCoupons.length" v-for="(list, index) of LogisticsCoupons" :key="index">
              <!-- <coupon :isFail="false" :isShowSlect="true" :couponInfo="item" @couponClick="couponSelectFormIndex(item)"></coupon> -->
              <div class="coupon-item" @click="couponSelectFormIndex(list)">
                <div class="coupon-content">
                  <div class="coupon-content-l">
                    <img class="coupon-content-l-bg" :src="IMG_COUPONBG" mode="aspectFit">
                    <div class="coupon-amount">
                      <span class="tag">￥</span>
                      <span class="amount">{{ list.priceValue || '--' }}</span>
                    </div>
                    <template v-if="list.startPrice === 0">
                      <div class="coupon-amount-tips">无最低金额限制</div>
                    </template>
                    <template v-else>
                      <div class="coupon-amount-tips">满 {{ list.startPrice || '--'}} 元可用</div>
                    </template>
                  </div>
                  <div class="coupon-content-r">
                    <div class="coupon-content-main">
                      <div class="coupon-title">{{ list.name || '--' }}</div>
                      <div class="coupon-desc">{{ list.introduction || '--' }}</div>
                      <div class="coupon-date">{{ list.endDateFormat || '--' }} 到期</div>
                      <div class="coupon-circle-select">
                        <div v-if="!list.select" class="unselect-circle"></div>
                        <img v-else class="select-circle" :src="IMG_SELECT" alt="" mode="aspectFit">
                      </div>
                    </div>
                    <div class="coupon-rule" @click.stop="couponRuleClick(list.termOfUse)">
                      <span class="coupon-rule-text">适用规则</span>
                      <img class="coupon-rule-arrow" :src="IMG_ARROW" alt="" mode="aspectFit">
                    </div>
                  </div>
                </div>
              </div>
            </block>
            <div class="list-nomore" v-show="LogisticsCouponsNomore">-- 没有更多数据了 --</div>
          </div>
        </div>

    </template>

  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss">
@import './index.scss';
</style>

