# 总览
## 插件(设计器用)package.json
```
  {  
    "name": "pluginName", // 插件名称，请注意唯一性，同名会被覆盖
    "version": "0.0.1", // 版本，高版本会覆盖低版本
    "supportEngineVersion": "^1.0", // 支持的内核   
    "main": "index.js" // 入口文件  
  }
```
## 组件(页面组件元素)package.json
```
  {  
    "name": "gadgetName", // 组件名称，请注意唯一性，同名会被覆盖
    "supportNREngineVersion": "^1.0", // 支持的内核版本
    "version": "0.0.1", // 版本，高版本会覆盖低版本  
    "type": "Gadget", // Gadget或Layout或GadgetAddon  
    "needDatasource": true, // 可选，是否需要启用Datasource  
    "bodyPath": ">.row", // 可选，组件Body的selector  
    "notClearBodyAfterAdjust": true, // 可选，当属性参数面板调整后，不清除组件的Body  
    "script": {  
      "design": "design.js", // 设计文件，必须在组件目录中  
      "setting": "setting.json", // 配置项，必须在组件目录中  
      "render": "render.js",  // 渲染文件，必须在组件目录中， 该文件的module.exports内部不可以使用Node.js方法和浏览器不在支持的方法  
      "vendors": [] //  vendor数组对象，例如："echart"   
    },  
    "gadgetCartButtonIcon": {  
      "iconfont": "&#xe9e6;", //iconfont模式  
      "svgImage" : "./images/icon.svg", //相对于组件文件夹的图片路径，svgImage和image二选一  
      "text": "文字"  
    },
    "gadgetExtend":{ // 可选。组件扩展的文件路径，相对于组件文件夹
      "scripts": ["./scripts/qrcode.js"], 
      "styles":[".."]
    },
    "resource": ["./images/"] // 可选。 组件备用资源（随时可被脚本调用），相对于组件文件夹
  }
```
## 自定义组件的按钮
 - 在组件列表的标题栏右边点击“+”按钮，在弹窗中选择组件文件或文件夹

## 内核组件和插件的安装
 - 组件在项目根目录的"src/gadgets"  
 - 插件在项目根目录的"src/plugins"  
 - 在"src/renderer/pages/Designer/js/init.js" 中安装组件和插件 

---------- 

# 设计器系统
类名： NRDesigner, NRD  

## 项目
- NRD.getProjectPath()  ```// 获取当前打开的项目所在的文件夹```  
- NRD.getUserDataFolder() ```// 获取应用的用户数据文件夹```  

## 插件注册
- NRD.registerWithPath(pluginName:String, isCore:Bool) ```// 注册插件```  
- NRD.renderGadgetCartButton(iconInfo:Object, gadgetInfo:Object, keyName:String) ```// 渲染一个按钮到组件列表，keyName是唯一标识(可选)```  

## Canvas 画布
- NRD("selected") ```// 返回画布中选中的组件```  
- NRD.clearSelect() ```// 清除画布中所有组件的选中状态```  

## 属性面板
- NRD.registerGeneralSubPanel(id:String) ```// 注册一个通用位置的属性面板，id是唯一key，不存在则自动创建，返回DOM对象```  
- NRD.registerGadgetSubPanel(id:String) // ```注册一个组件位置的属性面板，id是唯一key，不存在则自动创建，返回DOM对象```  
- NRD.renderAdjustPanel($panel, defaultSetting:Array, savedConfig:Object, callback:function) ```// 渲染参数面板, 当参数调整后，返回callback(adjustedValue:Any, adjustedParameter:Object)```  

----------

# 网页组件系统
 类名： Nirong, NR  
 组件类型分为Layout（布局）、Gadget（一般组件）两种，系统先渲染Layout，再渲染Gadget，Gadget必须在Layout中  
## 注册组件
- NR.registerNRGadgetObject(gadgetInfo:Object) ```// 注册一般组件```  
- NR.registerNRLayoutObject(layoutInfo:Object) ```// 注册布局组件```  

## 组件及组件实例
- NR.getNRObject(selector:Any, type:Enum<"Layout", "Gadget">) ```// 查询组件```   
 selector解释：   
 > - 当字符串，代表组件对象的name,type分为"Layout", "Gadget"，可以简写为"!", "#", 也可以写在selector前面，例如:getNRObject("!AAABBB")  
 > - 当是对象，并且是Instance，则不需要传入type分为  
- NR.getNRInstance(selector:Any, type:Enum<"Layout", "Gadget">) ```// 返回泥融组件的实例```  
selector解释：   
 > - 当字符串，代表组件实例的id,type分为"Layout", "Gadget"，可以简写为"!", "#", 也可以写在selector前面，例如:getNRInstance("!CCCDDD")  
 > - 可以简写成 NR(selector) 模式  
- NR.createLayoutInstance(selector:Any, domBuildFunc:function回调, parentInstanceSelector:Any父级容器, appendType:Enum<"insert","append","prepend">) ```//创建布局实例```   
- NR.createLayoutInstance(selector:Any, domBuildFunc:function回调, parentInstanceSelector:Any父级容器, appendType:Enum<"insert","append","prepend">) ```//创建布局实例```   

- NR.renderGadget(gadgetInfo, savedInstanceInfo, appendType) ```// 渲染组件```  
- NR.runRenderGadgetInner($wrapper, savedInstanceInfo) ```// 渲染组件内部内容```  
- NR.runRenderScript(instanceInfo, reslovedConfig) ```// 运行组件的渲染代码```  

## 画布
- NR("document") ```// 返回文档对象```  
- NR("canvas") ```// 返回画布DOM对象```  
- NR.getBgLayer() ```// 返回背景层的$DOM```  
- NR.getEffectBgLayer() ```// 返回背景特效层的$DOM```  
- NR.getFrontBgLayer() ```// 返回前景层的$DOM```  

## 事件
- NR(function(){```/* 画布初始化完毕 */```})  
- NR("document").on("eventName", callback)  
 > - eventName: dataload ```// 当获取到数据```  
- NR("canvas").on("eventName", callback)  
 > - eventName: canvas:click ```// 当画布被点击```  
 > - eventName: gadget:click ```// 当画布被点击```  
 > - eventName: container:click ```// 当容器被点击```  
 > - eventName: layouter:click ```// 当布局器被点击```  

## 数据
- NR.projectStore() ```// 获取项目数据对象```  
- NR.pageStore() ```// 获取页面数据对象```  

## 小工具
- NR.resolveConfig(defaultSetting:Array, savedConfig:Object) ```// 合成配置```  
- NR.isDesignMode() ```// 是否是设计器状态```  
- NR.uuid(length) // ```创建唯一ID， length默认为24```  
- NR(this).appendFiles(scripts, styles) ```// 在组件design中添加代码和样式， scripts, styles如是数组则意味加多个，scripts, styles必须在组件目录中```  

----------



