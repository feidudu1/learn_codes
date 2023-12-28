# micro_web_test

> node要用v12版本；server项目安装要求16，启动只需要v12

#### 启动主应用
中央控制器-主应用 main
> 单独启动时 http://localhost:8080

```shell script
cd main # 进入到主项目
npm start # 启动项目
npm start -f # 强制刷新依赖并启动
```

#### 启动子应用
```shell script
# micro_web_test 目录下
npm start 
```

#### 全局启动的命令编写思路
##### run文件思路
- 打开每个子项目、主项目和后端项目的文件夹，运行npm start
- 

#### 主项目介绍

- main 主项目，包含框架代码，位于`micro`目录下。
- 其他为子项目代码。 


#### 子项目分类
> vue2： 9004
> 单独启动时 http://localhost:9004/#/energy

新能源页面、本地车市、首页、搜索、选车、经销商、新能源、车型   

> vue3：9005
> 单独启动时 http://localhost:9005/#/index
> 单独启动时 http://localhost:9005/#/select

车系、对比、询价页、金融购车、降价频道  

> react15：9002
> 单独启动时 http://localhost:9002/#/information
> 单独启动时 http://localhost:9002/#/information-last
> 单独启动时 http://localhost:9002/#/video
> 单独启动时 http://localhost:9002/#/video-last
资讯、视频  

> react16：9003 
> 单独启动时 http://localhost:9003/#/login
我的。计算器，关注度排行，上市新车

##### 后端项目介绍
> localhost:3000
Koa框架
supervisor代替node可以检测到routes文件修改而自动更新服务！
启动成功后，可以看到 localhost:3000， 如 http://localhost:3000/react15/recommended