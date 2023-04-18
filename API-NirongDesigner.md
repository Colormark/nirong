# 1. 简介
    一个基于jQuery并类似jQuery原理的JavaScript代码库（框架），实现各类Web Designer的应用和插件开发，配合Nirong Designer即可实现可视化渲染组件。
    组件的design和插件都会使用到该框架。

# 2. 体系
- 插件（参考[API-Plugin.md](API-Plugin.md)）
- 组件（参考[API-Gadget.md](API-Gadget.md)）

# 3. API
类名： NRDesigner, NRD  
NRDesigner.getProjectPath() 和 NRD.getProjectPath() 等同.  

## 3.1 项目
- NRD.getProjectPath()  ```// 获取当前打开的项目所在的文件夹```  
- NRD.getAppUserDataPath() ```// 获取应用的用户数据文件夹```  

## 3.2 插件注册
- NRD.registerWithPath(pluginName:String, isCore:Bool) ```// 注册插件```  
- NRD.renderGadgetCartButton(iconInfo:PlainObject, gadgetInfo:PlainObject, keyName:String) ```// 渲染一个按钮到组件列表，keyName是唯一标识(可选)``` 
- NRD.renderPluginButton(iconInfo:PlainObject, gadgetInfo:PlainObject, keyName:String) ```// 渲染一个插件按钮，keyName是唯一标识(可选)```  

## 3.3 Canvas 画布
- NRD("selected") ```// 返回画布中选中的组件```  
- NRD.clearSelect() ```// 清除画布中所有组件的选中状态```  

## 3.4 属性面板
- NRD.registerGeneralSubPanel(id:String) ```// 注册一个通用位置的属性面板，id是唯一key，不存在则自动创建，返回$DOM对象```  
- NRD.registerGadgetSubPanel(id:String) ``` // 注册一个组件位置的属性面板，id是唯一key，不存在则自动创建，返回$DOM对象```  
- NRD.renderAdjustPanel($panel, defaultSetting:Array, savedConfig:Object, callback:function) ```// 渲染参数面板, 当参数调整后，返回callback(adjustedValue:Any, adjustedParameter:PlainObject)```  

## 3.5 调试
- NRD.console.type(msg:Any)  ```// 生成console信息，type是类型，如：error ```
- NRD.showDebugger() ```// 显示调试器 ```
- NRD.clearDebugger() ```// 清除调试器 ```

## 3.6 小工具
- NRD.csvToJson(path) ```// csv转Json ```
- NRD.startWebServer() ```// 启动web预览服务 ```
- NRD.toast(msg, type, ifMoreStayTime, size) ```// toast效果，msg 支持html ```
- NRD.requireFresh() ```// 不同于系统的require，该方法每次require都刷新 ```

## 3.7 Electron、Node
- NRD.remote() ```// 返回Electron对象 ```
- NRD.path() ```// 返回node path对象 ```
- NRD.root() ```// 返回应用程序的脚本的根目录 ```
- NRD.fs() ```// 返回node fs对象 ```
- NRD.fse() ```// 返回node fs-extra对象 ```