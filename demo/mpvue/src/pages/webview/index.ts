import { Vue, Component, Provide } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
    @Provide() webUrl: string = '';

    onLoad(options: any) {
        // NOTE：webview的url要在小程序后台设置业务域名才能正常访问
        this.webUrl = options.webUrl;
    }
}

export default Index;
