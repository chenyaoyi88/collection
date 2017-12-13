import { toast, loading, modal } from '../components';
import { modalConfigMap } from './config';
import { ajax, Tool, api, weixin } from './util';

/**
 * 领奖逻辑
 * 
 * @param {HTMLInputElement} oPhone 手机号码 input 
 */
function draw(oPhone: HTMLInputElement) {
    loading.show();
    ajax({
        type: 'POST',
        url: api.draw,
        data: JSON.stringify({
            phone: oPhone.value,
            openId: Tool.getQueryString('openId')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data: Draw) {
            // 领奖逻辑
            loading.hide();
        },
        error: function () {
            loading.hide();
            modal.show();
        }
    });
}

export { draw };