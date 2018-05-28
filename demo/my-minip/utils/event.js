// 全局事件
const events = {};

/**
 * 监听事件
 * 
 * @export
 * @param {any} name 事件名
 * @param {any} scope 作用域
 * @param {any} callback 回调
 */
export function eventBusOn(name, scope, callback) {
    const arr = [scope, callback];
    const callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.push(arr);
    } else {
        events[name] = [arr];
    }
}

/**
 * 移除事件
 * 
 * 
 * @export
 * @param {any} name 事件名
 * @param {any} scope 作用域
 */
export function eventBusRemove(name, scope) {
    const callbacks = events[name];
    if (Array.isArray(callbacks)) {
        events[name] = callbacks.filter((arr) => {
            return arr[0] != scope;
        })
    }
}

/**
 * 发送事件
 * 
 * @export
 * @param {any} name 事件名
 * @param {any} data 发送的数据
 */
export function eventBusEmit(name, data) {
    const callbacks = events[name];
    if (Array.isArray(callbacks)) {
        callbacks.map((arr) => {
            const scope = arr[0];
            const callback = arr[1];
            callback.call(scope, data);
        })
    }
}

export const ghbEvent = {
    getSiteInfo: 'getSiteInfo',
    getSelectedCartype: 'getSelectedCartype',
    getCoupon: 'getCoupon',
    getGoodsRemark: 'getGoodsRemark',
    gobackReload: 'gobackReload',
    resetIndex: 'resetIndex',
    resetOrderList: 'resetOrderList',
    resetMe: 'resetMe'
};