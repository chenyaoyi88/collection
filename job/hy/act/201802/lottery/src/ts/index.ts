
import '../sass/index.scss';

import { Tool } from './util';
import { lottery, lotteryChou } from './lottery';
import { getUserInfo } from './get';
import { toast, loading, modal } from '../components';
import {
    modalConfig,
    priceMap,
    setMockPrice,
    findPrice
} from './config';


interface Res_lottery {
    // 返回状态码
    code?: string;
    // 	返回信息
    msg?: string;
    // 	返回数据
    data?: {
        // 返现百分比
        percentage?: number;
        // 中奖金额
        amount?: number;
    }
}


Tool.domReady(() => {

    setMockPrice();

    // 抽奖次数
    const oChanceTimes: HTMLSpanElement = document.getElementById('chance-times');
    // 抽奖按钮
    const oBtnLottery = (document.getElementById('btn-chou') as HTMLButtonElement);

    // 获取抽奖次数
    getUserInfo(oChanceTimes, oBtnLottery);

    // 集体事件
    oBtnLottery.addEventListener('click', function (event: any) {
        if (!window.navigator.onLine) {
            // 离线状态/断网
            toast('请检查您的网络');
        } else {
            // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            if (lottery.isClick) return;
            oBtnLottery.setAttribute('disabled', 'disabled');
            // 抽奖逻辑
            lotteryChou({}, function (res: Res_lottery) {
                // 请求抽奖结果成功
                if (res.code === 'SUCCESS') {
                    // 设置金额
                    if (!(res.data && res.data.percentage)) {
                        showModal();
                        return;
                    }

                    const percentage = res.data.percentage;
                    const amount = res.data.amount;
                    // 转成带百分号的百分比
                    const nPerChange = (percentage * 100) + "%";
                    // 根据返回的金额找相对应的位置，去匹配
                    lottery.getPricePos = priceMap()[nPerChange];
                    if (!findPrice(lottery.getPricePos)) {
                        // 返回结果里面没有找到对应奖品的位置
                        showModal();
                        return;
                    }

                    // 一次抽奖完成后，设置click为true，可继续抽奖
                    lottery.isClick = true;
                    // 初始化抽奖
                    lottery.init('lottery');
                    lottery.running(function () {
                        // 抽奖结束之后的回调
                        showModal(res.code, amount);
                        getUserInfo(oChanceTimes, oBtnLottery);
                    });
                } else {
                    showModal(res.code);
                }
            }, function () {
                // 请求抽奖结果失败
                showModal();
            });

        }
    });

    /**
     * 显示弹窗+按钮取消禁用
     * 
     * @param {string} [code='error'] 弹窗类型
     * @param {*} [amount] 弹窗要显示的金额
     */
    function showModal(code: string = 'error', amount?: any) {
        // 请求抽奖结果失败
        modal.show(modalConfig({
            code: code,
            amount: amount
        }));
        oBtnLottery && oBtnLottery.removeAttribute('disabled');
    }


});

