# 1. 插件安装

 - 打开“ 菜单 > 扩展 > 安装插件 ”，在弹窗中选择插件的文件或文件夹
 - 安装完成后如无报错，一般即可立即使用

# 2. 结构和打包
## 2.1 插件文件夹结构
 > 插件名  *可以任意取名*  
 >>  package.json  *描述插件的信息和结构*  
 >>  main.js  *插件代码，名称在package.json中申明*  
 >>  其他资源文件或文件夹 *如：images*  

## 2.2 package.json
```
  {  
    "name": "pluginName", // 插件名称，请注意唯一性，同名会被覆盖
    "version": "0.0.1", // 版本，高版本会覆盖低版本
    "supportEngineVersion": "^1.0", // 支持的内核   
    "main": "index.js" // 入口文件
    "icon": { // 插件图标，非必需
      "svgImage" : "./images/icon.svg", // 相对于组件文件夹的图片路径，svgImage和image二选一  
      "position" : "位置名", // 插件图标出现的位置
      "text": "文字", // 非必需
      "tooltip": "我是提示" // 非必需，鼠标悬浮提升
    },
  }
```
 position有几个选择：  
 - "MenuBarLeft" *顶部工具栏左边*
 - "MenuBarRight"  *顶部工具栏右边*
 - "GadgetListHeaderRight" *插件列表头部右边*
 - "DataListHeaderRight" *数据列表头部右边*

## 2.3 插件打包
  - 插件开发好后，可无需打包，直接在添加界面中选文件夹并提交即可，也可以压缩成zip包并修改文件类型为(nrp)
  - 以后会考虑用泥融客户端打包并进行加密认证
