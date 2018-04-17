import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackSetData, ghbRequest, zerofillBack } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
    goodsDesc: string = '';

    getGoodsDesc(value: string) {
        console.log(value);
        this.goodsDesc = value;
    }

    submit() {
        goBackSetData({
            goodsDesc: this.goodsDesc
        }, 2);
        wx.navigateBack();
    }
}

export default Index;
