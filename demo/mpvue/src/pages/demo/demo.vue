<template>
  <div>
    <picker @change="bindPickerChange" :value="index" :range="array">
      <view class="picker">
        当前选择：{{array[index]}}
      </view>
    </picker>

    <view class="section">
      <view class="section__title">多列选择器</view>
      <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
        <view class="picker">
          自定义选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
        </view>
      </picker>
    </view>

    <button @click="testAni">测试动画</button>
    <div :animation="animationData" class="ani-test"></div>

    
    <button @click="showSlider">测试遮罩层动画</button>
    
    <div class='maskLayer' v-if="isShowMask" :animation='aniSlideMaskData' @click='hideMask'></div>
    <div class='sliderContent' v-if="isShowMask" :animation='aniSlideContentData' :style="{transform: 'translateY('+300+'px)'}">
      <!-- <p>这里面是内容</p> -->
      <div class="slider-content-box">
        <div class="title-box">
          <div class="cancel">取消</div>
          <div class="title">附加服务</div>
          <div class="comfirm">确定</div>
        </div>
        <div class="content-box">
          <checkbox-group @change="checkboxChange">
            <div class="checkbox" v-for="(item, index) of additionalServicesList" :key="index">
              <div class="check-item">
                <div class="name">{{ item.name }}</div>
                <div class="remark">{{item.remark}}</div>
                <div class="check"><checkbox :value="item.name" :checked="item.checked"/></div>
              </div>
            </div>
          </checkbox-group>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      array: ['A', 'B', 'C'],
      multiArray: [
        ['无脊柱动物', '脊柱动物'],
        ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
        ['猪肉绦虫', '吸血虫']
      ],
      multiIndex: [0, 0, 0],
      animation: null,
      animationData: {},

      additionalServicesList: [
        {
          id: 8,
          name: '推车',
          remark: '需要司机提供推车设备'
        },
        {
          id: 9,
          name: '搬运',
          remark: '需要司机提供搬运服务，价格面议'
        },
        {
          id: 10,
          name: '代收',
          remark: '需要司机提供代收货款的服务，价格方式面议'
        }
      ],

      isShowMask: false,

      aniSlideMask: null,
      aniSlideMaskData: null,

      aniSlideContent: null,
      aniSlideContentData: null
    };
  },
  onLoad() {
    console.log(this);
    // this.showSlider();
  },
  methods: {
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：', e.target.value);
    },
    showSlider() {
      const animationMask = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      });
      const animationContent = wx.createAnimation({
        duration: 300,
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
    hideMask() {
      this.aniSlideMask.opacity(0).step();
      this.aniSlideContent.translateY(300).step();
      this.aniSlideMaskData = this.aniSlideMask.export();
      this.aniSlideContentData = this.aniSlideContent.export();
      setTimeout(() => {
        this.isShowMask = false;
      }, 300);
    },
    testAni() {
      // const that = this;

      const animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      });

      this.animation = animation;

      this.rotateAndScale();

      // animation
      //   .scale(2, 2)
      //   .rotate(45)
      //   .step();

      // this.animationData = animation.export();

      // setTimeout(() => {
      //   animation.translate(30).step();
      //   that.animationData = animation.export();
      // }, 1000);
    },
    rotateAndScale() {
      // 旋转同时放大
      this.animation
        .rotate(45)
        .scale(2, 2)
        .step();

      this.animationData = this.animation.export();
    },
    rotateThenScale() {
      // 先旋转后放大
      this.animation.rotate(45).step();
      this.animation.scale(2, 2).step();

      this.animationData = this.animation.export();
    },
    rotateAndScaleThenTranslate() {
      // 先旋转同时放大，然后平移
      this.animation
        .rotate(45)
        .scale(2, 2)
        .step();
      this.animation.translate(100, 100).step({ duration: 1000 });

      this.animationData = this.animation.export();
    },
    bindPickerChange(e) {
      this.index = e.target.value;
    },
    bindMultiPickerColumnChange(e) {
      console.log('修改的列为', e.target.column, '，值为', e.target.value);

      this.$set(this.multiIndex, e.target.column, e.target.value);

      switch (e.target.column) {
        case 0:
          switch (this.multiIndex[0]) {
            case 0:
              this.$set(this.multiArray, 1, [
                '扁性动物',
                '线形动物',
                '环节动物',
                '软体动物',
                '节肢动物'
              ]);
              this.$set(this.multiArray, 2, ['猪肉绦虫', '吸血虫']);
              break;
            case 1:
              this.$set(this.multiArray, 1, ['鱼', '两栖动物', '爬行动物']);
              this.$set(this.multiArray, 2, ['鲫鱼', '带鱼']);
              break;
            default:
          }
          this.$set(this.multiIndex, 1, 0);
          this.$set(this.multiIndex, 2, 0);
          break;
        case 1:
          switch (this.multiIndex[0]) {
            case 0:
              switch (this.multiIndex[1]) {
                case 0:
                  this.$set(this.multiArray, 2, ['猪肉绦虫', '吸血虫']);
                  break;
                case 1:
                  this.$set(this.multiArray, 2, ['蛔虫']);
                  break;
                case 2:
                  this.$set(this.multiArray, 2, ['蚂蚁', '蚂蟥']);
                  break;
                case 3:
                  this.$set(this.multiArray, 2, ['河蚌', '蜗牛', '蛞蝓']);
                  break;
                case 4:
                  this.$set(this.multiArray, 2, [
                    '昆虫',
                    '甲壳动物',
                    '蛛形动物',
                    '多足动物'
                  ]);
                  break;
                default:
              }
              break;
            case 1:
              switch (this.multiIndex[1]) {
                case 0:
                  this.$set(this.multiArray, 2, ['鲫鱼', '带鱼']);
                  break;
                case 1:
                  this.$set(this.multiArray, 2, ['青蛙', '娃娃鱼']);
                  break;
                case 2:
                  this.$set(this.multiArray, 2, ['蜥蜴', '龟', '壁虎']);
                  break;
                default:
              }
              break;
            default:
          }
          this.$set(this.multiIndex, 2, 0);
          break;
        default:
      }
    }
  }
};
</script>

<style lang="scss">
.ani-test {
  width: 100px;
  height: 100px;
  background-color: red;
}

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
  // transform: translateY(300px);
}

.slider-content-box {
  .title-box {
    display: flex;
    flex-direction: row;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #eaeaea;
    font-size: 16px;
    .cancel {
      width: 100px;
      color: #ccc;
    }
    .title {
      flex: 1;
    }
    .comfirm {
      width: 100px;
      color: #f13744;
    }
  }
  .content-box {
    .checkbox {
      padding: 10px;
      .check-item {
        display: flex;
        flex-direction: row;
        font-size: 16px;
        .name {
          margin-right: 10px;
        }
        .remark {
          flex: 1;
          font-size: 13px;
          color: #ccc;
          display: flex;
          align-items: center;
        }
        .check {
        }
      }
    }
  }
}
</style>
