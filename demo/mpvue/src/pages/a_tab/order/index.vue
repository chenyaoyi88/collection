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
        <div v-for="(item, index) in tabTitle" class="title-list-item" :key="index" :class="{active: currentIndex === index}" @click="tabClick(index)">{{ item.name }}</div>
        <div class="title-slider" 
          :style="{width: titleSlider.width + '%',transform: 'translate3d(' + titleSlider.left + '%,0,0)'}">
          <div class="slider"></div>
        </div>
      </div>

      <div class="tab-box">

        <!-- <orderlist 
          :tabIndex="0"
          :currentIndex="currentIndex"
          :isShowNone="ingListNone"
          :isShowNomore="ingListNomore"
          :dataList="ingList"
          @orderCancel="orderCancel"
          @orderPay="orderPay"
        ></orderlist> -->

        <!-- <orderlist 
          :tabIndex="1"
          :currentIndex="currentIndex"
          :isShowNone="finishListNone"
          :isShowNomore="finishListNomore"
          :dataList="finishList"
        ></orderlist> -->

        <!-- <orderlist 
          :tabIndex="2"
          :currentIndex="currentIndex"
          :isShowNone="cancelListNone"
          :isShowNomore="cancelListNomore"
          :dataList="cancelList"
        ></orderlist> -->
        
        <div class="tab" :class="{active: currentIndex === 0}"> 
          <noorder :isShow="ingListNone" text="您最近没有未完成订单"></noorder>
          <block v-if="ingList.length" v-for="(item, index) of ingList" :key="index">
              <div class="list-box" v-for="(order, orderIndex) of item" :key="orderIndex">
              <div class="list-tile">
                  <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                <div class="list-tile-r" :class="{'color-notice': order.paymentStatus == 0 || order.paymentStatus == 10}">{{ order.statusText }}</div>
              </div>
              <div class="list-content">
                  <div class="item order">
                    <div class="item-l">
                      <div class="item-point start"></div>
                      <div class="line s"></div>
                    </div>
                    <div class="item-r no-boder-top">
                      <div class="item-r-title">
                        <p class="item-info-c">{{order.senderAddressName}}</p>
                        <p class="item-info-b">{{order.senderSiteName + ' ' + (order.senderStreet || '')}}</p>
                      </div>
                    </div>
                  </div>

                  <block v-if="order.listOfHalfwayAddress.length" v-for="(halfway, halfwayIndex) of order.listOfHalfwayAddress" :key="halfwayIndex">
                    <div class="item-halfway">
                      <div class="item order">
                        <div class="item-l">
                          <div class="item-point mid"></div>
                          <div class="line m"></div>
                        </div>
                        <div class="item-r no-boder-top">
                          <div class="item-r-title">
                            <p class="item-info-c">{{ halfway.siteName }}</p>
                            <p class="item-info-b">{{ halfway.addressName }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </block>
                
                  <div class="item order">
                    <div class="item-l">
                      <div class="item-point end"></div>
                      <div class="line e"></div>
                    </div>
                    <div class="item-r no-boder-top">
                      <div class="item-r-title">
                        <p class="item-info-c">{{order.receiverAddressName}}</p>
                        <p class="item-info-b">{{order.receiverSiteName + ' ' + (order.receiverStreet || '')}}</p>
                      </div>
                    </div>
                  </div>

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
          <div class="list-nomore" v-if="ingListNomore">-- 没有更多数据了 --</div>
        </div>

        <div class="tab" :class="{active: currentIndex === 1}"> 
          <noorder :isShow="finishListNone" text="您最近没有已完成订单"></noorder>
          <block v-if="finishList.length" v-for="(item, index) of finishList" :key="index">
              <div class="list-box" v-for="(order, orderIndex) of item" :key="orderIndex">
              <div class="list-tile">
                  <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                  <div class="list-tile-r">{{ order.statusText }}</div>
              </div>
              <div class="list-content">
                  <div class="item order">
                    <div class="item-l">
                      <div class="item-point start"></div>
                      <div class="line s"></div>
                    </div>
                    <div class="item-r no-boder-top">
                      <div class="item-r-title">
                        <p class="item-info-c">{{order.senderAddressName}}</p>
                        <p class="item-info-b">{{order.senderSiteName + ' ' + (order.senderStreet || '')}}</p>
                      </div>
                    </div>
                  </div>

                  <block v-if="order.listOfHalfwayAddress.length" v-for="(halfway, halfwayIndex) of order.listOfHalfwayAddress" :key="halfwayIndex">
                    <div class="item-halfway">
                      <div class="item order">
                        <div class="item-l">
                          <div class="item-point mid"></div>
                          <div class="line m"></div>
                        </div>
                        <div class="item-r no-boder-top">
                          <div class="item-r-title">
                            <p class="item-info-c">{{ halfway.siteName }}</p>
                            <p class="item-info-b">{{ halfway.addressName }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </block>
                
                  <div class="item order">
                    <div class="item-l">
                      <div class="item-point end"></div>
                      <div class="line e"></div>
                    </div>
                    <div class="item-r no-boder-top">
                      <div class="item-r-title">
                        <p class="item-info-c">{{order.receiverAddressName}}</p>
                        <p class="item-info-b">{{order.receiverSiteName + ' ' + (order.receiverStreet || '')}}</p>
                      </div>
                    </div>
                  </div>

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
          <div class="list-nomore" v-if="finishListNomore">-- 没有更多数据了 --</div>
        </div>

        <div class="tab" :class="{active: currentIndex === 2}"> 
          <noorder :isShow="cancelListNone" text="您最近没有已取消订单"></noorder>
          <block v-if="cancelList.length" v-for="(item, index) of cancelList" :key="index">
              <div class="list-box" v-for="(order, orderIndex) of item" :key="orderIndex">
              <div class="list-tile">
                  <div class="list-tile-l">{{ order.logisticsOrderTime }}</div>
                  <div class="list-tile-r color-notice">{{ order.statusText }}</div>
              </div>
              <div class="list-content">
                  <div class="item order">
                    <div class="item-l">
                      <div class="item-point start"></div>
                      <div class="line s"></div>
                    </div>
                    <div class="item-r no-boder-top">
                      <div class="item-r-title">
                        <p class="item-info-c">{{order.senderAddressName}}</p>
                        <p class="item-info-b">{{order.senderSiteName + ' ' + (order.senderStreet || '')}}</p>
                      </div>
                    </div>
                  </div>

                  <block v-if="order.listOfHalfwayAddress.length" v-for="(halfway, halfwayIndex) of order.listOfHalfwayAddress" :key="halfwayIndex">
                    <div class="item-halfway">
                      <div class="item order">
                        <div class="item-l">
                          <div class="item-point mid"></div>
                          <div class="line m"></div>
                        </div>
                        <div class="item-r no-boder-top">
                          <div class="item-r-title">
                            <p class="item-info-c">{{ halfway.siteName }}</p>
                            <p class="item-info-b">{{ halfway.addressName }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </block>
                
                  <div class="item order">
                    <div class="item-l">
                      <div class="item-point end"></div>
                      <div class="line e"></div>
                    </div>
                    <div class="item-r no-boder-top">
                      <div class="item-r-title">
                        <p class="item-info-c">{{order.receiverAddressName}}</p>
                        <p class="item-info-b">{{order.receiverSiteName + ' ' + (order.receiverStreet || '')}}</p>
                      </div>
                    </div>
                  </div>

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
          <div class="list-nomore" v-if="cancelListNomore">-- 没有更多数据了 --</div>
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
