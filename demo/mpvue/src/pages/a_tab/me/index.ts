import { Vue, Component, Provide } from 'vue-property-decorator';
import item from '@/components/item/item.vue';

@Component({
    components: {
        item
    }
})
class Me extends Vue {
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
