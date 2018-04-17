<template>
  <div>
      <div class='maskLayer' v-if="isShowMask" :animation='aniSlideMaskData' @click='hideSlider'></div>
      <div class='sliderContent' v-if="isShowMask" :animation='aniSlideContentData' :style="{transform: 'translateY('+contentHeight+'px)'}">
      </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 300
    },
    contentHeight: {
      type: Number,
      default: 300
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowMask: false,
      aniSlideMask: null,
      aniSlideMaskData: null,
      aniSlideContent: null,
      aniSlideContentData: null
    };
  },
  watch: {
    isShow(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (newValue) {
        this.showSlider();
      } else {
        this.hideSlider();
      }
    }
  },
  methods: {
    showSlider() {
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
        this.aniSlideMask.opacity(0.2).step();
        this.aniSlideContent.translateY(0).step();
        this.aniSlideMaskData = this.aniSlideMask.export();
        this.aniSlideContentData = this.aniSlideContent.export();
      }, 0);
    },
    hideSlider() {
      this.aniSlideMask.opacity(0).step();
      this.aniSlideContent.translateY(this.contentHeight).step();
      this.aniSlideMaskData = this.aniSlideMask.export();
      this.aniSlideContentData = this.aniSlideContent.export();
      setTimeout(() => {
        this.isShowMask = false;
      }, this.duration);
    }
  }
};
</script>

<style lang="scss">
.maskLayer {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0;
  overflow: hidden;
  z-index: 1000;
  color: #fff;
}

.sliderContent {
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: #fff;
}
</style>
