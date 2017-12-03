console.log('当前环境：' + process.env.NODE_ENV);
import '../sass/index.scss';
import { ajax, toast } from './tool/dev_tool';
import { clickEvent } from './event';
// 非生产环境，将 index.html 导进来，从而达到修改 html 文件的时候触发 reload
if (process.env.NODE_ENV !== 'production') {
    require('../index.html');
} else {
    console.log = function(){};
}

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
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;

        // 移除当前/之前奖品的 active 样式名
        var curLotteryUnit = lottery.querySelector('.lottery-unit.lottery-unit-' + this.index);
        curLotteryUnit && curLotteryUnit.classList.remove('active');

        // 抽奖过程中的临时索引+1，超出了个数又从头来过
        index += 1;
        if (index > count - 1) {
            index = 0;
        };

        // 点亮当前奖品，添加 active 样式
        var curLotteryUnit = lottery.querySelector('.lottery-unit.lottery-unit-' + index);
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

function roll() {

    lottery.times += 1;
    // 转动过程调用的是 lottery 的 roll 方法，这里是第一次调用初始化
    lottery.roll();

    // 如果是抽奖完成，重置
    // 如果切奖次数 > 转动基本次数 多 20 次（超出基本次数之后延迟到达奖品的次数）
    if (lottery.times > lottery.cycle + 15 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;

        console.log('显示弹窗');
    } else {
        if (lottery.times < lottery.cycle) {
            // 1.如果没有到达基本次数，继续跑

            // 速度由初始的 100，慢慢由减速开始 90 80 70...
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            // 2.如果达到了基本的次数，出奖品，但是继续跑（要多跑 20 次）
            const arr = [50,8,100,10,30,3,20,5];
            // 静态演示，随机产生一个奖品序号，实际需请求接口产生
            let index = Math.random() * (lottery.count) | 0;
            console.log(arr[index]+'元');
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

let click = false;

window.onload = function () {
   
    clickEvent();

    lottery.init('lottery');

    // 点击抽奖
    document.getElementById('lottery-btn').onclick = function () {
        if (!window.navigator.onLine) {
            // 离线状态/断网
            toast('请检查您的网络');
        } else {
            // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            if (click) {
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
                click = true;
                return false;

                // }, 1000);
            }
        }
    }
};