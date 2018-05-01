import { Vue, Component } from 'vue-property-decorator';
import { goBackSetData, showToastError } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
  goodsRemark: string = '';

  onLoad(options: { goodsRemark: string }) {
    this.goodsRemark = options.goodsRemark;
  }

  getGoodsRemark(value: string) {
    this.goodsRemark = value;
  }

  submit() {
    if (!/\S/.test(this.goodsRemark)) {
      showToastError('货物信息、备注不能为空');
      return;
    }
    goBackSetData(
      {
        goodsRemark: this.goodsRemark
      },
      2
    );
    wx.navigateBack();
  }
}

export default Index;
