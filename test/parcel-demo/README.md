# parcel 打包 DEMO

官方地址：(https://parceljs.org/)[https://parceljs.org/]

### 此工具的作用和意义

目前流行的的打包工具配置过于个性化，以及开发习惯较多导致配置复杂（如目前流行的 webpack），开发人员开发一个项目需要花费大量的时间去配置一个的开发/测试/生产配置，很多情况下配置所需时间比项目开发时间还多，此工具的目的是实现极速零配置Web应用打包工具，让开发人员专注于业务开发。

### 开发需求

测试一下看看是否满足一般项目的开发需求：

- 是否支持 javascript typescript 混合开发以及导入导出 √
- 是否支持 ES6 语法 √
- 是否支持 sass css 混合开发以及导入 √
- 是否支持 静态资源压缩 + 打包 √
- 是否支持 代码拆分 - 暂未测试
- 是否支持 自定义环境变量 - 暂未支持

### 相关命令

```bash
# 开发
npm start

# 打包-测试环境
npm run build:test

# 打包-生产/正式环境
npm run build:prod

或者 

npm run build

# 删除文件夹（删除 prod test dist 文件夹）
npm run clean
```

### 目前测试发现的问题

2018.01.09

- 暂未测试是否满足大型项目带框架的的开发需求（react vue angular）
- 暂时不支持自定义变量设置环境变量，官方开发人员称相关代码已推送到 master 分支，但是还没发布到 npm （https://github.com/parcel-bundler/parcel/pull/258）
- 暂未发现可以自定义静态资源输出格式相关设置文档，目前所有静态资源只能打包到同一个文件夹里面（css js html img 文件全部在同一层，没有文件夹区分开来）
- 有时候修改了页面没有几时热替换或者热更新，需要手动
