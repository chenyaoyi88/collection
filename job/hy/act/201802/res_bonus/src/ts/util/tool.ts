/**
 * 判断是否微信
 * 
 * @returns {boolean} true 是微信，false 不是
 */
function isWeixin(): boolean {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i).length > 0) {
        return true;
    } else {
        return false;
    }
}


interface formatDate_date {
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    min?: number;
    sec?: number;
}

function formatDate(time: any): formatDate_date {
    if (time) {
        const newTime = typeof time === 'number' ? time : parseInt(time);
        const date = new Date(newTime);
        const oRetDate: formatDate_date = {};
        oRetDate.year = date.getFullYear();
        oRetDate.month = date.getMonth() + 1;
        oRetDate.date = date.getDate();
        oRetDate.hour = date.getHours();
        oRetDate.min = date.getMinutes();
        oRetDate.sec = date.getSeconds();
        return oRetDate;
    } else {
        return time || '';
    }
}


const Tool = {

    domReady: function (callback: Function): void {
        document.addEventListener('DOMContentLoaded', function () {
            callback && callback();
        });
    },
    /**
     * url 上面获取参数对应的值
     * @param {*String} text 要显示的文本内容
     */
    getQueryString: function (name: string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return window['unescape'](r[2]);
        };
        return null;
    },
    /**
     * 下载对应的 app
     * 
     * @param {string} [type='other'] 
     */
    appDownload: function (type: string = 'other'): void {
        var ua = navigator.userAgent;
        if (ua.match(/iPad/i) || ua.match(/iPhone/i) || ua.match(/iPod/i)) {
            // 如果是 ios 设备
            if (type === 'buyer') {
                // ios 买家
                window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.highsunbuy';
            } else {
                // ios 司机
                window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.highsun.driver';
            }
        } else if (ua.match(/Android/i) && isWeixin()) {
            // 如果是 Android 设备
            if (type === 'driver') {
                // Android 司机
                window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.highsun.driver';
            } else {
                // Android 买家
                window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.highsunbuy';
            }
        } else {
            window.location.href = '//www.guanghuobao.com/android/ghb-seller.apk';
        }
    }
};

export { isWeixin, Tool, formatDate };