import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest } from '../../../utils';
import API from '../../../api';

@Component({
    components: {
        item
    }
})
class Me extends Vue {
    @Provide() isLogin: boolean = false;
    @Provide() userInfo: any = {};
    @Provide() mobile: string = '';

    mounted() {
        const _this = this;
        wx.getUserInfo({
            lang: 'zh_CN',
            success: function (res: WX_UserInfo) {
                _this.userInfo = res.userInfo;
            }
        })
    }

    onShow() {
        const token = wx.getStorageSync('token');
        this.mobile = wx.getStorageSync('mobile');
        this.isLogin = token ? true : false;
    }

    gotoLogin() {
        wx.navigateTo({
            url: '../../login/main'
        });
    }

    // 收费标准 webview h5页面
    ghbLogisticFee(): void {
        wx.navigateTo({
            url: '../../webview/main?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/html/logisticFee.html'
        });
    }

    logout() {
        // console.log('退出');

        ghbRequest({
            url: API.LOGOUT,
            method: 'DELETE'
        }).then((res: GHB_Response<{}>) => {
            console.log(res);
            if (res.statusCode === 200) {
                wx.switchTab({
                    url: "../index/main"
                });
                wx.removeStorageSync('token');
                wx.removeStorageSync('mobile');
            } else {
                wx.showToast({
                    title: '操作失败'
                });
            }
        });
    }
}

export default Me
