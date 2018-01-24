# collection

主要是用来收集东西的

### 目录描述

- demo 一些新鲜的工具、框架或者库的demo
- temp 一些临时性的杂物，随时删除的
- other 一些工作上常用到的小功能插件
- job  一些工作上的东西的备份

### 其他工具

surge 

简单几行命令实现静态文件Web发布，可以生成指定或者随机生成任意 surge.sh 下面的二级域名（该域名下的二级域名是谁先占用就算是谁的），目前完全免费，每个邮箱帐号都拥有TB级别的容量。

官方网站：http://surge.sh/

相关命令：

```bash

# 安装
npm i -g surge

或者 

cnpm i -g surge

# 用法
    surge [options]

# 选项:
    -p, --project       要上传的静态文件所在路径 (默认是./)
    -d, --domain        要上传到哪个域名，格式必须是 你想叫什么就叫什么.surge.sh (不填的话就默认随机生成.surge.sh)
    -a, --add           添加协作者 (email 邮箱)
    -r, --remove        移除协作者 (email 邮箱)

# 常用快捷命令
surge 静态文件的路径 要上传到哪个域名

# 其他命令
surge whoami        显示现在登录的是哪个帐号
surge logout        退出登录
surge login         登录帐号，只执行验证步骤
surge list          显示属于你的所有域名
surge teardown      删除属于你的指定域名
```

简单来说，就是命令行输入 surge 之后，按照提示操作就行了。
