import { modalConfigMap, priceMap } from './config';
import { ajax, Tool, api, weixin } from './util';
import { toast, loading, modal } from '../components';

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

/**
 * 
 * 
 * @param {*} lotteryResData 
 * @param {number} getPrice 
 * @param {number} getPricePos 
 * @returns {boolean} 
 */
function roll(lotteryResData: any, getPrice: number, getPricePos: number): boolean {

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
                        modal.show(modalConfigMap('money', getPrice));
                        break;
                    case 2:
                        // 用户未注册
                        modal.show(modalConfigMap('download', lotteryResData.amount));
                        break;
                    case 3:
                        // 用户未关注公众号
                        modal.show(modalConfigMap('focus'));
                        break;
                    default:
                        modal.show();
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
        lottery.timer = setTimeout(function () {
            roll(lotteryResData, getPrice, getPricePos);
        }, lottery.speed);
    }
    return false;
}

/**
 * 请求抽奖接口拿奖品结果
 * 
 * @param {HTMLInputElement} oPhone 手机号码
 * @param {HTMLElement} oLotterywrap 抽奖DIV
 * @param {Function} fuSuccess 抽奖接口请求成功之后的回调
 */
function lotteryChou(oPhone: HTMLInputElement, oLotterywrap: HTMLElement, fuSuccess: Function) {

    // 模拟抽奖结果
    loading.show();
    setTimeout(() => {
        let res = {
            result: 'success',
            status: 1,
            amount: 8
        };
        loading.hide();
        fuSuccess(res);
    }, 300);

    // // 请求抽奖接口
    // ajax({
    //     type: 'POST',
    //     url: api.lottery,
    //     data: JSON.stringify({
    //         phone: oPhone.value,
    //         openId: Tool.getQueryString('openId')
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     success: function (data: Lottery) {
    //         // 获取奖品接口，拿到数据之后去展示
    //     },
    //     error: function () {
    //         // 失败-显示网络错误
    //         modal.show();
    //     }
    // });
}

export { lottery, roll, lotteryChou };