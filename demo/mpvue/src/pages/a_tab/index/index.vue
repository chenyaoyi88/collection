<template>
  <div class="idx-box"> 
    <div class="idx-main-box">
      <div class="idx-site-box">
        
        <item 
          iconType="point" 
          :textTop="(startInfo.name || '') + ' ' + (startInfo.mobile || '')" 
          :textCenter="startInfo.siteName || '请输入始发地'" 
          :textBottom="startInfo.address || ''" 
          @itemClick="fnGetPonit('start', startInfo, -1)"
          noBorderTop="true"
          :textLight="startInfo.name ? false : true"
          isArrowHide="true"
        ></item>

        <block v-for="(item, index) in aHalfwaysList" :key="index">
          <item 
            iconType="point" 
            :pointType="(index === aHalfwaysList.length-1)? 'end' : 'mid'" 
            :textTop="(item.contact || '') + ' ' + (item.phone || '')" 
            :textCenter="item.siteName || '请输入目的地'" 
            :textBottom="item.addressName || ''"  
            :textLight="true"
            isArrowHide="true"
            :isShowClose="aHalfwaysList.length > 1 ? true : false"
            @itemClick="fnGetPonit('des', item, index)"
            @itemClickClose="fnItemDelete(index)"
          ></item>
        </block>

        <view class="index-halfway-box" @click="addHalfways">
          <img class="index-halfway-icon" :src="img.imgAdd" alt="" mode="aspectFit">
          <view class="index-halfway-text">添加配送地址</view>
        </view>
      </div>

      <div class="idx-cartype-box">
        <item 
          iconType="cartype" 
          textCenter="车型" 
          :value="carSelected.name || '请选择车型'" 
          noBorderTop="true"
          @itemClick="fnCarTypeSelect"
        ></item>

        <itemTimePicker @getDateValue="fnGetDateValue"></itemTimePicker>

        <item 
          iconType="extra" 
          textCenter="额外服务" 
          :value="sSelectedServices || '装卸搬运等额外服务'" 
          :valueColor="sSelectedServices.length ? 'dark' : 'light'"
          @itemClick="fnExtraServices"
        ></item>

        <template v-if="isLogin">
          <item 
            iconType="coupon" 
            textCenter="优惠券" 
            :value="couponInfo.name || '请选择'" 
            :valueColor="couponInfo.name ? 'dark' : 'light'"
            @itemClick="fnCouponSelect"
          ></item>
        </template>

        <div class="item">
          <div class="item-l">
            <img class="item-icon" :src="img.imgGoods" mode="aspectFit">
          </div>
          <div class="item-r">
            <div class="goods-box">
              <div class="goods-title">货物信息</div>
              <div class="goods-amount-box">
                <input placeholder-style="color:#b2b2b2" placeholder="条数" type="number" @input="fnGetClothsAmount($event.target.value)" :value="clothsAmount">
              </div>
              <div class="goods-info-box" :class="{light: goodsRemark ? false : true}" @click="fnGetGoodsInfo">{{ goodsRemark || '货物信息，备注等' }}</div>
            </div>
            <div class="item-r-arrow">
                <img class="img-item-arrow" :src="img.imgArrow">
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="idx-ft-box">
      <div class="idx-ft-price">
        <div class="price-text">
          <span class="price">￥{{ (costs && costs.amount) || '--'}}
            <span v-show="couponInfo.priceValue" class="coupon-text">（已优惠{{couponInfo.priceValue || '--'}}元）</span>
          </span>
        </div>
      </div>
      <div class="idx-ft-nextbtn">
        <button class="ghb-btn next-btn" @click="fnNextStep">下一步</button>
      </div>
    </div>

    <sliderSelect 
      :dataList="additionalServicesList" 
      :isSliderShow="selectSlider"
      name="name"
      value="remark"
      @hideSlider="fnHideSlider"
      @checkboxChange="fnCheckboxChange"
    ></sliderSelect>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>