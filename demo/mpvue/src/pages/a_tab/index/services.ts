// 方法
import {
    goBackGetData,
    ghbRequest,
    formatCurrency,
    showToastError,
    formatGhbGoodsRemarkDate,
    refreshToken,
    zerofillBack
} from '../../../utils';

import API from '../../../api';

/**
 * 检查更新小程序
 * 
 * @export
 */
export function updateApp(): void {
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
        wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res: any) {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                }
            }
        })
    });
}

/**
 * 检查提交订单所需参数
 * 
 * @export
 * @param {*} scope index 首页的作用域 this
 * @returns {boolean} 
 */
export function checkNextstepParmas(scope: any): boolean {
    // 没有登录去登录页面
    if (!scope.isLogin) {
        wx.navigateTo({
            url: '../../login/main'
        });
        return false;
    }

    // 已登录，检查必填项，通过则前往下一步
    if (!scope.startInfo.address) {
        showToastError('请输入始发地');
        return false;
    }
    if (!scope.endInfo.address) {
        showToastError('请输入目的地');
        return false;
    }
    if (!scope.carSelected.id) {
        showToastError('请选择车型');
        return false;
    }
    if (!scope.clothsAmount) {
        showToastError('请填写货物信息');
        return false;
    }

    if (!/\S/.test(scope.goodsRemark)) {
        showToastError('请输入货物信息备注');
        return false;
    }

    return true;
}

/**
 * 设置中途点参数
 * 
 * @param {*} scope index 首页的作用域 this
 */
function setHalfwaysParams(scope: any): Array<any> {
    let halfways = [];
    // 如果中途点数组长度大于1，则将所有中途点（除了最后一个点，因为最后一个点默认为终点）信息丢进新数组作为参数去计算运费
    if (scope.aHalfwaysList && scope.aHalfwaysList.length > 1) {
        for (let i = 0; i < scope.aHalfwaysList.length; i++) {
            const oHalfList = scope.aHalfwaysList[i];
            // 除了最后一个点是终点，其他都是中途点
            if (i < scope.aHalfwaysList.length - 1) {
                halfways.push(oHalfList);
            }
        }
    }
    return halfways;
}

/**
 * 获取所有提交订单所需参数
 * 
 * @export
 * @param {*} scope index 首页的作用域 this
 * @returns 
 */
export function getNextstepParams(scope: any) {
    const sGoodsRemarkDate = formatGhbGoodsRemarkDate(scope.bookingTime);
    const sClothsAmount = `${scope.clothsAmount && `${scope.clothsAmount}件`}`;
    const goodsDesc = `${sGoodsRemarkDate && sGoodsRemarkDate + ' 接货'} ${
        scope.goodsRemark
        } ${sClothsAmount}`;

    // 下单所需参数
    const PARAMS_LOGISTICSORDER_REQUEST: Logisticsorder_Request = {
        type: 1,
        vehicleTypeId: scope.carSelected.id,
        bookingTime: scope.bookingTime,
        isBooking: scope.bookingTime ? true : false,
        clothsAmount: scope.clothsAmount,
        couponCodeId: scope.couponInfo.id || '',
        goodsDesc,
        insuranceStatus: 0,
        listOfAdditionalRequest: scope.aSelectedServices,
        uuid: '',
        needLoading: false,
        paymentType: 1,
        receiverAddressName: scope.endInfo.address,
        receiverContact: scope.endInfo.name,
        receiverPhone: scope.endInfo.mobile,
        receiverSiteName: scope.endInfo.siteName,
        receiverStreet: scope.endInfo.street,
        receiverX: scope.endInfo.location.lng,
        receiverY: scope.endInfo.location.lat,
        endCityCode: scope.endInfo.cityCode,
        senderAddressName: scope.startInfo.address,
        senderContact: scope.startInfo.name,
        senderPhone: scope.startInfo.mobile,
        senderSiteName: scope.startInfo.siteName,
        senderStreet: scope.startInfo.street,
        senderX: scope.startInfo.location.lng,
        senderY: scope.startInfo.location.lat,
        startCityCode: scope.startInfo.cityCode,
        halfways: setHalfwaysParams(scope)
    };
    return PARAMS_LOGISTICSORDER_REQUEST;
}

/**
 * 如果填写了发货和收货地址，就可以计算运费
 * 
 * @export
 * @param {*} scope index 首页的作用域 this
 * @returns {void} 
 */
export function getCalcCosts(scope: any): void {
    if (!(scope.startInfo.name && scope.endInfo.name)) {
        scope.costs = null;
        return;
    };

    const PARAMS_COSTS_REQUEST: CalcCost_Request = {
        senderX: scope.startInfo.location.lng,
        senderY: scope.startInfo.location.lat,
        receiverX: scope.endInfo.location.lng,
        receiverY: scope.endInfo.location.lat,
        vehicleTypeId: scope.carSelected.id,
        paymentType: 1,
        isBooking: scope.bookingTime ? 'Y' : 'N',
        bookingTime: scope.bookingTime ? scope.bookingTime : null,
        isBuyInsurance: false,
        needLoading: false,
        couponCodeId: scope.couponInfo.id,
        halfways: setHalfwaysParams(scope),
        type: 1,
    };

    ghbRequest({
        url: API.COSTS,
        method: 'POST',
        data: PARAMS_COSTS_REQUEST
    }).then((res: any) => {
        if (res.statusCode === 200) {
            scope.costs = res.data;
            scope.costs.amount = formatCurrency(scope.costs.amount);
            scope.costs.zptFreight = formatCurrency(scope.costs.zptFreight);
            scope.costs.nightServiceFee = formatCurrency(scope.costs.nightServiceFee);
        } else {
            showToastError(res.data.message);
        }
    });
}



// 重置预约时间
function fnResetComponent(scope: any): void {
    for (let i = 0; i < scope.$children.length; i++) {
        const comp = scope.$children[i];
        comp['reset'] && comp['reset']();
    }
}

// 清空/重置所有填写项目
export function resetAll(scope: any): void {
    scope.endInfo = {};
    scope.fnSetDefaultCar(true);
    fnResetComponent(scope);
    scope.fnCheckboxChange([], '');
    scope.clothsAmount = 1;
    scope.goodsRemark = '';
    scope.bookingTime = '';
    scope.costs = null;
    scope.couponInfo = {};
    scope.aHalfwaysList = [{}];
}

// 获取车型列表
function getCartypeListData(scope: any): void {
    ghbRequest({
        url: API.CARTYPE
    }).then((res: any) => {
        if (res.statusCode === 200) {
            scope.carTypeList = res.data;
            if (scope.carTypeList.length) {
                scope.$store.commit('carTypeListChange', {
                    carTypeList: scope.carTypeList
                });
                scope.fnSetDefaultCar();
            }
        }
    });
}