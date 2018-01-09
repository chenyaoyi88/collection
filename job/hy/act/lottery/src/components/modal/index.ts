import './modal.scss';

const modal = {
    show: function (options?: any) {

        if (document.getElementById('modal')) {
            return;
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
    
                        <div class="modal-btn-wrap" id="modal-confirm">
                            <div data-id="modal-close" class="modal-close-btn modal-btn">知道了</div>
                        </div>

                    </div>
                    <div data-id="modal-close" id="modal-close" class="modal-close-btn modal-close"></div>
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

        const removeModal = function (event: any) {
            event.preventDefault();
            const oTarget = event.srcElement;
            const targetID = oTarget['dataset'].id;
            if (targetID === 'modal-close') {

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
        };

        document.addEventListener('touchend', removeModal, false);
    }
};

export { modal };