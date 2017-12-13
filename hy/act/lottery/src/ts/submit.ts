
import {
    ajax, Tool, api
} from './util';
import { modalConfigMap, priceMap } from './config';
import { toast, loading, modal } from '../components';
import { lottery } from './lottery';

/**
 * 提交手机号码逻辑
 * 
 * @param {HTMLInputElement} oPhone 手机号码 input
 * @param {HTMLElement} oLotterywrap 抽奖DIV
 * @param {Function} [callback] 回调函数
 */
function submitCheck(oPhone: HTMLInputElement, oLotterywrap: HTMLElement, callback?: Function): void {
    loading.show();
    ajax({
        type: 'POST',
        url: api.submit,
        data: JSON.stringify({
            phone: oPhone.value,
            openId: Tool.getQueryString('openId')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data: Submit) {
            loading.hide();
        },
        error: function () {
            loading.hide();
            // 失败-显示网络错误
            modal.show(modalConfigMap('busy'));
        }
    });
}

export { submitCheck };