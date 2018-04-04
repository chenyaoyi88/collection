import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackGetData } from '../../../utils';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
    @Provide() text: string = '123';

    // computed
    get msg() {
        return this.$store.state.msg;
    }

    carTypeSelect() {
        console.log(123);
        const url = '../../login/main';
        wx.navigateTo({ url });
    }

    goBacksendParams() {
        const url = '../../login/main';
        wx.navigateTo({ url });
    }

    nextStep() {
        // console.log(this.msg);
    }

    onShow() { // 小程序 hook
        console.log('onShow');
    }

    mounted() { // vue hook
        console.log('mounted');
    }
}

export default Index
