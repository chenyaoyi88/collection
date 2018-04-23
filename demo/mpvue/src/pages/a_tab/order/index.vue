<template>
  <div class="ghb-order-box">

    <!-- 未登录 -->
    <noorder 
      :isShow="!isLogin" 
      isShowBtn="true" 
      text="您还未登录噢，速速去登录吧～" 
      v-on:btnEvent="gotoLogin"
    ></noorder>

    <!-- 已登录 -->
    <div v-if="isLogin">

      <div class="title-box">
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',left: titleSlider.left + '%'}"
        >
          <div class="slider"></div>
        </div>
      </div>


      <div class="tab-box">
        <div class="tab tab1" :class="{active: currentIndex === 0}">
          <noorder :isShow="isListNoData" text="您最近没有订单"></noorder>
          
          <block v-if="ingList.length" v-for="(item, index) of ingList" :key="index">
            <div class="list-box" v-for="(order, orderIndex) of item" :key="order.id+orderIndex">
              <div class="list-tile">
                <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                <div class="list-tile-r">{{ order.statusText }}</div>
              </div>
              <div class="list-content">
                <item 
                  iconType="point" 
                  textTop="" 
                  :textCenter="order.senderAddressName" 
                  :textBottom="order.senderSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <item 
                  iconType="point" 
                  pointType="end" 
                  textTop="" 
                  :textCenter="order.receiverAddressName" 
                  :textBottom="order.receiverSiteName"  
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
                <div class="list-msg-r" v-if="order.paymentStatus === 0">
                  <button class="ghb-btn cancel" @click="orderCancel(order.id)">取消订单</button>
                  <button class="ghb-btn" @click="orderPay(order)">支付订单</button>
                </div>
              </div>
            </div>
          </block>

        </div>
        <div class="tab tab2" :class="{active: currentIndex === 1}">
          <noorder :isShow="isListNoData" text="您最近没有订单"></noorder>

          <block v-if="finishList.length" v-for="(item, index) of finishList" :key="index">
            <div class="list-box" v-for="(order, orderIndex) of item" :key="order.id+orderIndex">
              <div class="list-tile">
                <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                <div class="list-tile-r">{{ order.statusText }}</div>
              </div>
              <div class="list-content">
                <item 
                  iconType="point" 
                  textTop="" 
                  :textCenter="order.senderAddressName" 
                  :textBottom="order.senderSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <item 
                  iconType="point" 
                  pointType="end" 
                  textTop="" 
                  :textCenter="order.receiverAddressName" 
                  :textBottom="order.receiverSiteName"  
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
              </div>
            </div>
          </block>

        </div>
        <div class="tab tab3" :class="{active: currentIndex === 2}">
          <noorder :isShow="isListNoData" text="您最近没有订单"></noorder>

          <block v-if="cancelList.length" v-for="(item, index) of cancelList" :key="index">
            <div class="list-box" v-for="(order, orderIndex) of item" :key="order.id+orderIndex">
              <div class="list-tile">
                <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                <div class="list-tile-r">{{ order.statusText }}</div>
              </div>
              <div class="list-content">

                <item 
                  iconType="point" 
                  textTop="" 
                  :textCenter="order.senderAddressName" 
                  :textBottom="order.senderSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <item 
                  iconType="point" 
                  pointType="end" 
                  textTop="" 
                  :textCenter="order.receiverAddressName" 
                  :textBottom="order.receiverSiteName"  
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
                      <text class="info-title">额外服务：</text><text class="info-text">{{ order.additionalRequests || '无' }}</text>
                    </text>
                  </p>
                  <p class="info-car">
                    <text class="info-title">订单信息：</text><text class="info-text">{{ order.goodsDesc }}</text>
                  </p>
                </div>
              </div>
              <div class="list-msg">
                <div class="list-msg-l">订单金额:<text class="color-notice">￥{{ order.paymentAmount }}</text></div>
                
              </div>
            </div>
          </block>

        </div>
      </div>

    </div>

    <sliderSelect 
      type="radio"
      :dataList="cancelReasonList" 
      :isSliderShow="selectSlider"
      title="取消订单原因"
      name="reason"
      value="id"
      @hideSlider="fnHideSlider"
      @radioChange="fnRadioChange"
      @sliderComfirm="fnRadioComfirm"
    ></sliderSelect>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
