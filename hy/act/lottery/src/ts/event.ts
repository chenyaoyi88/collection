function clickEvent(): void {
    var oBtnShowOver = document.getElementById('btn-over');
    var oBtnGet = document.getElementById('btn-get');
    var oBtnFocus = document.getElementById('btn-focus');
    var oBtnbtnDownload = document.getElementById('btn-download');
    var oBtnbtnMoney = document.getElementById('btn-money');

    var oModal = document.getElementById('modal');
    var oModalContent = document.getElementById('modal-content');

    oBtnShowOver.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.add('act-over', 'show');
    });

    oBtnGet.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.add('act-get', 'show');
    });

    oBtnFocus.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.add('act-focus', 'show');
    });

    oBtnbtnDownload.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.add('act-download', 'show');
    });

    oBtnbtnMoney.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.add('act-money', 'show');
    });

    // 关闭弹窗
    document.addEventListener('click', function (event) {
        if (event.srcElement.className.includes('modal-close-btn')) {
            oModal.classList.remove('show');
        }
    });
}

export { clickEvent };