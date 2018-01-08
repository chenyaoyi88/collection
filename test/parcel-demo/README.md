# 测试 parceljs

测试一下看看是否符合开发要求

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


### 目前问题

2018.01.08

- 暂时不支持自定义变量设置环境变量，官方开发人员称相关代码已推送到 master 分支，但是还没发布到 npm （https://github.com/parcel-bundler/parcel/pull/258）
