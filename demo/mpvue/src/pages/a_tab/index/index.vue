<template>
  <div class="idx-box"> 
    <div class="idx-main-box">
      <div class="idx-site-box">
        <item 
          iconType="point" 
          :textTop="(startInfo.userName || '') + ' ' + (startInfo.mobile || '')" 
          :textCenter="startInfo.name || '选择发货地点'" 
          :textBottom="startInfo.address || ''" 
          v-on:itemClick="fnGetPonit('start', startInfo)"
          noBorderTop="true"
          :textLight="startInfo.name ? false : true"
        ></item>
        <item 
          iconType="point" 
          pointType="end" 
          :textTop="(endInfo.userName || '') + ' ' + (endInfo.mobile || '')" 
          :textCenter="endInfo.name || '选择收货地点'" 
          :textBottom="endInfo.address || ''"  
          v-on:itemClick="fnGetPonit('end', endInfo)"
          :textLight="endInfo.name ? false : true"
        ></item>
      </div>

      <div class="idx-cartype-box">
        <item 
          iconType="cartype" 
          textCenter="车型" 
          :value="carSelected.name || '请选择车型'" 
          noBorderTop="true"
          v-on:itemClick="fnCarTypeSelect"
        ></item>

        <itemTimePicker v-on:getDateValue="fnGetDateValue"></itemTimePicker>

        <item 
          iconType="extra" 
          textCenter="额外服务" 
          :value="sSelectedServices || '装卸搬运等额外服务'" 
          :valueColor="sSelectedServices.length ? 'dark' : 'light'"
          v-on:itemClick="fnExtraServices"
        ></item>

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

        <button @click="fnResetAll">重置</button>

        <!-- <item 
          itemType="goods"
          iconType="goods" 
          textCenter="货物信息"
          :value="goodsRemark || '货物信息，备注等'" 
          :amount="clothsAmount"
          :valueColor="goodsRemark ? 'dark' : 'light'"
          v-on:itemClickGoods="fnGetGoodsInfo"
          v-on:itemInput="fnGetClothsAmount($event.target.value)"
        ></item> -->

      </div>

    </div>

    <div class="idx-ft-box">
      <div class="idx-ft-price">
        <p class="price-text">￥{{ (costs && costs.amount) || '--'}}</p>
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
      v-on:hideSlider="fnHideSlider"
      v-on:checkboxChange="fnCheckboxChange"
    ></sliderSelect>

  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>

<style lang="scss">
@import './index.scss';
</style>
