<template>
  <div class="idx-box">

    <div class="idx-main-box">
      <div class="idx-site-box">
        <item 
          iconType="point" 
          textTop="" 
          :textCenter="startPoint" 
          textBottom=""  
          v-on:itemClick="getPonit('start')"
          noBorderTop="true"
        ></item>
        <item 
          iconType="point" 
          pointType="end" 
          textTop="" 
          textCenter="选择收货地点" 
          textBottom=""  
          v-on:itemClick="getPonit('end')"
        ></item>
      </div>

      <div class="idx-cartype-box">
        <item 
          iconType="cartype" 
          textCenter="车型" 
          value="小型面包" 
          noBorderTop="true"
          v-on:itemClick="carTypeSelect"
        ></item>
        <div class="picker-time">
          <item 
            iconType="time" 
            textCenter="时间" 
            :value="bookingDate || '立即出发'"
          ></item>
          <picker class="picker" mode="multiSelector" @change="fnDateChange" @columnchange="fnDateColumnchange" :value="dateIndex" range-key="name" :range="dateArray">
              <view class="picker-cover"></view>
          </picker>
        </div>
        <item 
          iconType="extra" 
          textCenter="额外服务" 
          :value="sSelectedServices || '装卸搬运等额外服务'" 
          :valueColor="sSelectedServices.length ? 'dark' : 'light'"
          v-on:itemClick="extraServices"
        ></item>
        <item 
          itemType="goods"
          iconType="goods" 
          textCenter="货物信息"
          :value="goodsDesc || '货物信息，备注等'" 
          :valueColor="goodsDesc ? 'dark' : 'light'"
          v-on:itemClickGoods="fnGoodsInfo"
          v-on:itemInput="getClothsAmount($event.target.value)"
        ></item>

      </div>

    </div>

    <div class="idx-ft-box">
      <div class="idx-ft-price">
        <p class="price-text">￥--</p>
      </div>
      <div class="idx-ft-nextbtn">
        <button class="ghb-btn next-btn" @click="nextStep">下一步</button>
      </div>
    </div>

    <div class='maskLayer' v-if="isShowMask" :animation='aniSlideMaskData' @click='hideMask'></div>
    <div class='sliderContent' v-if="isShowMask" :animation='aniSlideContentData' :style="{transform: 'translateY('+300+'px)'}">
      <!-- <p>这里面是内容</p> -->
      <div class="slider-content-box">
        <div class="title-box">
          <div class="cancel" @click="sliderCancel">取消</div>
          <div class="title">附加服务</div>
          <div class="comfirm" @click="sliderComfirm">确定</div>
        </div>
        <div class="content-box">
            <div class="checkbox" v-for="(item, index) of additionalServicesList" :key="index">
              <div class="check-item" @click="checkboxChange(item, index)">
                <div class="name">{{ item.name }}</div>
                <div class="remark">{{item.remark}}</div>
                <div class="check">
                  <template v-if="item.selected">
                    <icon color="#f33650" size="20" type="success"></icon>
                  </template>
                  <template v-else>
                    <div class="uncheck"></div>
                  </template>
                  <!-- <icon color="#f33650" size="20" type="success"></icon> -->
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
