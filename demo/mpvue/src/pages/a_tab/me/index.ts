import { Vue, Component, Provide } from 'vue-property-decorator';

@Component
class Me extends Vue {
    msg: string = '我页面';
    @Provide() isLogin: boolean = false;

    onShow() {
        const token = wx.getStorageSync('token');
        this.isLogin = token ? true : false;
    }

    gotoLogin() {
        wx.navigateTo({
            url: '../../login/main'
        });
    }
}

export default Me
