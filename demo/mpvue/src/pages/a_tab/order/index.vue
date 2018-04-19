<template>
  <div class="ghb-order-box">

    <div v-if="!isLogin" class="login-box">
      <div class="login-page-box">
        <img class="login-page-img" :src="imgNodata" alt=""  mode="aspectFit">
        <p class="login-page-tips">您还未登录噢，速速去登录吧～</p>
        <button class="ghb-btn login-page-btn" @click="gotoLogin">登录</button>
      </div>
    </div>

    <div v-else>
      <div class="title-box">
        <div v-for="(item, index) in tabList" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item }}</div>
        <div class="title-slider" :style="{width: titleSlider.width + '%;',left: titleSlider.left + '%;'}">
          <div class="slider"></div>
        </div>
      </div>
      <swiper class="content-box" @change="tabChange" :current="currentIndex"
            duration="200">

        <swiper-item>
          <scroll-view class="content" scroll-y @scrolltolower="v1bottom">

            <div class="no-order-box" v-if="listLoaded">
              <img :src="imgNoOrder" alt="" mode="aspectFit">
            </div>

            <div v-if="ingList.length" class="list-box" v-for="(item, index) of ingList" :key="index">
              <div class="list-tile">
                <div class="list-tile-l">{{ item.logisticsOrderTime }}</div>
                <div class="list-tile-r">{{ item.statusText }}</div>
              </div>
              <div class="list-content">
                <item 
                  iconType="point" 
                  textTop="" 
                  :textCenter="item.senderAddressName" 
                  :textBottom="item.senderSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <item 
                  iconType="point" 
                  pointType="end" 
                  textTop="" 
                  :textCenter="item.receiverAddressName" 
                  :textBottom="item.receiverSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <div class="info">
                  <p class="info-car">
                    <text class="info-box">
                      <text class="info-title">车型：</text><text class="info-text">小面包</text>
                    </text>
                    <text class="info-box">
                      <text class="info-title">额外服务：</text><text class="info-text">搬运 推车 代收</text>
                    </text>
                  </p>
                  <p class="info-car">
                    <text class="info-title">订单信息：</text><text class="info-text">{{ item.goodsDesc }}</text>
                  </p>
                </div>
              </div>
              <div class="list-msg">
                <div class="list-msg-l">订单信息:<text class="color-notice">￥{{ item.paymentAmount }}</text></div>
                <div class="list-msg-r">
                  <button class="ghb-btn cancel" @click="orderCancel(item.id)">取消订单</button>
                  <button class="ghb-btn" @click="orderPay(item)">支付订单</button>
                </div>
              </div>
            </div>

          </scroll-view>
        </swiper-item>

        <swiper-item>
          <scroll-view class="content" scroll-y @scrolltolower="v2bottom">

            <div class="no-order-box" v-if="listLoaded">
              <img :src="imgNoOrder" alt="" mode="aspectFit">
            </div>

            <div v-if="finishList.length" class="list-box" v-for="(item, index) of finishList" :key="index">
              <div class="list-tile">
                <div class="list-tile-l">{{ item.logisticsOrderTime }}</div>
                <div class="list-tile-r">{{ item.statusText }}</div>
              </div>
              <div class="list-content">
                <item 
                  iconType="point" 
                  textTop="" 
                  :textCenter="item.senderAddressName" 
                  :textBottom="item.senderSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <item 
                  iconType="point" 
                  pointType="end" 
                  textTop="" 
                  :textCenter="item.receiverAddressName" 
                  :textBottom="item.receiverSiteName"  
                  noBorderTop="true"
                  isArrowHide="true"
                  itemClass="order"
                ></item>
                <div class="info">
                  <p class="info-car">
                    <text class="info-box">
                      <text class="info-title">车型：</text><text class="info-text">小面包</text>
                    </text>
                    <text class="info-box">
                      <text class="info-title">额外服务：</text><text class="info-text">搬运 推车 代收</text>
                    </text>
                  </p>
                  <p class="info-car">
                    <text class="info-title">订单信息：</text><text class="info-text">{{ item.goodsDesc }}</text>
                  </p>
                </div>
              </div>
              <div class="list-msg">
                <div class="list-msg-l">订单信息:<text class="color-notice">￥{{ item.paymentAmount }}</text></div>
              </div>
            </div>

          </scroll-view>
        </swiper-item>

        <swiper-item>
          <scroll-view class="content" scroll-y @scrolltolower="v3bottom">

              <div class="no-order-box" v-if="listLoaded">
                <img :src="imgNoOrder" alt="" mode="aspectFit">
              </div>

              <div v-if="cancelList.length" class="list-box" v-for="(item, index) of cancelList" :key="index">
                <div class="list-tile">
                  <div class="list-tile-l">{{ item.logisticsOrderTime }}</div>
                  <div class="list-tile-r">{{ item.statusText }}</div>
                </div>
                <div class="list-content">
                  <item 
                    iconType="point" 
                    textTop="" 
                    :textCenter="item.senderAddressName" 
                    :textBottom="item.senderSiteName"  
                    noBorderTop="true"
                    isArrowHide="true"
                    itemClass="order"
                  ></item>
                  <item 
                    iconType="point" 
                    pointType="end" 
                    textTop="" 
                    :textCenter="item.receiverAddressName" 
                    :textBottom="item.receiverSiteName"  
                    noBorderTop="true"
                    isArrowHide="true"
                    itemClass="order"
                  ></item>
                  <div class="info">
                    <p class="info-car">
                      <text class="info-box">
                        <text class="info-title">车型：</text><text class="info-text">小面包</text>
                      </text>
                      <text class="info-box">
                        <text class="info-title">额外服务：</text><text class="info-text">搬运 推车 代收</text>
                      </text>
                    </p>
                    <p class="info-car">
                      <text class="info-title">订单信息：</text><text class="info-text">{{ item.goodsDesc }}</text>
                    </p>
                  </div>
                </div>
                <div class="list-msg">
                  <div class="list-msg-l">订单信息:<text class="color-notice">￥{{ item.paymentAmount }}</text></div>
                  
                </div>
              </div>

          </scroll-view>
        </swiper-item>
      </swiper>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
