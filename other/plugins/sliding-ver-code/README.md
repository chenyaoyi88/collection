# 一个简单的滑动验证码

一个简单的滑动验证码，手指拖动到终点松开之后才做判断是否到达了终点，到达了则通过，没有到达则滑动返回。

### 适用平台

移动端、PC 端

### 例子

本地例子：同目录下的 index.html

线上例子：[http://slide-vcode.surge.sh](http://slide-vcode.surge.sh)

```html
<div id="vertification"></div>
```

```javascript
new VerDrag('vertification', {
  height: 50,
  class: 'ver-class',
  success: function() {
    console.log('成功回调');
  },
  failed: function() {
    console.log('失败回调');
  }
});
```

### 参数说明

| Name    | Type       | Default         | Description                          |
| ------- | ---------- | --------------- | ------------------------------------ |
| height  | _Number_   | 50              | 验证码包裹框的高度和拖地小滑块的宽度 |
| class   | _String_   | ver-wrap-custom | 验证码包裹框的样式                   |
| success | _Function_ | none            | 成功回调函数                         |
| failed  | _Function_ | none            | 失败回调函数                         |
