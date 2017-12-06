
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
function ajax(options): Promise<any> {
    options = options || {};
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

const devTool = {
    domReady: function (callback: Function): void {
        document.addEventListener('DOMContentLoaded', function () {
            callback && callback();
        });
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
    modal: {
        show: function (options?) {
            options = options || {};
            if (document.getElementById('modal')) {
                return false;
            }

            document.body.insertAdjacentHTML(
                'beforeend',
                `
                <div class="modal show ${options.modalClass || 'act-busy'}" id="modal">
                    <div class="modal-wrap">
                        <div class="modal-content" id="modal-content">
        
                            <div class="modal-text-wrap ${options.textWrapClass || 'modal-busy'}" id="modal-text-wrap">
                                <div class="modal-text">
                                    <p class="text">网络繁忙，请稍后再试</p>
                                </div>
                            </div>
        
                            <div class="modal-btn-wrap" id="modal-btn-wrap">
                                <div data-id="modal-close" class="modal-close-btn modal-btn">知道了</div>
                            </div>

                        </div>
                        <div data-id="modal-close" class="modal-close-btn modal-close"></div>
                    </div>
                </div>
                `
            );

            const oModal = document.getElementById('modal');
            const oModalContent = document.getElementById('modal-content');
            const oModalTextWrap = document.getElementById('modal-text-wrap');
            const oModalBtnWrap = document.getElementById('modal-btn-wrap');
            if (options.contentHtml) {
                oModalContent.innerHTML = options.contentHtml;
            }
            if (options.textWrapHtml) {
                oModalTextWrap.innerHTML = options.textWrapHtml;
            }
            if (options.btnWrapHtml) {
                oModalBtnWrap.innerHTML = options.btnWrapHtml;
            }
            const fnModalClose = function (event: any) {
                const target = event.srcElement;
                const targetID = target['dataset'].id;
                if (targetID === 'modal-close') {
                    document.body.removeChild(oModal);
                    document.removeEventListener('click', fnModalClose, false);
                }
            };

            document.addEventListener('click', fnModalClose, false);


        }
    },
    loading: {
        show: function () {
            document.body.insertAdjacentHTML(
                'beforeend',
                `<div class="loading" id="loading">
                    <div class="timer"></div>
                </div>`
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
                // Android 买家
                window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.highsunbuy';
            } else {
                // Android 司机
                window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.highsun.driver';
            }
        } else {
            window.location.href = '//www.guanghuobao.com/android/ghb-seller.apk';
        }
    }
};


export { ajax, devTool };

// <div class="modal" id="modal">
//     <div class="modal-wrap">
//         <div class="modal-content" id="modal-content">

//             <!-- 网络繁忙，请稍后再试 -->
//             <div class="modal-text-wrap modal-busy">
//                 <div class="modal-text">
//                     <p class="text">网络繁忙，请稍后再试</p>
//                 </div>
//             </div>

//             <!-- 活动已结束 -->
//             <div class="modal-text-wrap modal-over">
//                 <div class="modal-text">
//                     <p class="text">活动已结束</p>
//                     <p class="text">感谢参与</p>
//                 </div>
//             </div>
            
//             <!-- 已领奖 -->
//             <div class="modal-text-wrap modal-get">
//                 <div class="modal-text">
//                     <p class="text">您已领取过本次奖励</p>
//                     <p class="text">感谢参与</p>
//                 </div>
//             </div>
            
//             <!-- 先关注 -->
//             <div class="modal-text-wrap modal-focus">
//                 <div class="modal-qrcode-wrap">
//                     <img class="modal-qrcode" src="images/lottery/modal-qrcode.png" alt="">
//                 </div>
//                 <div class="modal-text">
//                     <p class="text">请先关注“广货宝”公众号</p>
//                     <p class="text-gray">奖励会通过广货宝公众号发送给您</p>
//                 </div>
//             </div>

//             <!-- 中奖，需要下载 -->
//             <div class="modal-text-wrap modal-download">
//                 <div class="modal-price" id="modal-price">
//                     5元
//                 </div>
//                 <div class="modal-text">
//                     <p class="text">恭喜您抽中5元现金红包</p>
//                     <p class="text-gray">请下载广货宝叫车端或广货宝司机端注册成为会员在个人微信钱包中查收</p>
//                 </div>
//                 <div class="download-btn-wrap">
//                     <a class="download-btn c-user" href="javascript:;">下载广货宝叫车端</a>
//                     <a class="download-btn c-driver" href="javascript:;">下载广货宝司机端</a>
//                 </div>
//             </div>

//             <!-- 已抽中 -->
//             <div class="modal-text-wrap modal-money">
//                 <div class="modal-price" id="modal-price">
//                     5元
//                 </div>
//                 <div class="modal-text">
//                     <p class="text">恭喜您抽中5元现金红包</p>
//                     <p class="text-gray">已存入您的个人微信钱包，请查收</p>
//                 </div>
//                 <div class="modal-btn-wrap money-btn-wrap">
//                     <div class="modal-close-btn  modal-btn" id="modal-btn-money">确定</div>
//                 </div>
//             </div>

//             <div class="modal-btn-wrap">
//                 <div class="modal-close-btn modal-btn">知道了</div>
//             </div>
//         </div>
//         <div class="modal-close-btn modal-close"></div>
//     </div>
// </div>