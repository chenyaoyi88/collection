const modalConfigMap = function (type: string, price?: number) {
    let modalConfig = {};
    let oClass = {
        modalClass: `act-${type}`,
        textWrapClass: `modal-${type}`
    };
    switch (type) {
        case 'over':
            modalConfig = {
                oClass,
                textWrapHtml: `
                    <div class="modal-text">
                        <p class="text">活动已结束</p>
                        <p class="text">感谢参与</p>
                    </div>
                `
            }
            break;
        case 'get':
            modalConfig = {
                oClass,
                textWrapHtml: `
                        <div class="modal-text">
                            <p class="text">您已领取过本次奖励</p>
                            <p class="text">感谢参与</p>
                        </div>
                    `
            }
            break;
        case 'focus':
            modalConfig = {
                oClass,
                textWrapHtml: `
                        <div class="modal-qrcode-wrap"></div>
                        <div class="modal-text">
                            <p class="text">请先关注“广货宝”公众号</p>
                            <p class="text-gray">奖励会通过广货宝公众号发送给您</p>
                        </div>
                    `
            }
            break;
        case 'download':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                    <div class="modal-price">${price || '--'}元</div>
                    <div class="modal-text">
                        <p class="text">恭喜您抽中${price || '--'}元现金红包</p>
                        <p class="text-gray">请下载广货宝叫车端或广货宝司机端注册成为会员在个人微信钱包中查收</p>
                    </div>
                    <div class="download-btn-wrap">
                        <a class="download-btn c-user" href="javascript:;">下载广货宝叫车端</a>
                        <a class="download-btn c-driver" href="javascript:;">下载广货宝司机端</a>
                    </div>
                    `
            }
            break;
        case 'money':
            modalConfig = {
                modalClass: `act-${type}`,
                textWrapClass: `modal-${type}`,
                textWrapHtml: `
                <div class="modal-price">${price || '--'}元</div>
                <div class="modal-text">
                    <p class="text">恭喜您抽中${price || '--'}元现金红包</p>
                    <p class="text-gray">已存入您的个人微信钱包，请查收</p>
                </div>
                <div class="modal-btn-wrap money-btn-wrap">
                    <div data-id="modal-close" class="modal-close-btn  modal-btn">确定</div>
                </div>
                `
            };
            break;
    }
    return modalConfig;
}

export { modalConfigMap }; 