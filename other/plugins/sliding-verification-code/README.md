# 一个简单的滑动验证码

一个简单的滑动验证码

### 如何使用

```html
<div id="vertification"></div>
```

```javascript
new VerDrag('vertification', {
    success: function () {
        console.log('成功回调');
    },
    failed: function () {
        console.log('失败回调');
    }
});
```

