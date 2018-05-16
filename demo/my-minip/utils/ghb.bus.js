export function goBackSetData(opts, pageLevel) {
  const options = opts || {};
  const pages = getCurrentPages(); // eslint-disable-line
  const prevPage = pages[pages.length - pageLevel];
  prevPage.setData(options);
}

export function goBackGetData() {
  const pages = getCurrentPages(); // eslint-disable-line
  const currPage = pages[pages.length - 1];
  return currPage.data;
}

export function getOtherPage(pageLevel = 1) {
  const pages = getCurrentPages(); // eslint-disable-line
  const targetPage = pages[pages.length - pageLevel];
  return targetPage;
}

export function isInputEmpty(value, title, icon = 'none') {
  if (!/\S/.test(value)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export function isPhoneNumber(phone, title, icon = 'none') {
  if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(phone)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export function showToastError(title = '网络繁忙，请稍后再试') {
  wx.showToast({
    title,
    icon: 'none'
  });
}

export function ghbRequest(options, isShowing = false) {
  let isToastShowing = false;
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        authorization: wx.getStorageSync('token') || ''
      },
      success: function (res) {
        if (res.statusCode === 401) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2500
          });
          wx.removeStorageSync('token');
          wx.removeStorageSync('mobile');
          isToastShowing = true;
        }
        resolve(res);
      },
      fail: function (err) {
        showToastError();
        reject('fail');
      },
      complete: function () {
        if (isToastShowing) return;
        if (!isShowing) {
          wx.hideLoading();
        }
        reject('complete');
      }
    });
  });
}

export function getDesText(des) {
  let retStr = '';
  if (des === 'start') {
    retStr = '发货';
  } else if (des === 'end') {
    retStr = '收货';
  }
  return retStr;
}

export function getOrderStatusText(data) {

  let statusText = '';
  switch (data.status) {
    case -10:
      statusText = "已取消";
      break;
    case 10:
      // 立即支付
      statusText = "正在寻找司机";
      if (data.paymentType == 1) {
        if (data.paymentStatus == 0 || data.paymentStatus == 10) {
          statusText = "下单未支付";
        }
      } else {
        // 货到付款，支付保费
        if (data.paymentStatus == 0) {
          if (data.insuranceStatus == 1) {
            statusText = "未支付保费";
          }
        }
      }
      break;
    case 20:
      statusText = "已有司机接单";
      break;
    case 30:
      statusText = "正在装货";
      break;
    case 40:
      statusText = "运送中";
      break;
    case 50:
      statusText = data.paymentType == 2 ? '货已送达，对方未付款' : '已送达目的地';
      break;
    case 60:
      statusText = "已完成";
      break;
  }
  return statusText;
}

/**
 * 将 年-月-日 时:分:秒处理成格式：月-日 时:分 返回
 * 
 * @export
 * @param {string} sDate 年-月-日 时:分:秒
 * @returns 
 */
export function formatGhbGoodsRemarkDate(sDate) {
  if (sDate) {
    const aTime = sDate.split(' ');
    let rTime = '';
    if (aTime && aTime.length) {
      const sTimeMD = aTime[0];
      const sTimeHM = aTime[1];
      const aTimeMD = sTimeMD.split('-');
      const aTimeHM = sTimeHM.split(':');
      rTime = `${aTimeMD[1]}-${aTimeMD[2]} ${aTimeHM[0]}:${aTimeHM[1]}`;
      return rTime;
    } else {
      return sDate;
    }
  } else {
    return sDate;
  }
}