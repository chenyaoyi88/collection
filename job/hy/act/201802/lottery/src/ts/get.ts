
import { api, ajax, Tool } from './util';
import {
    modalConfig, priceMap,
    setMockPrice
} from './config';

import { modal } from '../components';

interface Res_userInfo {
    // 	可抽奖次数
    canLotteryTimes?: any;
    // 已抽中奖品信息
    prizes?: Array<UserInfo_Price>
    // 是否已绑定微信
    isBind?: boolean;
}

interface UserInfo_Price {
    // 手机号
    amount: number | string;
    // 状态
    status: number | string;
}

/**
 * 匹配返回的状态码相对应的状态
 * 
 * @param {*} status 状态码
 * @returns 
 */
function findStatus(status: any) {
    let sResult = '';
    if (parseInt(status)) {
        const oStatusMap = {
            '10': '已获得',
            '20': '待发送',
            '30': '已发送'
        };
        if (oStatusMap[status]) {
            sResult = oStatusMap[status];
        } else {
            sResult = '未明';
        }
    }
    return sResult;
}

/**
 * 获取用户抽奖信息
 * 
 * @param {HTMLSpanElement} oChanceTimes 抽奖次数元素
 * @param {HTMLButtonElement} oBtnLottery 抽奖按钮元素
 * @param {Function} [callback] 回调函数
 */
function getUserInfo(oChanceTimes: HTMLSpanElement, oBtnLottery: HTMLButtonElement, callback?: Function) {
    ajax({
        type: 'GET',
        url: api.get,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Tool.getQueryString('authorization') || ''
        },
        success: function (data: Res_userInfo) {
            if (data) {
                // 如果有抽奖机会，显示抽奖机会次数，解除抽奖禁用按钮
                if (data.canLotteryTimes > 0) {
                    oChanceTimes && (oChanceTimes.innerText = data.canLotteryTimes);
                    oBtnLottery && oBtnLottery.removeAttribute('disabled');
                } else {
                    oChanceTimes && (oChanceTimes.innerText = '0');
                    oBtnLottery && oBtnLottery.setAttribute('disabled', 'disabled');
                }

                if (data.prizes && data.prizes.length) {
                    const oListPrice = document.getElementById('list-tbody-price');
                    let listTr = '';
                    for (let item of data.prizes) {
                        listTr += `
                        <tr>
                            <td>${item.amount}元</td>
                            <td>${findStatus(item.status)}</td>
                        </tr>
                        `;
                    }
                    oListPrice.innerHTML = listTr;
                }

            }
        },
        error: function () {
            // 失败-显示网络错误
            modal.show(modalConfig({
                code: 'error',
                isShowAnimate: true
            }));
        }
    });
}

export { getUserInfo };