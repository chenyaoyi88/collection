# ghb-mina

广货宝微信小程序

## Build Setup

``` bash
# 安装依赖
npm install

# 开发环境-启动服务 localhost:8080 或者 你的IP:8080
npm run dev

# 生产/正式环境-构建打包
npm run build

# 生产/正式环境-构建打包并且查看打包分析报告
npm run build --report
```

打包后的 dist 文件夹内容为微信小程序最终运行所需文件

## 简述

基于美团点评开源的使用 Vue.js 开发小程序的前端框架 [mpvue](http://mpvue.com/) quickstart 模版，使用的语法规范为 airbnb 风格。

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 框架 BUG 记录

##### 1.08 版本
- slot 插槽里面的内容不能添加事件，换句话说，目前
- 子组件如果是 input ，绑定 value 之后从父组件传属性进去，页面输入值的时候会闪烁

## 注意事项
- 不建议使用小程序 scroll-view 组件里面去加载无限列表，数量过多安卓页面会卡死