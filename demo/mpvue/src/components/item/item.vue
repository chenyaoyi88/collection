<template>
  <div class="item" @click="itemClick" :class="itemClass">

    <template v-if="iconType">
      <div class="item-l">
        <template v-if="!icon && (point === 'start' || point ==='end')">
          <div v-if="!icon" class="item-point" :class="point"></div>
          <div v-if="point === 'start' && !isStartPointlineHide" class="line s"></div>
          <div v-if="point === 'end' && !isEndPointlineHide" class="line e"></div>
        </template>
        <template v-if="icon">
          <img v-if="icon" class="item-icon" :src="icon" mode="aspectFit">
        </template>
      </div>
    </template>

    <template v-else>
      <div class="item-l-none"></div>
    </template>

    <!-- 输入框专用 -->
    <template v-if="itemType === 'input'">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <input class="item-input" :type="inputType || 'text'" :placeholder="inputPlc" placeholder-style="color:#b2b2b2" :value="value" @input="itemInput($event)" :maxlength="maxlength || 140">
      </div>
    </template>
    
    <!-- 货物信息专用 -->
    <template v-else-if="itemType === 'goods'">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <div class="goods-box">
          <div class="goods-title">{{ textCenter }}</div>
          <div class="goods-amount-box">
            <input placeholder-style="color:#b2b2b2" placeholder="条数" type="number" @input="itemInput($event)">
          </div>
          <div class="goods-info-box" :class="{light: valueColor === 'light' ? true : false}" @click="itemClickGoods">{{ value }}</div>
        </div>
        <div v-if="!isArrowHide" class="item-r-arrow">
            <img class="img-item-arrow" :src="arrow">
        </div>
      </div>
    </template>
    
    <!-- 自定义内容专用（TODO：暂时不知道如何添加 slot 插入内容的事件） -->
    <template v-else-if="itemType === 'custom'">
      <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
        <slot></slot>
        <div v-if="!isArrowHide" class="item-r-arrow">
            <img class="img-item-arrow" :src="arrow">
        </div>
      </div>
    </template>

    <!-- 其他常用共用内容 -->
    <template v-else>
        <div class="item-r" :class="{'no-boder-top': noBorderTop ? true : false}">
          <div class="item-r-title">
            <p v-if="textTop" class="item-info-t">{{ textTop }}</p>
            <p v-if="textCenter" class="item-info-c" :class="{'text-light': textLight}">{{ textCenter }}</p>
            <p v-if="textBottom" class="item-info-b">{{ textBottom }}</p>
          </div>
          <div class="item-r-value">
              <p :class="{light: valueColor === 'light' ? true : false}">{{ value }}</p>
          </div>
          <div v-if="!isArrowHide" class="item-r-arrow">
              <img class="img-item-arrow" :src="arrow">
          </div>
        </div>
    </template>


  </div>
</template>

<script>
import arrow from './icon/arrow.png';
import cartype from './icon/cartype.png';
import time from './icon/time.png';
import goods from './icon/goods.png';
import extra from './icon/extra.png';
import mobile from './icon/mobile.png';
import contact from './icon/contact.png';

export default {
  props: [
    // item style
    'itemClass',
    // item 类型
    'itemType',
    // input 的 placeholder
    'inputPlc',
    // input 的类型
    'inputType',
    // input 的最大输入位数
    'maxlength',
    // item 的 icon 类型
    'iconType',
    // icon 是原点的 item 类型
    'pointType',
    // 是否显示开始原点那条线
    'isStartPointlineHide',
    // 是否显示结束原点那条线
    'isEndPointlineHide',
    // item 三行文字的顶部文字
    'textTop',
    // item 三行文字的中间文字
    'textCenter',
    // item 三行文字的底部文字
    'textBottom',
    // input 的值
    'value',
    // item 右侧文字颜色（light 或者 dark）
    'valueColor',
    // 是否显示 item 的顶部边线
    'noBorderTop',
    // 是否隐藏右侧箭头
    'isArrowHide',
    'textLight'
  ],
  data() {
    return {
      arrow,
      cartype,
      time,
      extra,
      icon: '',
      point: ''
    };
  },
  methods: {
    itemClick() {
      this.$emit('itemClick', this);
    },
    itemInput(e) {
      this.$emit('itemInput', e);
    },
    itemPickerChange(e) {
      this.$emit('itemPickerChange', e);
    },
    itemPickerColumnchange(e) {
      this.$emit('itemPickerColumnchange', e);
    },
    itemPickerCancel(e) {
      this.$emit('itemPickerCancel', e);
    },
    itemClickGoods(e) {
      this.$emit('itemClickGoods', e);
    }
  },

  created() {
    if (this.iconType) {
      switch (this.iconType) {
        case 'cartype':
          this.icon = cartype;
          break;
        case 'time':
          this.icon = time;
          break;
        case 'extra':
          this.icon = extra;
          break;
        case 'mobile':
          this.icon = mobile;
          break;
        case 'goods':
          this.icon = goods;
          break;
        case 'contact':
          this.icon = contact;
          break;
        case 'point':
          this.icon = '';
          switch (this.pointType) {
            case 'start':
              this.point = 'start';
              break;
            case 'end':
              this.point = 'end';
              break;
            default:
              this.point = 'start';
          }
          // if (!this.textTop && !this.textBottom) {
          //   this.textLight = true;
          // }
          break;
        default:
          this.icon = '';
      }
    }
  }
};
</script>

<style lang="scss">
@import './item.scss';
</style>

