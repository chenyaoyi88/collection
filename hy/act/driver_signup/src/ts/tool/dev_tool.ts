
function json2url(json: { t: number }): string {
    json.t = Math.random();
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

/**
 * @description 自己封装的简单 ajax 
 * @param {*Object} options ajax 选项
 * @returns {Promise} 
 * url 提交的 url 
 * data 提交的数据对象
 * timeout 请求超时时间
 * header 需要设置的请求头
 * success 请求成功回调
 * error 请求失败回调
 */
function ajax(options: Ajax<any>): Promise<any> {
    // options = options || {};
    if (!options.url) {
        return;
    }

    options.data = options.data || {};
    options.type = options.type || 'GET';
    options.timeout = options.timeout || 0;
    options.header = options.header || {};

    let xhr = null;
    let timer = null;
    const str = json2url(options.data);

    //1 创建
    xhr = new XMLHttpRequest();

    if (options.type.toUpperCase() === 'GET') {
        xhr.open('GET', options.url + '?' + str, true);
        xhr.send();
    } else {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        for (let pro in options.header) {
            xhr.setRequestHeader(pro, options.header[pro]);
        }
        xhr.send(str);
    }

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            // 完成
            if (xhr.readyState === 4) {
                clearTimeout(timer);
                // 成功
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    options.success && options.success(JSON.parse(xhr.responseText));
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //失败
                    options.error && options.error('error');
                    reject('error');
                }

            }
        };

        if (options.timeout) {
            timer = setTimeout(function () {
                reject('timeout');
                // 终止
                xhr.abort();
            }, options.timeout);
        }
    });

}

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

/**
 * 常用的开发工具，例如截取url参数，toast，loading，modal，下载 app 等弹窗等
 */
const devTool = {
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
     * toast 显示
     * @param {*String} text 要显示的文本内容
     */
    toast: function (text: string) {

        if (document.getElementById('toast')) {
            return false;
        }

        const doc = document.body;
        const toastText = text;

        doc.insertAdjacentHTML(
            'beforeend',
            `<div class='toast' id='toast'>
                <div class='toast-wrap'>
                    <div class='toast-content'>${toastText}</div>
                </div>
            </div>`
        );

        var oToast = document.getElementById('toast');
        var oToastText = oToast.querySelector('.toast-content');

        oToastText.classList.add('slideInUp', 'animated');

        oToastText.addEventListener('webkitAnimationEnd', function () {
            doc.removeChild(oToast);
        });
    },
    loading: {
        show: function (text: string = '加载中') {
            if (document.getElementById('loading')) {
                return false;
            }
            document.body.insertAdjacentHTML(
                'beforeend',
                `
                <div class="loading" id="loading">
                    <div class="loading-timer"></div>
                    <div class="loading-text">${text}</div>
                </div>
                `
            );
        },
        hide: function () {
            const oLoading = document.getElementById('loading');
            if (!oLoading) {
                return false;
            }
            document.body.removeChild(oLoading);
        }
    },
    modal: {
        show: function (options: ShowModal) {

            if (document.getElementById('modal')) {
                return;
            }

            document.body.insertAdjacentHTML(
                'beforeend',
                `<div class="modal act-normal show ${options.modalClass || ''}" id="modal">
                    <div class="modal-wrap animated ${options.modalWrapClass || ''}">
                        <div class="modal-content ${options.contentWrapClass || ''}" id="modal-content">
                            <div class="modal-text-wrap modal-normal ${options.textWrapClass || ''}" id="modal-text-wrap">
                                <div class="modal-text">
                                    <p class="text"></p>
                                </div>
                            </div>
                            <div class="modal-btn-wrap" id="modal-btn-wrap">
                                <div data-id="modal-close-btn" id="modal-confirm" class="modal-btn">${options.confirmText || '知道了'}</div>
                            </div>
                        </div>
                        <div data-id="modal-close-btn" id="modal-close" class="modal-close"></div>
                    </div>
                </div>
                `
            );

            const oModal = document.getElementById('modal');
            const oModalContentWrap = document.getElementById('modal-text-wrap');
            const oModalBtnWrap = document.getElementById('modal-btn-wrap');
            const aModalCloseBtn = document.querySelectorAll('[data-id=modal-close-btn]');

            const removeModal = function (event: any): void {
                event.preventDefault();
                const oTarget = event.srcElement;
                const targetID = oTarget['dataset'].id;
                if (targetID === 'modal-close-btn') {

                    if (oTarget.id === 'modal-confirm') {
                        // 点击确定回调
                        options.confirmCallback && options.confirmCallback();
                    }

                    if (oTarget.id === 'modal-close') {
                        // 点击关闭回调
                        options.closeCallback && options.closeCallback();
                    }

                    document.body.removeChild(oModal);
                    document.removeEventListener('touchend', removeModal, false);
                }
            }

            // 判断字符串里有没有标签
            if (/<[^>]+>/g.test(options.content)) {
                oModalContentWrap.innerHTML = options.content;
            } else {
                oModalContentWrap.innerHTML = `
                <div class="modal-text" id="">
                    <p class="text">${options.content}</p>
                </div>
                `;
            }
            // if (options.confirmHtml) {
            //     // 如果按钮区域是自定义内容的
            // }
            document.addEventListener('touchend', removeModal, false);
        }
    },
    /**
     * 下载对应的 app
     * 
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


export { ajax, devTool };