import * as IMG_success from '../../images/success.png';
import * as IMG_error from '../../images/error.png';

interface ModalConfig {
  // 状态码
  code?: string;
  // 是否显示动画
  isShowAnimate?: boolean;
  // 弹窗显示金额
  amount?: any;
}

/**
 * 弹窗的公共配置
 * @param type 弹窗的类型
 */
const modalConfig = function (options?: ModalConfig) {
  let type = 'error';
  let imgSrc = IMG_error;
  let imgText = '';
  let text1 = '';
  let text2 = '';
  let amount = options.amount || '--';

  switch (options.code) {
    case 'SUCCESS':
      type = 'success';
      imgText = `<span class="img-text-symbol">￥</span>${amount}元`;
      imgSrc = IMG_success;
      text1 = `恭喜您抽到<span class="color-red">${amount}</span>元`;
      text2 = '请留意广货宝公众号稍后给您发送的红包';
      break;
    case 'ACT_END':
      text1 = `哎呀！活动已结束`;
      break;
    case 'QUEUE_WAIT':
      text1 = `哎呀！抽奖人数太多，请稍后再试`;
      break;
    default:
      text1 = '哎呀！抽奖失败了请重试一次';
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
    confirmText: '我知道了',
    isShowAnimate: options.isShowAnimate || true
  };
};

export { modalConfig };
