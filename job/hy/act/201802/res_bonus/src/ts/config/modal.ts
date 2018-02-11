import * as IMG_success from '../../images/success.png';
import * as IMG_info from '../../images/info.png';
import * as IMG_unRegistered from '../../images/unRegistered.png';
import * as IMG_successInvite from '../../images/success_invite.png';
import * as IMG_successBind from '../../images/success_bind.png';

interface ModalConfig {
  // 状态码
  code?: string;
  // 手机号码
  phone?: string | number;
  // 是否显示动画
  isShowAnimate?: boolean;
  confirmCallback?: Function;
  confirmText?: string;
}

/**
 * 弹窗的公共配置
 * @param type 弹窗的类型
 */
const modalConfig = function (opt?: ModalConfig) {
  const options = opt || {};
  options.code = options.code || 'error';
  options.phone = options.phone || '';
  let type = 'info';
  let imgSrc = IMG_info;
  let imgText = '';
  let text1 = '';
  let text2 = '';
  let actLink = 'javascript:;';
  let confirmCallback = options.confirmCallback;
  let confirmText = '我知道了';

  switch (options.code) {
    case 'SUCCESS':
      imgSrc = IMG_successBind;
      text1 = `您好，<span class="act-red">${options.phone}</span>返现红包`;
      text2 = '每10分钟发送一次，请稍后留意公众号消息';
      break;
    case 'VALID_CODE_ERROR':
      imgText = '很抱歉';
      text1 = '验证码错误，请确认无误后再重新输入';
      break;
    case 'UN_BOUND':
      imgSrc = IMG_info;
      imgText = '求关注';
      text1 = `您好，请先关注广货宝微信公众号`;
      break;
    case 'ALREADY_BOUND':
      imgText = '已绑定';
      text1 = '您好，您输入的手机号已经绑定了公众号';
      break;
    case 'UN_REGISTERED':
      imgSrc = IMG_unRegistered;
      imgText = '';
      text1 = '您好，您输入的手机未在广货宝注册/审核';
      text2 = `请下载广货宝注册领取新春返现福利`;
      confirmText = '下载广货宝';
      break;
    default:
      imgText = '很抱歉';
      text1 = '网络繁忙，请稍后再试！';
  }
  return {
    modalClass: `act-other ${type}`,
    content: `
        <div class="modal-img-wrap">
            <img class="img" src="${imgSrc}" alt="">
            <div class="img-text">${imgText}</div>
        </div>
        <div class="modal-text">
          <p class="text">${text1}</p>
          <p class="text">${text2}</p>
        </div>
        `,
    confirmText: confirmText,
    isShowAnimate: options.isShowAnimate || true,
    confirmCallback: confirmCallback
  };
};

export { modalConfig };
