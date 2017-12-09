
import * as IMG_get from '../../images/get.png';
import * as IMG_subscribe from '../../images/subscribe.png';
import * as IMG_unmatch from '../../images/unmatch.png';
import * as IMG_unapply from '../../images/unapply.png';
import * as IMG_nofound from '../../images/nofound.png';
import * as IMG_success from '../../images/success.png';
import * as IMG_audit from '../../images/audit.png';
import * as IMG_over from '../../images/over.png';

/**
 * 弹窗的公共配置
 * @param type 弹窗的类型
 */
const modalConfig = function (code: string) {
    let imgSrc = '';
    let text1 = '';
    let text2 = '';
    let type = '';

    switch (code) {
        case '000':
            type = 'success';
            imgSrc = IMG_success;
            text1 = '50元奖金即将通过广货宝公众号发送给您，请勿解除关注！';
            text2 = '';
            break;
        case '002':
            type = 'nofound';
            imgSrc = IMG_nofound;
            text1 = '您已经完成10次邀请啦';
            text2 = '非常感谢您的参与';
            break;
        case '003':
            type = 'subscribe';
            imgSrc = IMG_subscribe;
            text1 = '请先关注“广货宝”公众号';
            text2 = '奖励会通过广货宝公众号发送给您！';
            break;
        case '001':
            type = 'get';
            imgSrc = IMG_get;
            text1 = '目前没有可供领取的奖励';
            text2 = '';
            break;
        case 'over':
            type = 'over';
            imgSrc = IMG_over;
            text1 = '活动已经结束啦，谢谢您的参与！';
            text2 = '';
            break;
        default:
            type = 'error';
            imgSrc = IMG_unmatch;
            text1 = '网络繁忙，请稍后再试！';
            text2 = '';
    }
    return {
        modalClass: `act-signup ${type}`,
        content: `
        <div class="modal-img-wrap">
            <img class="img" src="${imgSrc}" alt="">
        </div>
        <div class="modal-text">
            <p class="text">${text1}</p>
            <p class="text">${text2}</p>
        </div>
        `,
        confirmText: '我知道了'
    }
}

export { modalConfig };