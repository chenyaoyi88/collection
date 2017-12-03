function clickEvent(): void {
    var oBtnShowOver = document.getElementById('btn-over');
    var oBtnGet = document.getElementById('btn-get');
    var oBtnFocus = document.getElementById('btn-focus');
    var oBtnbtnDownload = document.getElementById('btn-download');

    var oModal = document.getElementById('modal');
    var oModalClose = document.getElementById('modal-close');
    var oModalContent = document.getElementById('modal-content');
    var oModalIknow = document.getElementById('modal-btn-iknow');

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

    oModalClose.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.remove('show');
    });
    oModalIknow.addEventListener('click', function () {
        oModal.className = 'modal';
        oModal.classList.remove('show');
    });
}

export { clickEvent };