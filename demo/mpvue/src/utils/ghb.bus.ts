
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
        title
    });
}

interface GhbRequest {
    url: string;
    method?: string;
    data?: any;
    header?: any;
}

export function ghbRequest(options:GhbRequest): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        wx.request({
            url: options.url,
            method: options.method || 'GET',
            data: options.data,
            header: {
                'authorization': wx.getStorageSync('token') || ''
            },
            success: function (res: any) {
                resolve(res);
            },
            fail: function (err: any) {
                console.log(err);
                showToastError();
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    });


}