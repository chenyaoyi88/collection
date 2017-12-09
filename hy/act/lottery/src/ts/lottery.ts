
import {
    ajax,
    devTool,
    api,
    modalConfigMap,
    priceMap,
    chouChangeToLing,
    setMockPrice
} from './tool';

import { $ } from '../vendor';

const lottery = {
    // 当前转动到哪个位置（-1 为起点位置，不在界面上显示）
    index: -1,
    // 总共有多少个位置
    count: 0,
    // setTimeout的ID，用clearTimeout清除
    timer: null,
    // 初始转动速度
    speed: 20,
    // 转动次数
    times: 0,
    // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    cycle: 50,
    // 中奖位置（-1 是默认值，表示不在界面上显示）
    prize: -1,
    // 本对象
    obj: null,
    // 禁止重复点击
    isClick: false,
    // 抽奖初始化
    init: function (id) {
        let oLottery = document.querySelector('#' + id);
        let aLotteryUnits = oLottery.querySelectorAll('.lottery-unit');
        let oDefaultActiveLotteryUnit = null;
        if (aLotteryUnits.length > 0) {
            this.obj = oLottery;
            this.count = aLotteryUnits.length;

            // 如果设置了默认的其实位置则点亮（-1 为不设置）
            oDefaultActiveLotteryUnit = oLottery.querySelector('.lottery-unit.lottery-unit-' + this.index);
            if (oDefaultActiveLotteryUnit) {
                oDefaultActiveLotteryUnit.classList.add('active');
            }
        }
    },
    roll: function () {
        // 设置起始位置
        let index = this.index;
        let count = this.count;
        let lottery = this.obj;

        // 移除当前 active 样式名
        let preLotteryUnit = lottery.querySelector('.lottery-unit.lottery-unit-' + this.index);
        preLotteryUnit && preLotteryUnit.classList.remove('active');

        // 抽奖过程中的临时索引+1，超出了个数又从头来过
        index += 1;
        if (index > count - 1) {
            index = 0;
        };

        // 点亮当前奖品，添加 active 样式
        let curLotteryUnit = lottery.querySelector('.lottery-unit.lottery-unit-' + index);
        curLotteryUnit && curLotteryUnit.classList.add('active');

        // 替换当前选中的索引
        this.index = index;

        return false;
    },
    stop: function (index) {
        this.prize = index;
        return false;
    }
};

// 请求抽奖接口拿奖品结果
function lotteryChou(oPhone, oLotterywrap, callback) {
    $.ajax({
        type: 'POST',
        url: api.lottery,
        data: JSON.stringify({
            phone: oPhone.value,
            openId: devTool.getQueryString('openId')
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data: Lottery) {
            if (data.result === 'success') {
                if (Number(data.status) === 9) {
                    // 抽奖活动已经结束
                    devTool.modal.show(modalConfigMap('over'));
                } else {
                    // 成功
                    switch (Number(data.lotteryStatus)) {
                        case 1:
                            // 可抽奖
                            console.log('中奖：' + data.amount);
                            if (data.amount) {
                                // 有金额返回才去执行抽奖
                                callback && callback(data);
                            } else {
                                // 如果金额为 null，显示网络错误
                                devTool.modal.show();
                            }
                            break;
                        case 2:
                            // 红包已获得，可以领取-显示抽奖，抽奖按钮改为领取
                            // chouChangeToLing(oLotterywrap, data, lottery);
                            switch (data.status) {
                                case 1:
                                    // 成功
                                    chouChangeToLing(oLotterywrap, data, lottery);
                                    break;
                                case 2:
                                    // 用户未注册
                                    // devTool.modal.show(modalConfigMap('download', data.amount));
                                    callback && callback(data);
                                    break;
                                case 3:
                                    // 用户未关注公众号
                                    // devTool.modal.show(modalConfigMap('focus'));
                                    callback && callback(data);
                                    break;
                                default:
                                    devTool.modal.show();
                            }
                            break;
                        case 3:
                            // 红包已领取
                            switch (data.status) {
                                case 1:
                                    // 成功
                                    callback && callback(data);
                                    break;
                                case 2:
                                    // 用户未注册
                                    devTool.modal.show(modalConfigMap('download', data.amount));
                                    break;
                                case 3:
                                    // 用户未关注公众号
                                    devTool.modal.show(modalConfigMap('focus'));
                                    break;
                                default:
                                    devTool.modal.show();
                            }
                            break;
                        case 4:
                            // 红包已发送
                            devTool.modal.show(modalConfigMap('get'));
                            break;
                        default:
                            // 未知错误
                            console.log('lotteryStatus 未知错误');
                            devTool.modal.show();
                    }
                }

                // switch (Number(data.status)) {
                //     case 1:
                //         // 成功
                //         switch (Number(data.lotteryStatus)) {
                //             case 1:
                //                 // 可抽奖
                //                 console.log('中奖：' + data.amount);
                //                 if (data.amount) {
                //                     // 有金额返回才去执行抽奖
                //                     callback && callback(data);
                //                 } else {
                //                     // 如果金额为 null，显示网络错误
                //                     devTool.modal.show();
                //                 }
                //                 break;
                //             case 2:
                //                 // 红包已获得，可以领取-显示抽奖，抽奖按钮改为领取
                //                 chouChangeToLing(oLotterywrap, data, lottery);
                //                 break;
                //             case 3:
                //                 // 红包已领取
                //                 devTool.modal.show(modalConfigMap('get'));
                //                 break;
                //             case 4:
                //                 // 红包已发送
                //                 devTool.modal.show(modalConfigMap('money', data.amount));
                //                 break;
                //             default:
                //                 // 未知错误
                //                 console.log('lotteryStatus 未知错误');
                //                 devTool.modal.show();
                //         }
                //         break;
                //     case 9:
                //         // 抽奖活动已经结束
                //         devTool.modal.show(modalConfigMap('over'));
                //         break;
                //     default:
                //         // status 状态不明
                //         console.log('status 状态不明');
                //         devTool.modal.show();
                // }

            } else {
                // 失败-显示网络错误
                devTool.modal.show();
            }
        },
        error: function () {
            // 失败-显示网络错误
            devTool.modal.show();
        }
    });
}

export { lottery, lotteryChou };