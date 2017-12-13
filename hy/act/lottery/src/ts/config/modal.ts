import * as qrcodeIMG from '../../images/lottery/modal-qrcode.png';

/**
 * 不同弹窗显示的内容
 * 
 * @param {string} type 弹窗的类型
 * @param {number} [price] 中奖的金额
 * @returns {Object} 
 */
function modalConfigMap(type: string, price?: number): Object {
    let modalConfig = {};
    switch (type) {
        case 'over':
            // 活动结束
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
            // 已领取过奖励
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
            // 要关注
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                        <div class="modal-qrcode-wrap">
                            <img src=${qrcodeIMG} alt="xxx公众号" />
                        </div>
                        <div class="modal-text">
                            <p class="text">请先关注“xxx”公众号</p>
                            <p class="text-gray">奖励会通过xxx公众号发送给您</p>
                        </div>
                    `
            }
            break;
        case 'download':
            // 下载 app 
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                    <div class="modal-price">${price || '--'}元</div>
                    <div class="modal-text">
                        <p class="text">恭喜您抽中${price || '--'}元现金红包</p>
                        <p class="text-gray">请下载xxx叫车端或xxx司机端注册成为会员在个人微信钱包中查收</p>
                    </div>
                    <div class="download-btn-wrap">
                        <a data-id="download-buyer" class="download-btn c-user" href="javascript:;">下载xxx叫车端</a>
                        <a data-id="download-driver" class="download-btn c-driver" href="javascript:;">下载xxx司机端</a>
                    </div>
                    `
            }
            break;
        case 'money':
            // 显示中间金额
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                <div class="modal-price">${price || '--'}元</div>
                <div class="modal-text">
                    <p class="text">恭喜您抽中${price || '--'}元现金红包</p>
                    <p class="text-gray">已存入您的个人微信钱包，请查收</p>
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
    // const env = process.env.NODE_ENV;
    // if (env === 'development' || env === 'test') {
    //     // 开发||测试
    //     let mockPriceMap: any = {};
    //     for (let pro in proPriceMap) {
    //         mockPriceMap[(Number(pro) / 100 + 1)] = proPriceMap[pro];
    //     }
    //     return mockPriceMap;
    // } else {
    //     // 生产
    //     return proPriceMap;
    // }
    return proPriceMap;
}

/**
 * 测试环境设置假的金额
 * 
 */
function setMockPrice(): void {
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

export { modalConfigMap, priceMap, setMockPrice }; 
