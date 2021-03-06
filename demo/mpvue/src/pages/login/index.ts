import { Vue, Component, Provide } from 'vue-property-decorator';
import btnVcode from '@/components/button/vcode.vue'; // mpvue目前只支持的单文件组件
import API from '../../api';
import { isInputEmpty, isPhoneNumber, showToastError, ghbRequest, getUserInfo_GHB } from '../../utils';
import { trim } from '../../utils/validate';
import { eventBus, ghbEvent } from '../eventbus';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    btnVcode
  }
})
class Login extends Vue {

  // 手机号码
  phone: string = '';
  // 短信验证码
  msgCode: string = '';

  isBtnClick: boolean = false;

  mounted() {
    this.phone = '';
    this.msgCode = '';
  }

  /**
   * 获取输入框的值
   * 
   * @param {string} value 输入的值
   * @param {string} type 类型
   * @memberof Login
   */
  getValue(value: string, type: string): void {
    this[type] = value;
  }

  /**
   * 获取短信验证码 + 短信验证码按钮倒计时
   * 
   * @param {*} oMsgCode 倒计时按钮组件对象
   * @returns {void} 
   * @memberof Login
   */
  getMsgCode(oMsgCode: any): void {
    if (isInputEmpty(this.phone, '手机号码不能为空')) return;
    if (isPhoneNumber(this.phone, '手机号码格式有误')) return;

    wx.showLoading({
      title: '短信发送中',
      mask: true
    });

    const PARAMS_VCODE_REQUEST: Vcode_Request = {
      type: 0,
      mobile: this.phone
    };

    ghbRequest({
      url: API.VCODE,
      method: 'POST',
      data: PARAMS_VCODE_REQUEST
    }).then((res: GHB_Response<Vcode_Response>) => {
      if (!res.data.mobile) {
        showToastError();
        return;
      } else {
        wx.showToast({
          title: '短信已发送'
        });
        // 启用倒计时
        oMsgCode.run();
        if (process.env.NODE_ENV !== 'production') {
          this.msgCode = res.data.code;
          // this.login();
        }
      }
    });

  }

  // 登录
  login(): void {
    console.log('登录');
    if (isInputEmpty(this.phone, '手机号码不能为空')) return;
    if (isInputEmpty(this.msgCode, '短信验证码不能为空')) return;

    wx.showLoading({
      title: '登陆中',
      mask: true
    });

    const PARAMS_LOGIN_REQUEST: Login_Request = {
      username: this.phone,
      validcode: this.msgCode,
      deviceId: 'wxmina',
      deviceType: 5
    };

    if (this.isBtnClick) return;
    this.isBtnClick = true;

    ghbRequest({
      url: API.LOGIN,
      method: 'POST',
      data: PARAMS_LOGIN_REQUEST
    }, true).then((res: GHB_Response<Login_Response>) => {
      if (res.data.token) {
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('mobile', this.phone);

        eventBus.$emit(ghbEvent.resetOrderList);

        // 获取 code
        wx.login({
          success: function (e: any) {
            const code: string = e.code;
            // 获取 openid 
            ghbRequest({
              url: API.JSCODE2SESSION,
              data: {
                code
              },
            }).then((res: any) => {
              wx.navigateBack();
            });
          }
        });
      } else {
        showToastError(res.data.message);
      }
      this.isBtnClick = false;
    }).catch(() => {
      this.isBtnClick = false;
    });

  }

  // 登录逻辑 + 提示授权
  loginAuth(e: any): void {
    console.log('登录逻辑 + 提示授权');
    this.login();
    getUserInfo_GHB().then((res: any) => {
      wx.setStorageSync('userInfo', res.userInfo);
    });
  }

  // 叫车规则跳 webview h5页面
  ghbRuleCallcar(): void {
    wx.navigateTo({
      url: '../webview/main?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/html/rule/user_callcar.html'
    });
  }

  ghbRuleService(): void {
    wx.navigateTo({
      url: '../webview/main?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/resources/agreements/agreement_use.html'
    });
  }
}

export default Login;
