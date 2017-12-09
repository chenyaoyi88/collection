
import '../sass/index.scss';
import { devTool, weixin, modalConfigMap, priceMap, setMockPrice } from './tool';
import { lottery, lotteryChou } from './lottery';
import { submitCheck } from './submit';
import { draw } from './draw';

let lotteryResData: Draw = null;
// 红包位置
let getPricePos: number = -1;
// 红包金额
let getPrice: number = 0;

function roll(): boolean {

    lottery.times += 1;
    // 转动过程调用的是 lottery 的 roll 方法，这里是第一次调用初始化
    lottery.roll();

    // 如果是抽奖完成，重置
    // 如果切奖次数 > 转动基本次数 多 15 次（超出基本次数之后延迟到达奖品的次数）
    if (lottery.times > lottery.cycle + 15 && lottery.prize == lottery.index) {

        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        lottery.isClick = false;

        setTimeout(() => {
            if (lotteryResData.result === 'success') {
                switch (lotteryResData.status) {
                    case 1:
                        // 成功
                        devTool.modal.show(modalConfigMap('money', getPrice));
                        break;
                    case 2:
                        // 用户未注册
                        devTool.modal.show(modalConfigMap('download', lotteryResData.amount));
                        break;
                    case 3:
                        // 用户未关注公众号
                        devTool.modal.show(modalConfigMap('focus'));
                        break;
                    default:
                        devTool.modal.show();

                    // 已经抽奖了，不太可能出现
                    // case 8:
                    //     // 查询不到可用红包
                    //     break;
                    // case 9:
                    //     // 抽奖活动已经结束
                    //     break;
                }
            }
        }, 200);

    } else {
        if (lottery.times < lottery.cycle) {
            // 1.如果没有到达基本次数，继续跑，速度由初始的 100，慢慢由减速开始 90 80 70...
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            // 2.如果达到了基本的次数，出奖品，但是继续跑（要多跑 20 次）
            lottery.prize = getPricePos;
        } else {
            // speed 的值加大，定时器调用间隔越慢，速度就越来越慢
            lottery.speed += 10;
        }
        // 控制最快速度
        // speed 的值越小，定时器调用间隔越快，速度就越快
        if (lottery.speed < 50) {
            lottery.speed = 50;
        };
        // 循环调用
        lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
}

devTool.domReady(() => {

    setMockPrice();

    // 手机号码
    const oPhone = (document.getElementById('phone') as HTMLInputElement);
    // 抽奖九宫格
    const oLotterywrap = document.getElementById('lottery-wrap');

    // 初始化微信 js-sdk 配置，以及分享到朋友圈/好友功能
    weixin.init();

    // 集体事件
    document.addEventListener('click', function (event: any) {

        const targetID = event.srcElement['dataset'].id;

        if (targetID) {
            switch (targetID) {
                case 'download-buyer':
                    // 下载叫车端
                    devTool.appDownload('buyer');
                    break;
                case 'download-driver':
                    // 下载司机端
                    devTool.appDownload('driver');
                    break;
                case 'submit':
                    if (!(/^\d{11}$/.test(oPhone['value']))) {
                        devTool.toast('您输入的手机号码格式有误');
                        return;
                    }
                    // 提交手机号码逻辑
                    submitCheck(oPhone, oLotterywrap, function (data: Draw) {
                        switch (data.lotteryStatus) {
                            case 1: // 2-1
                                oLotterywrap.classList.add('show', 'chou');
                                break;
                            case 2: // 2-2 2-3 2-9
                                switch (data.status) {
                                    case 2:
                                        devTool.modal.show(modalConfigMap('download', data.amount));
                                        break;
                                    case 3:
                                        devTool.modal.show(modalConfigMap('focus'));
                                        break;
                                    case 9:
                                        devTool.modal.show(modalConfigMap('over'));
                                        break;
                                }
                                break;
                            case 3: // 3
                                switch (data.status) {
                                    case 1:
                                        devTool.modal.show(modalConfigMap('money', data.amount));
                                        break;
                                    case 2:
                                        devTool.modal.show(modalConfigMap('download', data.amount));
                                        break;
                                    case 3:
                                        devTool.modal.show(modalConfigMap('focus'));
                                        break;
                                    case 9:
                                        devTool.modal.show(modalConfigMap('over'));
                                        break;
                                }
                                break;
                            case 4:
                                // 红包已发送-弹窗显示-显示金额
                                devTool.modal.show(modalConfigMap('money', data.amount));
                                break;
                            default:
                                console.log('抽奖成功，但是找不到状态');
                                // 失败-显示网络错误
                                devTool.modal.show(modalConfigMap('busy'));
                        }
                    });
                    break;
            }
        }
    });

    // 点击领奖
    document.getElementById('btn-ling').addEventListener('click', function () {
        // 领奖逻辑
        draw(oPhone);
    }, false);

    // 点击抽奖
    document.getElementById('btn-chou').addEventListener('click', function () {
        if (!window.navigator.onLine) {
            // 离线状态/断网
            devTool.toast('请检查您的网络');
        } else {
            // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            if (lottery.isClick) {
                return false;
            } else {
                // 抽奖逻辑
                lotteryChou(oPhone, oLotterywrap, function (data: Draw) {
                    // 返回抽奖所需数据
                    lotteryResData = data;
                    // 设置金额
                    getPrice = data.amount;
                    // 设置金额位置
                    getPricePos = priceMap()[getPrice];
                    // 初始化抽奖
                    lottery.init('lottery');
                    // 初始速度
                    lottery.speed = 200;
                    // 转圈过程不响应click事件，会将click置为false
                    roll();
                    // 一次抽奖完成后，设置click为true，可继续抽奖
                    lottery.isClick = true;
                });

            }
        }
    }, false);

});


