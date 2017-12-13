
import '../sass/index.scss';
import { modalConfigMap, priceMap } from './config';
import { ajax, Tool, api, weixin } from './util';
import { toast, loading, modal } from '../components';
import { lottery, lotteryChou, roll } from './lottery';
import { submitCheck } from './submit';
import { draw } from './draw';

// 抽奖接口请求回来的数据
let lotteryResData: Draw = null;
// 红包位置
let getPricePos: number = -1;
// 红包金额
let getPrice: number = 0;

// 页面加载完成
Tool.domReady(() => {

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
                case 'submit':
                    if (!(/^\d{11}$/.test(oPhone['value']))) {
                        toast('您输入的手机号码格式有误');
                        return;
                    }

                    // 模拟抽奖
                    loading.show();
                    setTimeout(() => {
                        loading.hide();
                        oLotterywrap.classList.add('show', 'chou');
                    }, 500);

                    // // 提交手机号码逻辑
                    // submitCheck(oPhone, oLotterywrap, function (data: Draw) {});

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
            toast('请检查您的网络');
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
                    // 跑抽奖动画
                    roll(lotteryResData, getPrice, getPricePos);
                    // 一次抽奖完成后，设置click为true，可继续抽奖
                    lottery.isClick = true;
                });

            }
        }
    }, false);

});


