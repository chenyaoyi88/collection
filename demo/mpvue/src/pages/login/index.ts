import { Vue, Component, Provide } from 'vue-property-decorator';
import btnVcode from '@/components/button/vcode.vue'; // mpvue目前只支持的单文件组件
import API from '../../api';
import { isInputEmpty, isPhoneNumber, showToastError, ghbRequest } from '../../utils';
import { trim } from '../../utils/validate';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    btnVcode
  }
})
class Login extends Vue {
  // 手机号码
  @Provide() phone: string = '';
  // 短信验证码
  @Provide() msgCode: string = '';

  getValue(value: string, type: string) {
    this[type] = value;
  }

  created() {
    // ghbRequest().then((res: any) => {
    //   console.log(res);
    // });
  }

  // 获取短信验证码 + 短信验证码按钮倒计时
  getMsgCode(oMsgCode: any) {
    const _this = this;
    if (isInputEmpty(this.phone, '手机号码不能为空')) return;
    if (isPhoneNumber(this.phone, '手机号码格式有误')) return;

    wx.showLoading({
      title: '加载中'
    });

    const params_vcode_request: Vcode_Request = {
      type: 0,
      mobile: _this.phone
    };

    ghbRequest({
      url: API.VCODE,
      method: 'POST',
      data: params_vcode_request
    }).then((res: GHB_Response<Vcode_Response>) => {
      if (!res.data.mobile) {
        showToastError();
        return;
      } else {
        wx.showToast({
          title: '短信已发送'
        });
        oMsgCode.run();
        if (process.env.NODE_ENV !== 'production') {
          _this.msgCode = res.data.code;
        }
      }
    });

    // wx.request({
    //   url: API.VCODE,
    //   method: 'POST',
    //   data: params_vcode_request,
    //   success: function (res: GHB_Response<Vcode_Response>) {
    //     if (!res.data.mobile) {
    //       showToastError();
    //       return;
    //     } else {
    //       wx.showToast({
    //         title: '短信已发送'
    //       });
    //       oMsgCode.run();
    //       if (process.env.NODE_ENV !== 'production') {
    //         _this.msgCode = res.data.code;
    //       }
    //     }
    //   },
    //   fail: function (err: any) {
    //     console.log(err);
    //     showToastError();
    //   },
    //   complete: function () {
    //     wx.hideLoading();
    //   }
    // });

  }

  // 登录
  login() {
    if (isInputEmpty(this.phone, '手机号码不能为空')) return;
    if (isInputEmpty(this.msgCode, '短信验证码不能为空')) return;

    wx.showLoading({
      title: '登陆中'
    });

    const params_login_request: Login_Request = {
      username: this.phone,
      validcode: this.msgCode,
      deviceId: 'wxmina',
      deviceType: 1
    };

    ghbRequest({
      url: API.LOGIN,
      method: 'POST',
      data: params_login_request
    }).then((res: GHB_Response<Login_Response>) => {
      if (res.data.token) {
        console.log('ojbk');
        wx.setStorageSync('token', res.data.token);
        wx.navigateBack();
      } else {
        showToastError(res.data.message);
      }
    });

    // wx.request({
    //   url: API.LOGIN,
    //   method: 'POST',
    //   data: params_login_request,
    //   success: function (res: GHB_Response<Login_Response>) {
    //     if (res.data.token) {
    //       console.log('ojbk');
    //       wx.setStorageSync('token', res.data.token);
    //       wx.navigateBack();
    //     } else {
    //       showToastError(res.data.message);
    //     }
    //   },
    //   fail: function (err: any) {
    //     console.log(err);
    //     showToastError();
    //   },
    //   complete: function () {
    //     wx.hideLoading();
    //   }
    // });
  }

  ghbRule() {
    wx.navigateTo({
      url: '../webview/main?webUrl=' + 'https://www.guanghuobao.com/static/app-h5/resources/agreements/agreement_use.html'
    });
  }
}

export default Login;
