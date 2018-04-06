import { Vue, Component } from 'vue-property-decorator';

@Component
class Me extends Vue {
    msg: string = ''

    created() {
        this.msg = '我页面';
    }

    mounted() { }

    onShow() {
        // console.log('onshow');
    }
}

export default Me
