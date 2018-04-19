export function goBackSetData(opts: any, pageLevel: number) {
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

export function isInputEmpty(value: string, title: string, icon: any = 'none') {
  if (!/\S/.test(value)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export function isPhoneNumber(phone: string, title: string, icon: any = 'none') {
  if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(phone)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export function showToastError(title: string = '网络繁忙，请稍后再试') {
  wx.showToast({
    title,
    icon: 'none'
  });
}

interface GhbRequest {
  url: string;
  method?: string;
  data?: any;
  header?: any;
}

export function ghbRequest(options: GhbRequest): Promise<any> {
  let isToastShowing: boolean = false;
  return new Promise((resolve: any, reject: any) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        authorization: wx.getStorageSync('token') || ''
      },
      success: function (res: any) {
        // console.log(res);
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
      fail: function (err: any) {
        console.log(err);
        showToastError();
        reject('fail');
      },
      complete: function () {
        if (isToastShowing) return;
        wx.hideLoading();
        reject('complete');
      }
    });
  });
}

export function getDesText(des: string) {
  let retStr: string = '';
  if (des === 'start') {
    retStr = '发货';
  } else if (des === 'end') {
    retStr = '收货';
  }
  return retStr;
}

export function getOrderStatusText(code: number): string {
  let statusText: string = '';
  switch (code) {
    case -10:
      statusText = '已取消';
      break;
    case 10:
      statusText = '待接单';
      break;
    case 20:
      statusText = '已接单';
      break;
    case 30:
      statusText = '装货中';
      break;
    case 40:
      statusText = '运输中';
      break;
    case 50:
      statusText = '已送达';
      break;
    case 60:
      statusText = '已完成';
      break;
    default:
  }
  return statusText;
}