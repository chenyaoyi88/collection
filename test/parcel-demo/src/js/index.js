import '../css/index.css';

import { showMsg } from './module.1';

import imageURL from '../images/test.jpg';

import fs from 'fs';

console.log("hello world!");
console.log(showMsg('fuck cyy '));

const oImage = document.createElement('img');
oImage.src = imageURL;
oImage.className = 'js-img-test';
oImage.title = '在 js 中动态生成插入的图片';
document.body.appendChild(oImage);

// 以字符串形式读取内容 

// 相对于 index.html 的路径 
const textString1 = fs.readFileSync('./src/other/test1.txt', 'utf8');
console.log(textString1);

// // 和 这个 js 文件同在一个目录
// const textString2 = fs.readFileSync(__dirname + '/test2.txt', 'utf8');
// console.log(textString2);

