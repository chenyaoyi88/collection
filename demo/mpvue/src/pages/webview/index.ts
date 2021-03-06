import { Vue, Component, Provide } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {
    @Provide() webUrl: string = '';

    onLoad(options: any) {
        this.webUrl = options.webUrl;
    }
}

export default Index;
