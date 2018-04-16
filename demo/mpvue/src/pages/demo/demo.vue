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
      multiIndex: [0, 0, 0]
    };
  },
  onLoad() {
    console.log(this);
  },
  methods: {
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
                  this.$set(this.multiArray, 2, ['昆虫', '甲壳动物', '蛛形动物', '多足动物']);
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