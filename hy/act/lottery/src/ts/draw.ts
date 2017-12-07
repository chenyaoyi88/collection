import { devTool, ajax, api, modalConfigMap } from './tool';
import { $ } from '../vendor'; 

/**
 * 领奖逻辑
 * @param oPhone 手机号码
 */
const draw = function (oPhone: any) {
    devTool.loading.show();
    $.ajax({
        type: 'POST',
        url: api.draw,
        data: JSON.stringify({
            phone: oPhone.value,
            openId: devTool.getQueryString('openId')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data: Draw) {
            if (data.result === 'success') {
                switch (Number(data.status)) {
                    case 1:
                        // 成功
                        switch (Number(data.lotteryStatus)) {
                            case 3:
                                // 红包已领取
                                devTool.modal.show(modalConfigMap('get', data.amount));
                                break;
                            case 4:
                                // 红包已发送
                                devTool.modal.show(modalConfigMap('money', data.amount));
                                break;
                            default:
                                // lotteryStatus 状态不明
                                devTool.modal.show();
                        }
                        break;
                    case 2:
                        // 用户未注册
                        devTool.modal.show(modalConfigMap('download', data.amount));
                        break;
                    case 3:
                        // 用户未关注公众号
                        devTool.modal.show(modalConfigMap('focus'));
                        break;
                    case 8:
                        // 找不到抽奖红包
                        console.log('系统找不到抽奖红包');
                        devTool.modal.show();
                        break;
                    default:
                        console.log('status 状态找不到对应的方式处理');
                        devTool.modal.show();
                }
            } else {
                devTool.modal.show();
            }
            devTool.loading.hide();
        },
        error: function () {
            devTool.loading.hide();
            devTool.modal.show();
        }
    });
}

export { draw };