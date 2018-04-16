<template>
  <div class="ghb-order-box">
    <div v-if="!isLogin" class="login-box">
      <div class="login-page-box">
        <button class="login-page-btn" @click="gotoLogin">请登录</button>
      </div>
    </div>
    <div v-if="isLogin">
      <div class="tabswitch-box">
        <div class="tabswitch-title-box" v-if="tabList.length" :style="{height: headerHeight + 'px'}">
          <ul class="title-list">
            <li v-for="(item, index) in tabList" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item }}</li>
          </ul>
        </div>
        <div class="tabswitch-content-box" :style="{height: contentHeight + 'px'}">
          <swiper 
            class="tabswitch-content" @change="tabChange" :current="currentIndex"
            duration="200"
          >
            <swiper-item class="tab1-swiper-item">

              <div class="tab-item">

                <div class="no-order-box" v-if="!ingList.length">
                  <img src="../../../../static/images/callcar.png" alt="" mode="aspectFit">
                </div>

                <div v-if="ingList.length" class="list-box" v-for="(item, index) of ingList" :key="index">
                  <div class="list-tile">
                    <div class="list-tile-l">{{ item.logisticsOrderTime }}</div>
                    <div class="list-tile-r">进行中</div>
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
                      <button class="ghb-btn cancel">取消订单</button>
                      <button class="ghb-btn">支付订单</button>
                    </div>
                  </div>
                </div>

              </div>

            </swiper-item>

            <swiper-item class="tab1-swiper-item">

              <div class="tab-item">

                <div class="no-order-box" v-if="!finishList.length">
                  <img src="../../../../static/images/callcar.png" alt="" mode="aspectFit">
                </div>

                <div v-if="finishList.length" class="list-box" v-for="(item, index) of finishList" :key="index">
                  <div class="list-tile">
                    <div class="list-tile-l">{{ item.logisticsOrderTime }}</div>
                    <div class="list-tile-r">已完成</div>
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

              </div>

            </swiper-item>

            <swiper-item class="tab1-swiper-item">

              <div class="tab-item">

                <div class="no-order-box" v-if="!cancelList.length">
                  <img src="../../../../static/images/callcar.png" alt="" mode="aspectFit">
                </div>

                <div v-if="cancelList.length" class="list-box" v-for="(item, index) of cancelList" :key="index">
                  <div class="list-tile">
                    <div class="list-tile-l">{{ item.logisticsOrderTime }}</div>
                    <div class="list-tile-r">已取消</div>
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
                    <!-- <div class="list-msg-r">
                      <button class="ghb-btn cancel">取消订单</button>
                      <button class="ghb-btn">支付订单</button>
                    </div> -->
                  </div>
                </div>

              </div>

            </swiper-item>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
