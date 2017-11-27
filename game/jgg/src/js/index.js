var lottery = {
    // 当前转动到哪个位置（-1 为起点位置，不在界面上显示）
    index: -1,
    // 总共有多少个位置
    count: 0,
    // setTimeout的ID，用clearTimeout清除
    timer: 0,
    // 初始转动速度
    speed: 20,
    // 转动次数
    times: 0,
    // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    cycle: 50,
    // 中奖位置（-1 是默认值，表示不在界面上显示）
    prize: -1,
    // 抽奖初始化
    init: function (id) {
        var oLottery = document.querySelector('#' + id);
        var aLotteryUnits = oLottery.querySelectorAll('.lottery-unit');
        var oDefaultActiveLotteryUnit = null;

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

    // console.log('times: ' + lottery.times);
    // console.log('cycle: ' + lottery.cycle);
    // console.log('prize: ' + lottery.prize);
    // console.log('index: ' + lottery.index);

    // 如果是抽奖完成，重置
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            // 静态演示，随机产生一个奖品序号，实际需请求接口产生
            // setTimeout(() => {
            //     var index = Math.random() * (lottery.count) | 0;
            //     console.log(index);
            //     lottery.prize = index;
            // }, 10000);
            
            // 抽奖方式二：先显示抽奖动画，然后再请求抽奖接口
            lottery.prize = result;
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize ==
                    lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        };
        // 循环调用
        lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
}

var click = false;

var result = -1;

window.onload = function () {
    lottery.init('lottery');

    // 点击抽奖
    document.getElementById('draw-btn').onclick = function () {
        if (!window.navigator.onLine) {
            // 离线状态/断网
            alert('请检查您的网络');
        } else {
            // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            if (click) {
                return false;
            } else {
                // 抽奖方式一：先请求抽奖接口得到结果再开始显示抽奖动画
                // setTimeout(() => {
                    result = 6;
                    lottery.speed = 100;
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