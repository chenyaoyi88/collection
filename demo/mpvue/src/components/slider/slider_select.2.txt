<template>
  <div>
    <div class='maskLayer' v-if="isShowMask" :animation='aniSlideMaskData' @click='hideSlider'></div>
    <div class='sliderContent' v-if="isShowMask" :animation='aniSlideContentData' :style="{transform: 'translateY('+300+'px)'}">
      <!-- <p>这里面是内容</p> -->
      <div class="slider-content-box">
        <div class="slider-title-box">
          <div class="cancel" @click="sliderCancel">取消</div>
          <div class="title">{{ title }}</div>
          <div class="comfirm" @click="sliderComfirm">确定</div>
        </div>
        <div class="slider-content">
          
          <template v-if="type === 'checkbox'">
            <div class="slider-checkbox" v-for="(item, index) of dataList" :key="index" @click="checkboxChange(item, index)">
              <div class="slider-check-item">
                <div class="name">{{ item[name] }}</div>
                <div class="remark">{{ item[value] }}</div>
                <div class="check">
                  <template v-if="item.selected">
                    <icon color="#f33650" size="20" type="success"></icon>
                  </template>
                  <template v-else>
                    <div class="uncheck"></div>
                  </template>
                </div>
              </div>
            </div>
          </template>

          <template v-if="type === 'radio'">
            <div class="slider-radio" v-for="(item, index) in dataList" :key="item.id" @click="radioChange(item, index)">
              <div class="slider-check-item">
                <div class="name">{{ item[name] }}</div>
                <div class="check">
                  <template v-if="item.selected">
                    <icon color="#f33650" size="20" type="success"></icon>
                  </template>
                  <template v-else>
                    <div class="uncheck"></div>
                  </template>
                </div>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * NOTE：目前 mpvue slot插槽子组件添加事件响应不了，因此暂时把整个底部滑动也相关业务的部分耦合封装在一起，等可以添加事件之后再抽象。
 *
 */
export default {
  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    title: {
      type: String,
      default: '附加服务'
    },
    dataList: {
      type: Array,
      default: []
    },
    isSliderShow: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      isShowMask: false,
      aniSlideMask: null,
      aniSlideMaskData: null,
      aniSlideContent: null,
      aniSlideContentData: null,
      isLock: false,
      duration: 300,
      currentIndex: null
    };
  },
  watch: {
    isSliderShow(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          this.showSlider();
        } else {
          this.hideSlider();
        }
      }
    }
  },
  methods: {
    showSlider() {
      wx.hideTabBar({
        duration: true
      });
      const animationMask = wx.createAnimation({
        duration: this.duration,
        timingFunction: 'ease'
      });
      const animationContent = wx.createAnimation({
        duration: this.duration,
        timingFunction: 'ease'
      });

      this.aniSlideMask = animationMask;
      this.aniSlideContent = animationContent;

      this.isShowMask = true;

      setTimeout(() => {
        this.aniSlideMask.opacity(0.5).step();
        this.aniSlideContent.translateY(0).step();
        this.aniSlideMaskData = this.aniSlideMask.export();
        this.aniSlideContentData = this.aniSlideContent.export();
      }, 50);

      this.isLock = true;
      setTimeout(() => {
        this.isLock = false;
      }, this.duration);
    },

    hideSlider() {
      if (this.isLock) return;
      this.aniSlideMask.opacity(0).step();
      this.aniSlideContent.translateY(300).step();
      this.aniSlideMaskData = this.aniSlideMask.export();
      this.aniSlideContentData = this.aniSlideContent.export();
      setTimeout(() => {
        this.isShowMask = false;
        this.$emit('hideSlider', this.isShowMask);
        wx.showTabBar({
          duration: true
        });
      }, this.duration);
    },

    sliderCancel() {
      this.hideSlider();
    },

    sliderSelect(index) {
      if (this.type === 'checkbox') {
        this.aSelectedServices = [];
        this.sSelectedServices = '';
        for (let i = 0; i < this.dataList.length; i += 1) {
          if (this.dataList[i].selected) {
            this.sSelectedServices += `${this.dataList[i].name} `;
            this.aSelectedServices.push(this.dataList[i]);
          }
        }
      } else if (this.type === 'radio') {
        for (let i = 0; i < this.dataList.length; i += 1) {
          this.$set(this.dataList[i], 'selected', false);
        }
        this.$set(this.dataList[index], 'selected', true);
      }
    },

    // 底部滑动确定（TODO：抽离出来作为独立组件逻辑）
    sliderComfirm() {
      // this.sliderSelect();
      this.hideSlider();

      if (this.type === 'checkbox') {
        this.$emit(
          'sliderComfirm',
          this.aSelectedServices,
          this.sSelectedServices
        );
      } else if (this.type === 'radio') {
        this.$emit('sliderComfirm', this.dataList[this.currentIndex]);
      }
    },

    checkboxChange(item, index) {
      this.$set(
        this.dataList[index],
        'selected',
        !this.dataList[index].selected
      );
      this.currentIndex = index;
      this.sliderSelect();
      this.$emit(
        'checkboxChange',
        this.aSelectedServices,
        this.sSelectedServices
      );
    },
    radioChange(item, index) {
      if (this.currentIndex === index) return;
      this.$set(this.dataList[index], 'selected', true);
      this.currentIndex = index;
      this.sliderSelect(index);
      this.$emit('radioChange', this.dataList[index]);
    }
  }
};
</script>

<style lang="scss" scope>
@import './slider_select.scss';
</style>

