// 返回的金额对应的位置
const proPriceMap = {
    // 金额 <-> 奖品索引（顺时针）
    '8%': 0,
    '15%': 1,
    '20%': 2,
    '30%': 3,
    '50%': 4,
    '80%': 5,
    '100%': 6,
    '188%': 7
};

const findPrice = function (price: any) {
    for (let pro in proPriceMap) {
        if (proPriceMap[pro] === parseInt(price)) {
            return true;
        }
    }
    return false;
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
            // mockPriceMap[(Number(pro) / 100 + 1)] = proPriceMap[pro];
            mockPriceMap[pro] = proPriceMap[pro];
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
                    redbag.innerHTML = pro;
                }
            }
        }
    }
}

export { priceMap, setMockPrice, proPriceMap, findPrice }; 
