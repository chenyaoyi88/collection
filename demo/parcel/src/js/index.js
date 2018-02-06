// 兼容性代码包（注意：js 文件会因为打了兼容包加大200多k）
// import "babel-polyfill";

// 测试导入css（里面包括sass混导，加了autoprefixer补充前缀）--OK
import '../css/index.css';

// es6模块化导入导出测试--OK
import {
    showMsg
} from './module.1';

// 导入图片测试（图片的相对路径）--OK
import imageURL from '../images/test.jpg';

// nodejs读取文件（暂时有BUG）--BUG
import fs from 'fs';

console.log("hello world!");
console.log(showMsg('fuck cyy '));

// 动态插入图片测试--OK
const oImage = document.createElement('img');
oImage.src = imageURL;
oImage.className = 'js-img-test';
oImage.title = '在 js 中动态生成插入的图片';
document.body.appendChild(oImage);

// promise测试--OK
function testPromise(isTrue) {
    return new Promise((resolve, reject) => {
        if (isTrue) {
            resolve('success');
        } else {
            reject(null);
        }
    });
}

testPromise(true).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

// // sync await测试--OK（不用babel-polyfill会报错）
// function sleep(timeout) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('抛出去的结果:');
//         }, timeout);
//     });
// }

// (async function () {
//     console.log('Do some thing, ' + new Date());
//     let data = await sleep(2000);
//     console.log(data + new Date());
// })();

console.log('当前环境：', process);

// // 以字符串形式读取内容 

// // 相对于 index.html 的路径 
// const textString1 = fs.readFileSync('./src/other/test1.txt', 'utf8');
// console.log(textString1);

// // 和 这个 js 文件同在一个目录
// const textString2 = fs.readFileSync(__dirname + '/test2.txt', 'utf8');
// console.log(textString2);