import { Vue, Component, Provide } from 'vue-property-decorator';
import { btnVcode } from '../../components'; // mpvue目前只支持的单文件组件
import API from '../../api';
import { isInputEmpty } from '../../utils';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    btnVcode
  }
})
class Login extends Vue {
  @Provide() phone: string = '';
  @Provide() imgCode: string = '';
  @Provide() msgCode: string = '';

  getValue(value: string, type: string) {
    this[type] = value;
  }
  // 获取图形验证码
  getImgCode() {
    // 请求获取图形验证码
    // console.log('请求获取图形验证码');
  }
  // 获取短信验证码 + 短信验证码按钮倒计时
  getMsgCode(oMsgCode: any) {
    if (isInputEmpty(this.msgCode, '您输入的短信验证码格式有误')) return;

    wx.showLoading({
      title: '加载中'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '短信已发送'
      });
      oMsgCode.run();
    }, 1000);
  }
  // 登录
  login() {
    if (isInputEmpty(this.phone, '手机号码不能为空')) return;
    if (isInputEmpty(this.imgCode, '图形验证码不能为空')) return;
    if (isInputEmpty(this.msgCode, '短信验证码不能为空')) return;

    wx.showLoading({
      title: '加载中'
    });

    setTimeout(() => {}, 1000);
  }
  // 请求数据
  created() {
    this.getImgCode();
  }
}

export default Login;
