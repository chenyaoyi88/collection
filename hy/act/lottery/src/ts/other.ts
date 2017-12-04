const fnOther = {
    /**
     * 显示弹窗
     * @param modal 弹窗对象
     * @param cname 弹窗类型样式名
     * @param callback 弹窗之后的回调
     */
    showModal: function (modal: HTMLElement, cname: string, callback?: Function): void {
        modal.className = 'modal';
        modal.classList.add(cname, 'show');
        callback();
    }
};

export { fnOther };