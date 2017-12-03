
const APP_ENV = process.env.NODE_ENV || 'production';
// 非生产环境，将 index.html 导进来，从而达到修改 html 文件的时候触发 reload
if (APP_ENV !== 'production') {
    require('../../index.html');
} else {
    console.log = function () { };
}
console.log('当前环境：' + APP_ENV);

let requestHost = '';

switch (APP_ENV) {
    case 'development':
        // 开发环境
        requestHost = '';
        break;
    case 'test':
        // 测试环境
        requestHost = '';
        break;
    case 'ready':
        // 仿真/预生产
        requestHost = '';
        break;
    case 'production':
        // 正式/生产
        requestHost = '';
        break;
}

const api = {
    url1: '',
    url2: ''
};

export { api };