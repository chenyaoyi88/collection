# 一个简单的短信验证码

一个简单的短信验证码，请求完成之后调用执行，即可开始倒计时，倒计时完成之后恢复到原始状态，有基本的 倒计时停止、继续和重置方法调用。

### 适用平台

移动端、PC 端

### 例子

```html
<div id="msg-vcode"></div>
```

```javascript
var msgVcode = new MsgVcode({
  id: 'msg-vcode',
  class: 'msg-vcode',
  activeClass: 'active',
  btnText: '我的验证码',
  time: 10,
  control: function(oVcode) {
    console.log(oVcode);

    window
      .fetch(
        'https://www.easy-mock.com/mock/5a682d3d3d63972d717dc4bd/plugins/test/success'
      )
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.code === '0000') {
          oVcode.run();
        }
      });
  }
});
```

==注：详细例子可参考同目录下的 index.html==

### 参数说明

| Name        | Type     | Default    | Description        |
| ----------- | -------- | ---------- | ------------------ |
| id          | _String_ | none       | 元素 ID            |
| class       | _String_ | msg-vcode  | 验证码包裹框的样式 |
| activeClass | _String_ | active     | 验证码按钮的样式   |
| btnText     | _String_ | 获取验证码 | 验证码按钮文字     |
| time        | _Number_ | 60         | 倒计时的秒数       |

### 方法说明

```
var msgVcode = new MsgVcode(参数);
```

| Name                | Description |
| ------------------- | ----------- |
| msgVcode.stop()     | 暂停        |
| msgVcode.continue() | 继续        |
| msgVcode.reset()    | 重置        |
