// 方法
import {
  goBackGetData,
  ghbRequest,
  formatCurrency,
  showToastError,
  formatGhbGoodsRemarkDate,
  refreshToken,
  zerofillBack
} from '../../utils/index';

import API from '../../api/api';

export const iconList = {
    carType: '../../assets/icons/cartype.png',
    time: '../../assets/icons/time.png',
    extra: '../../assets/icons/extra.png',
    goods: '../../assets/icons/goods.png',
    coupon: '../../assets/icons/coupon.png',
    add: '../../assets/icons/add.png'
};

/**
 * 检查更新小程序
 * 
 * @export
 */
export function updateApp() {
  const updateManager = wx.getUpdateManager();
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
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
export function checkNextstepParmas(scope) {
  // 没有登录去登录页面
  if (!scope.data.isLogin) {
    wx.navigateTo({
      url: '../login/login'
    });
    return false;
  }

  // 已登录，检查必填项，通过则前往下一步
  if (!scope.data.startInfo.address) {
    showToastError('请输入始发地');
    return false;
  }
  if (!scope.data.endInfo.address) {
    showToastError('请输入目的地');
    return false;
  }
  if (!scope.data.carSelected.id) {
    showToastError('请选择车型');
    return false;
  }
  if (!scope.data.clothsAmount) {
    showToastError('请填写货物信息');
    return false;
  }

  if (!/\S/.test(scope.data.goodsRemark)) {
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
function setHalfwaysParams(scope) {
  let halfways = [];
  // 如果中途点数组长度大于1，则将所有中途点（除了最后一个点，因为最后一个点默认为终点）信息丢进新数组作为参数去计算运费
  const aList = scope.data.aHalfwaysList;
  if (aList && aList.length > 1) {
    for (let i = 0; i < aList.length; i++) {
      // 除了最后一个点是终点，其他都是中途点
      if (i < aList.length - 1) {
        halfways.push(aList[i]);
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
export function getNextstepParams(scope) {
  const sGoodsRemarkDate = formatGhbGoodsRemarkDate(scope.data.bookingTime);
  const sClothsAmount = `${scope.data.clothsAmount && `${scope.data.clothsAmount}件`}`;
  const goodsDesc = `${sGoodsRemarkDate && sGoodsRemarkDate + ' 接货'} ${
    scope.data.goodsRemark
    } ${sClothsAmount}`;

  // 下单所需参数
  const PARAMS_LOGISTICSORDER_REQUEST = {
    type: 1,
    vehicleTypeId: scope.data.carSelected.id,
    bookingTime: scope.data.bookingTime,
    isBooking: scope.data.bookingTime ? true : false,
    clothsAmount: scope.data.clothsAmount,
    couponCodeId: scope.data.couponInfo.id || '',
    goodsDesc,
    insuranceStatus: 0,
    listOfAdditionalRequest: scope.data.aSelected,
    uuid: '',
    needLoading: false,
    paymentType: 1,
    receiverAddressName: scope.data.endInfo.address,
    receiverContact: scope.data.endInfo.name,
    receiverPhone: scope.data.endInfo.mobile,
    receiverSiteName: scope.data.endInfo.siteName,
    receiverStreet: scope.data.endInfo.street,
    receiverX: scope.data.endInfo.location.lng,
    receiverY: scope.data.endInfo.location.lat,
    endCityCode: scope.data.endInfo.cityCode,
    senderAddressName: scope.data.startInfo.address,
    senderContact: scope.data.startInfo.name,
    senderPhone: scope.data.startInfo.mobile,
    senderSiteName: scope.data.startInfo.siteName,
    senderStreet: scope.data.startInfo.street,
    senderX: scope.data.startInfo.location.lng,
    senderY: scope.data.startInfo.location.lat,
    startCityCode: scope.data.startInfo.cityCode,
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
export function getCalcCosts(scope) {
  if (!(scope.data.startInfo.name && scope.data.endInfo.name)) {
    scope.setData({
      costs: null
    });
    return;
  };

  const PARAMS_COSTS_REQUEST = {
    senderX: scope.data.startInfo.location.lng,
    senderY: scope.data.startInfo.location.lat,
    receiverX: scope.data.endInfo.location.lng,
    receiverY: scope.data.endInfo.location.lat,
    vehicleTypeId: scope.data.carSelected.id,
    paymentType: 1,
    isBooking: scope.data.bookingTime ? 'Y' : 'N',
    bookingTime: scope.data.bookingTime ? scope.data.bookingTime : null,
    isBuyInsurance: false,
    needLoading: false,
    couponCodeId: scope.data.couponInfo.id,
    halfways: setHalfwaysParams(scope),
    type: 1,
  };

  ghbRequest({
    url: API.COSTS,
    method: 'POST',
    data: PARAMS_COSTS_REQUEST
  }).then((res) => {
    if (res.statusCode === 200) {

      let costs = res.data;
      costs.amount = formatCurrency(costs.amount);
      costs.zptFreight = formatCurrency(costs.zptFreight);
      costs.nightServiceFee = formatCurrency(costs.nightServiceFee);

      scope.setData({
        costs
      });

    } else if (res.statusCode === 400) {
      wx.showModal({
        title: '温馨提示',
        content: res.data.message,
        showCancel: false,
        success: function (res) {
          // 如果发货地点不在配送范围内，清空发货地信息
          scope.setData({
            startInfo: {}
          });
        }
      });
    } else {
      showToastError(res.data.message);
    }
  });
}

// 清空/重置所有填写项目
export function resetIndex(scope) {

  scope.data.sSelected && scope.data.oSelect.reset();
  scope.data.bookingTime && scope.data.oPicker.reset();
  
  const endInfo = {};
  const clothsAmount = 1;
  const goodsRemark = '';
  const costs = null;
  const couponInfo = {};
  const aHalfwaysList = [{}];

  let carSelected = {
    name: '',
    id: null
  };

  if (scope.data.carTypeList.length) {
    const defaultCarInfo = scope.data.carTypeList[0];
    carSelected.name = defaultCarInfo.name;
    carSelected.id = defaultCarInfo.id;
  }

  scope.setData({
    endInfo,
    clothsAmount,
    goodsRemark,
    costs,
    couponInfo,
    aHalfwaysList,
    carSelected
  });
}