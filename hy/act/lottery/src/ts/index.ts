
import '../sass/index.scss';
import { ajax, devTool, api } from './tool';
import { lottery } from './lottery';
import { fnOther } from './other';
import { clickEvent } from './event';
import { setTimeout } from 'timers';

function roll(): boolean {

    lottery.times += 1;
    // 转动过程调用的是 lottery 的 roll 方法，这里是第一次调用初始化
    lottery.roll();

    // 如果是抽奖完成，重置
    // 如果切奖次数 > 转动基本次数 多 20 次（超出基本次数之后延迟到达奖品的次数）
    if (lottery.times > lottery.cycle + 15 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        lottery.isClick = false;

        console.log('显示弹窗');
    } else {
        if (lottery.times < lottery.cycle) {
            // 1.如果没有到达基本次数，继续跑

            // 速度由初始的 100，慢慢由减速开始 90 80 70...
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            // 2.如果达到了基本的次数，出奖品，但是继续跑（要多跑 20 次）

            const arr = [50, 8, 100, 10, 30, 3, 20, 5];
            // 静态演示，随机产生一个奖品序号，实际需请求接口产生
            let index = Math.random() * (lottery.count) | 0;
            console.log(arr[index] + '元');
            // 抽奖方式二：先显示抽奖动画，然后再请求抽奖接口
            lottery.prize = index;

        } else {
            // 3.已经知道奖品了，开始减速

            // if (
            //     lottery.times > lottery.cycle + 10 && 
            //     ((lottery.prize == 0 && lottery.index == 7) || lottery.prize ==
            //     lottery.index + 1)
            // ) {
            //     lottery.speed += 10;
            // } else {
            //     // 延迟到达最终奖品的速度
            //     lottery.speed += 10;
            // }

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
    
    clickEvent();

    // 弹窗
    const oModal = document.getElementById('modal');
    // 手机号码
    const oPhone = document.getElementById('phone');
    // 错误提示
    const sErrorText = document.getElementById('modal-busy-text');
    // 抽奖九宫格
    const oLotterywrap = document.getElementById('lottery-wrap');

    // 集体事件
    document.addEventListener('click', function (event: any) {
        console.dir(event.srcElement['dataset']);
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
                case 'modal-close-btn':
                    // 关闭弹窗
                    oModal.classList.remove('show');
                    break;
                case 'submit':
                    if (!(/^\d{11}$/.test(oPhone['value']))) {
                        devTool.toast('您输入的手机号码格式有误');
                        // fnOther.showModal(oModal, 'act-busy', () => {
                        //     sErrorText.innerHTML = '您输入的手机号码格式有误';
                        // });
                        return;
                    }
                    // todo-1：输入手机号请求接口绑定 openid 后显示抽奖模块
                    // mock
                    let isActOver: boolean = true;
                    devTool.loading.show();
                    setTimeout(() => {
                        if (isActOver) {
                            // 活动已结束
                            devTool.loading.hide();
                            fnOther.showModal(oModal, 'act-over');
                        }
                        // isActOver = false;
                        // oLotterywrap.classList.add('show');
                    }, 2000);

                    break;
            }
        }
    });

    // 初始化抽奖
    lottery.init('lottery');
    // 点击抽奖
    document.getElementById('lottery-btn').onclick = function () {
        if (!window.navigator.onLine) {
            // 离线状态/断网
            devTool.toast('请检查您的网络');
        } else {
            // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            if (lottery.isClick) {
                return false;
            } else {
                // 抽奖方式一：先请求抽奖接口得到结果再开始显示抽奖动画
                // setTimeout(() => {
                // result = 6;

                // 初始速度
                lottery.speed = 200;
                // 转圈过程不响应click事件，会将click置为false
                roll();
                // 一次抽奖完成后，设置click为true，可继续抽奖
                lottery.isClick = true;
                return false;

                // }, 1000);
            }
        }
    }
});


