# 组件和插件开发指南

## 插件开发
插件用于增强客户端的功能。

### 自定义插件的安装
 - 打开“ 菜单 > 扩展 > 安装插件 ”，在弹窗中选择插件的文件或文件夹
 - 安装完成后如无报错，一般即可立即使用

### 插件文件夹结构
 > 插件名  *可以任意取名*  
 >>  package.json  *描述插件的信息和结构*  
 >>  main.js  *插件代码，名称在package.json中申明*  
 >>  其他资源文件或文件夹 *在package.json中申明资源，如：images*  

### package.json
```
  {  
    "name": "pluginName", // 插件名称，请注意唯一性，同名会被覆盖
    "version": "0.0.1", // 版本，高版本会覆盖低版本
    "supportEngineVersion": "^1.0", // 支持的内核   
    "main": "index.js" // 入口文件
    "icon": { // 插件图标，非必需
      "svgImage" : "./images/icon.svg", // 相对于组件文件夹的图片路径，svgImage和image二选一  
      "position" : "位置名", // 插件图标出现的位置
      "text": "文字" // 非必需
    },
  }
```
 position有几个选择：  
 - "MenuBarLeft" *顶部工具栏左边*
 - "MenuBarRight"  *顶部工具栏右边*
 - "GadgetListHeaderRight" *插件列表头部右边*
 - "DataListHeaderRight" *数据列表头部右边*

### 插件打包
  - 插件开发好后，可无需打包，直接在添加界面中选文件夹并提交即可，也可以压缩成zip包并修改文件类型为(nrp)
  - 以后可能考虑必须用泥融客户端打包

### API
类名： NRDesigner, NRD  

#### 项目
- NRD.getProjectPath()  ```// 获取当前打开的项目所在的文件夹```  
- NRD.getUserDataFolder() ```// 获取应用的用户数据文件夹```  

#### 插件注册
- NRD.registerWithPath(pluginName:String, isCore:Bool) ```// 注册插件```  
- NRD.renderGadgetCartButton(iconInfo:Object, gadgetInfo:Object, keyName:String) ```// 渲染一个按钮到组件列表，keyName是唯一标识(可选)```  

#### Canvas 画布
- NRD("selected") ```// 返回画布中选中的组件```  
- NRD.clearSelect() ```// 清除画布中所有组件的选中状态```  

#### 属性面板
- NRD.registerGeneralSubPanel(id:String) ```// 注册一个通用位置的属性面板，id是唯一key，不存在则自动创建，返回DOM对象```  
- NRD.registerGadgetSubPanel(id:String) // ```注册一个组件位置的属性面板，id是唯一key，不存在则自动创建，返回DOM对象```  
- NRD.renderAdjustPanel($panel, defaultSetting:Array, savedConfig:Object, callback:function) ```// 渲染参数面板, 当参数调整后，返回callback(adjustedValue:Any, adjustedParameter:Object)```  

#### Electron、Node
- NRD.remote() ```// 返回Electron对象 ```
- NRD.path() ```// 返回node path对象 ```
- NRD.fs() ```// 返回node fs对象 ```
- NRD.fse() ```// 返回node fs-extra对象 ```

----------

## 组件系统

### 自定义组件的安装
 - 打开“ 菜单 > 扩展 > 安装组件 ”，在弹窗中选择租件的文件或文件夹
 - 安装完成后如无报错，一般即可立即使用

### 组件文件夹结构
 > 组件名  *可以任意取名*  
 >>  package.json  *描述组件的信息和结构*  
 >>  design.js  *组件在设计器中用于设计的代码，名称在package.json中申明*  
 >>  render.js  *组件在网页中用于实现组件效果的代码，名称在package.json中申明*  
 >>  setting.json  *描述组件在设计器中，可供用户设置的配置项，名称在package.json中申明，但必须是json结构*  
 >>  其他资源文件或文件夹 *在package.json中申明资源，如：images*  

### 组件（Gadget）的类型
 - Layout（布局）
 - Widget（独立的小web组件，用于展示和交互，Widget必须在Layout中）
 - PageAddon（页面附件，如：网页背景特效）
 - WidgetAddon（小web组件附件，如：外框）

### package.json
```
  {  
    "name": "gadgetName", // 组件名称，请注意唯一性，同名会被覆盖
    "supportNREngineVersion": "^1.0", // 支持的内核版本
    "version": "0.0.1", // 版本，高版本会覆盖低版本  
    "type": "Widget", // Gadget的类型  
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
### setting.json
- 当选中组件时，设计器根据setting.json内容自动在属性栏渲染出配置项，当用户设置后，自动保存并将修改后的值传到渲染脚本供刷新组件效果
- json文档是一个数组
- 数组中每一项是一个字典对象，代表一个设置项
  属性项包括：
   - gadget 类型，必须
   - label 显示文字
   - id 参数标识，gadget非header时必须
   - default 默认标识
   - enums 值项
- gadget类型：
   - header 显示一个表头
   - text 文本
   - textarea 大段文本
   - number 数据微调器
   - range 范围滑动器
   - bool 是否选择器
   - select 选择
   - tabs 标签组
   - date 日期
   - color 颜色
   - image 上传图片
   - datafile 上传数据文件
- enums：
   - enums是数组
   - 数组项包括属性：value值，label显示字符标识
- 关联显示：
   - 定义一个显示组
   - targetDisplayGroup 显示组的控制项
   - displayGroup 显示组的控制内容项
   - groupItem 显示组的控制内容项的关联值
   - 例如：
   ```
   {
        "id": "imageType",
        "gadget": "tabs",
        "targetDisplayGroup": "imageTypeChoose",
        "enums": [
            {
                "value": "local",
                "label": "本地"
            },
            {
                "value": "remote",
                "label": "网络"
            }
        ]
    },
    {
        "id": "localImage",
        "gadget": "upload-image",
        "label": "本地图片文件",
        "displayGroup": "imageTypeChoose",
        "groupItem": "local"
    },
    {
        "id": "url",
        "gadget": "text",
        "label": "网络图片地址",
        "displayGroup": "imageTypeChoose",
        "groupItem": "remote"
    }
   ```
- 其他：
   - 当类型是bool时，有额外属性:displayLabelAtRight:bool（显示标签在右边供设置）
   - 当类型是range时，有额外属性:"min", "max", "step"

### API
类名： Nirong, NR   
 
#### 注册组件
- NR.registerNRGadgetObject(gadgetInfo:Object, gadgetType:Enum) ```// 根据类型注册组件```  
- **WARN deprecated弃用** NR.registerNRGadgetObject(gadgetInfo:Object) ```// 注册一般组件```  
- **WARN deprecated弃用** NR.registerNRLayoutObject(layoutInfo:Object) ```// 注册布局组件```  

#### 组件及组件实例
- NR.getNRObject(selector:Any, type:Enum) ```// 查询组件```   
 selector解释：   
   - 当字符串，代表组件对象的name，例如:getNRObject("AAABBB")  
   - 当是对象，并且是Instance，则根据实例查询组件
   - type非必需

- NR.getNRInstance(selector:Any, type:Enum) ```// 返回泥融组件的实例```  
selector解释：   
   - 当字符串，代表组件实例的id，例如:getNRInstance("CCCDDD")  
   - 可以简写成 NR(!selector) 模式, 在id前面加上! 

- NR.createInstance(selector:Any, domBuildFunc:function回调, parentInstanceSelector:Any父级容器, appendType:Enum<"insert","append","prepend">) ```//创建实例``` 
selector解释：   
   - 当字符串，代表组件对象的name 
   - 当是对象，并且是GadgetInfo，则根据组件创建实力

- **WARN deprecated弃用** NR.createLayoutInstance(selector:Any, domBuildFunc:function回调, parentInstanceSelector:Any父级容器, appendType:Enum<"insert","append","prepend">) ```//创建布局实例```   
- **WARN deprecated弃用** NR.createLayoutInstance(selector:Any, domBuildFunc:function回调, parentInstanceSelector:Any父级容器, appendType:Enum<"insert","append","prepend">) ```//创建布局实例```   

- NR.renderGadget(gadgetInfo, savedInstanceInfo, appendType) ```// 渲染组件```  
- NR.runRenderGadgetInner($wrapper, savedInstanceInfo) ```// 渲染组件内部内容```  
- NR.runRenderScript(instanceInfo, reslovedConfig) ```// 运行组件的渲染代码```  

#### 画布
- NR("document") ```// 返回文档对象```  
- NR("canvas") ```// 返回画布DOM对象```  
- NR.getBgLayer() ```// 返回背景层的$DOM```  
- NR.getEffectBgLayer() ```// 返回背景特效层的$DOM```  
- NR.getFrontBgLayer() ```// 返回前景层的$DOM```  

#### 事件
- NR(function(){```/* 画布初始化完毕 */```})  
- NR("document").on("eventName", callback)  
   - eventName: dataload ```// 当获取到数据```  
- NR("canvas").on("eventName", callback)  
   - eventName: canvas:click ```// 当画布被点击```  
   - eventName: gadget:click ```// 当画布被点击```  
   - eventName: container:click ```// 当容器被点击```  
   - eventName: layouter:click ```// 当布局器被点击```  

#### 数据
- NR.projectStore() ```// 获取项目数据对象```  
- NR.pageStore() ```// 获取页面数据对象```  

#### 小工具
- NR.resolveConfig(defaultSetting:Array, savedConfig:Object) ```// 合成配置```  
- NR.isDesignMode() ```// 是否是设计器状态```  
- NR.uuid(length) // ```创建唯一ID， length默认为24``` 
- NR.toast(msg, type, ifMoreTime, size) ```// toast效果 ```
- NR(this).appendFiles(scripts, styles) ```// 在组件design中添加代码和样式， scripts, styles如是数组则意味加多个，scripts, styles必须在组件目录中```  

