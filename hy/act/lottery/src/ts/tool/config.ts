// 不同弹窗显示的内容
const modalConfigMap = function (type: string, price?: number) {
    let modalConfig = {};
    switch (type) {
        case 'over':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                    <div class="modal-text">
                        <p class="text">活动已结束</p>
                        <p class="text">感谢参与</p>
                    </div>
                `
            }
            break;
        case 'get':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                        <div class="modal-text">
                            <p class="text">您已领取过本次奖励</p>
                            <p class="text">感谢参与</p>
                        </div>
                    `
            }
            break;
        case 'focus':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                        <div class="modal-qrcode-wrap"></div>
                        <div class="modal-text">
                            <p class="text">请先关注“广货宝”公众号</p>
                            <p class="text-gray">奖励会通过广货宝公众号发送给您</p>
                        </div>
                    `
            }
            break;
        case 'download':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                    <div class="modal-price">${price || '--'}元</div>
                    <div class="modal-text">
                        <p class="text">恭喜您抽中${price || '--'}元现金红包</p>
                        <p class="text-gray">请下载广货宝叫车端或广货宝司机端注册成为会员在个人微信钱包中查收</p>
                    </div>
                    <div class="download-btn-wrap">
                        <a data-id="download-buyer" class="download-btn c-user" href="javascript:;">下载广货宝叫车端</a>
                        <a data-id="download-driver" class="download-btn c-driver" href="javascript:;">下载广货宝司机端</a>
                    </div>
                    `
            }
            break;
        case 'money':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                <div class="modal-price">${price || '--'}元</div>
                <div class="modal-text">
                    <p class="text">恭喜您抽中${price || '--'}元现金红包</p>
                    <p class="text-gray">已存入您的个人微信钱包，请查收</p>
                </div>
                <div class="modal-btn-wrap money-btn-wrap">
                    <div data-id="modal-close" class="modal-close-btn  modal-btn">确定</div>
                </div>
                `
            };
            break;
    }
    return modalConfig;
}

// 返回的金额对应的位置
const proPriceMap = {
    // 金额 <-> 奖品索引（顺时针）
    '50': 0,
    '8': 1,
    '100': 2,
    '10': 3,
    '30': 4,
    '3': 5,
    '20': 6,
    '5': 7
};

// 返回的金额对应的位置
// 测试环境：（！！！！NOTE：测试环境的金额为：真实金额/100 + 1）
// 正式环境：proPriceMap
const priceMap = function () {
    const env = process.env.NODE_ENV;
    if (env === 'development' || env === 'test') {
        // 开发||测试
        let mockPriceMap: any = {};
        for (let pro in proPriceMap) {
            mockPriceMap[(Number(pro) / 100 + 1)] = proPriceMap[pro];
        }
        return mockPriceMap;
    } else {
        // 生产
        return proPriceMap;
    }
}

/**
 * 测试环境设置假的金额
 * @param aLotteryUnits 
 */
const setMockPrice = function (): void {
    const env = process.env.NODE_ENV;
    if (env === 'development' || env === 'test') {
        let oLottery = document.querySelector('#lottery');
        let aLotteryUnits = oLottery.querySelectorAll('.lottery-unit');
        for (let i = 0; i < aLotteryUnits.length; i++) {
            let redbag = aLotteryUnits[i].getElementsByClassName('redbag-money')[0];
            let mockPriceMaps = priceMap();
            for (let pro in mockPriceMaps) {
                if (Number(mockPriceMaps[pro]) === Number(redbag['dataset'].id)) {
                    redbag.innerHTML = pro + '元';
                }
            }
        }
    }
}

/**
 * 显示抽奖，抽奖按钮改为领取
 * @param oLotterywrap 抽奖界面
 * @param data 请求回来的数据
 * @param lottery 抽奖对象
 */
const chouChangeToLing = function (oLotterywrap: any, data, lottery: any): void {
    // 移除抽奖按钮的图片
    oLotterywrap.classList.remove('chou');
    // 变成领取按钮的图片
    oLotterywrap.classList.add('show', 'ling');
    // 如果 data.amount 为 null 的话，不在界面上显示
    let pricePos = data.amount === null ? -1 : data.amount;
    // 设置奖品位置
    lottery.index = priceMap()[pricePos];
    // 初始化抽奖
    lottery.init('lottery');
}

export { modalConfigMap, priceMap, chouChangeToLing, setMockPrice }; 
