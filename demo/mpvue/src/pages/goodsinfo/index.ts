import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackSetData, ghbRequest, zerofillBack } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
    goodsRemark: string = '';

    getGoodsRemark(value: string) {
        this.goodsRemark = value;
    }

    submit() {
        goBackSetData({
            goodsRemark: this.goodsRemark
        }, 2);
        wx.navigateBack();
    }
}

export default Index;
