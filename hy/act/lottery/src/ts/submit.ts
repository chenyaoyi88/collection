
import { 
    ajax,
    devTool, api, modalConfigMap, priceMap, chouChangeToLing } from './tool';
import { lottery } from './lottery';
import { $ } from '../vendor'; 

// 提交手机号码逻辑
function submitCheck(oPhone, oLotterywrap) {
    devTool.loading.show();
    $.ajax({
        type: 'POST',
        url: api.submit,
        data: JSON.stringify({
            phone: oPhone.value,
            openId: devTool.getQueryString('openId')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data: Submit) {
            if (data.result === 'success') {
                // 成功
                switch (Number(data.status)) {
                    case 1:
                        // 成功
                        switch (Number(data.lotteryStatus)) {
                            case 1:
                                // 可抽奖-显示抽奖
                                oLotterywrap.classList.add('show', 'chou');
                                break;
                            case 2:
                                // 红包已获得，可以领取-显示抽奖，抽奖按钮改为领取
                                chouChangeToLing(oLotterywrap, data, lottery);
                                break;
                            case 3:
                                // 红包已领取
                                devTool.modal.show(modalConfigMap('get'));
                                break;
                            case 4:
                                // 红包已发送-弹窗显示-显示金额
                                devTool.modal.show(modalConfigMap('money', data.amount));
                                break;
                            default:
                                devTool.modal.show();
                        }
                        break;
                    case 2:
                        // 弹窗-用户未注册-下载
                        devTool.modal.show(modalConfigMap('download', data.amount));
                        break;
                    case 3:
                        // 弹窗-用户未关注公众号
                        devTool.modal.show(modalConfigMap('focus'));
                        break;
                    case 9:
                        // 弹窗-活动已结束
                        devTool.modal.show(modalConfigMap('over'));
                        break;
                    default:
                        console.log('抽奖成功，但是找不到状态');
                        // 失败-显示网络错误
                        devTool.modal.show(modalConfigMap('busy'));
                }
            } else {
                // 失败-显示网络错误
                devTool.modal.show(modalConfigMap('busy'));
            }
            devTool.loading.hide();
            console.log(data);
        },
        error: function () {
            devTool.loading.hide();
            // 失败-显示网络错误
            devTool.modal.show(modalConfigMap('busy'));
        }
    });
}

export { submitCheck };