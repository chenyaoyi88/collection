import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue';
import { ghbRequest, showToastError } from '../../../utils';
import API from '../../../api';
import avantarImg from '../../../../static/images/avantar.png';

@Component({
    components: {
        item
    }
})
class Me extends Vue {
    isLogin: boolean = false;
    userInfo: any = {};
    mobile: string = '';
    avantar: any = avantarImg;

    onShow() {
        const _this = this;
        const token = wx.getStorageSync('token');
        this.isLogin = token ? true : false;
        if (this.isLogin) {
            this.mobile = wx.getStorageSync('mobile');
            wx.getUserInfo({
                lang: 'zh_CN',
                success: function (res: WX_UserInfo) {
                    _this.userInfo = res.userInfo;
                    _this.avantar = _this.userInfo.avatarUrl;
                }
            });
        } else {
            this.mobile = '点击登录';
            this.avantar = avantarImg;
        }
    }

    gotoLogin() {
        if (!this.isLogin) {
            wx.navigateTo({
                url: '../../login/main'
            });
        }
    }

    // 收费标准 webview h5页面
    ghbLogisticFee(): void {
        wx.navigateTo({
            url: '../../webview/main?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/html/logisticFee.html'
        });
    }

    logout() {
        ghbRequest({
            url: API.LOGOUT,
            method: 'DELETE'
        }).then((res: GHB_Response<{}>) => {
            if (res.statusCode === 200) {

                this.$store.commit('isIndexResetChange', {
                    isIndexReset: true
                });

                wx.switchTab({
                    url: "../index/main"
                });
                wx.removeStorageSync('token');
                wx.removeStorageSync('mobile');
            } else {
                showToastError('操作失败，请稍后再试');
            }
        });
    }
}

export default Me
