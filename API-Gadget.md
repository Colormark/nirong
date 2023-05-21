# 1. 组件安装
 - 打开“ 菜单 > 扩展 > 安装组件 ”，在弹窗中选择租件的文件或文件夹
 - 安装完成后如无报错，一般即可立即使用

# 2. 结构和打包
## 2.1 组件文件夹结构
 > 组件名  *可以任意取名*  
 >>  package.json  *描述组件的信息和结构*  
 >>  design.js  *组件在设计器中用于设计的代码，名称在package.json中申明*  
 >>  render.js  *组件在网页中用于实现组件效果的代码，名称在package.json中申明*  
 >>  setting.json  *描述组件在设计器中，可供用户设置的配置项，名称在package.json中申明，但必须是json结构*  
 >>  其他资源文件或文件夹 *在package.json中申明资源，如：images*  

## 2.2 package.json
``` json
  {  
    "name": "gadgetName",
    "displayName": "图文轮播",
    "supportNREngineVersion": "^1.0",
    "version": "0.0.1",  
    "type": "Widget", 
    "needDatasource": true,  
    "bodyPath": ">.row",  
    "allowWidgetAddon": true,
    "allowOnlyOneInstance": false,
    "notClearBodyAfterAdjust": true,  
    "isContainer": false,
    "canNotAppendSelf": false,
    "isGlobalWidget": false,
    "script": {  
      "design": "design.js", 
      "render": "render.js", 
      "setting": "setting.json" 
    },  
    "gadgetCartButtonIcon": {  
      "svgImage" : "./images/icon.svg", 
      "text": "文字"
    },
    "gadgetExtend":{
      "scripts": ["./scripts/qrcode.js"], 
      "styles":[".."]
    },
    "vendors": [], 
    "designVendors": [],
    "resource": ["./images/"]
  }
```
### 2.2.1 Options 总览

  |  Name  |  Type  | Required  |  Default  |  Description  |
  :- | :- | :-: | :- | :-
  |  name  |  string  |  是  |  -  |  组件名称，请注意唯一性，同名会被覆盖  |
  | displayName | string | 是  | - | 组件显示名称 |
  | supportNREngineVersion | string | 是  | - | 支持的内核版本 |
  | version | string | 是  | - | 版本，高版本会覆盖低版本 |
  | type | Enum | 是  | - | Gadget的类型，可选：Layout、Widget、PageAddon、WidgetAddon |
  | needDatasource | boolean  | 否 | false | 是否需要启用Datasource |
  | bodyPath | string,selctor | 否 | - | 组件Body的selector，用于帮助系统找到组件的body的$DOM |
  | allowWidgetAddon  | boolean  | 否  | true | 允许应用额外附件 |
  | allowOnlyOneInstance  | boolean  | 否  | false | 一个页面中同名组件只允许有一个实例,仅有效于PageAddon类型 |
  | notClearBodyAfterAdjust  | boolean  | 否  | true | 当属性参数面板调整后，不自动清除组件的Body的内容 |
  | isContainer  | boolean  | 否  | false | 说明组件是一个容器，仅用于Layout类型 |
  | canNotAppendSelf  | boolean  | 否  | false | 不能在内部添加自己的实例，仅用于Layout类型 |
  | isGlobalWidget  | boolean  | 否  | false | 是否是全局（全站）组件 |
  | vendors  | Array>Enum  | 否  | - | 引用包的数组对象，同时适用于design、render |
  | designVendors  | Array>Enum  | 否  | - | 引用包的数组对象，只适用于design |
  | resource  | Array>String  | 否  | - | 组件备用资源（随时可被脚本调用），相对于组件文件夹 |
  | script | Object | 是 | - | 指出脚本文件 |
  | script.design | string,file path | 否 | - | 设计用脚本文件，文件名任意，必须在组件目录中 |
  | script.render | string,file path | 是 | - | 渲染用脚本文件，文件名任意，必须在组件目录中 |
  | script.setting | string,file path | 是 | - | 配置用JSON文件，文件名任意，必须在组件目录中  // 暂仅支持JSON格式，因为不规范的Plain Object问题极多 |
  | gadgetCartButtonIcon | Object | 否 | - | 组件选择列表中的组件信息 |
  | gadgetCartButtonIcon.svgImage / image | string,file path | 否 | - | 相对于组件文件夹的图片路径，svgImage和image二选一，建议使用svg，因为可以自动调成与系统一致的颜色 |
  | gadgetCartButtonIcon.text | string,file path | 否 | - | 显示的文字，如不设置，则显示displayName |
  | gadgetExtend | Object | 否 | - | 需要被扩展并默认载入的脚本文件 |
  | gadgetExtend.scripts | Array,file path | 否 | - | js文件 |
  | gadgetExtend.styles | Array,file path | 否 | - | css文件 |


### 2.2.2 组件（Gadget）的类型: type
 - Layout（布局）
 - Widget（独立的web组件，用于展示和交互，Widget必须在Layout中）
 - PageAddon（页面附件，如：网页背景特效）
 - WidgetAddon（web组件附件，如：外框）

### 2.2.3 引用包：vendors/designVendors
vendors/designVendors是个数组，主要防止组件间重复引用一些第三方包，designVendors只用于design（不会用于发布）。    
**系统内置的vendor包括（暂不支持自定义vendor）**:
- 默认载入，无需引用:
  - jquery ```v3.2.1``` 
  - lodash ```v4.0.0```
  - bootstrap ```v5.1.3``` 

- 按需载入:
  - jquery-ui  ```v1.13.2``` 
  - echarts  ```v5.4.0``` 
  - antv-g2  ```v1.13.2``` 
  - antv-g6  ```v3.1.1``` 
  - antv-l7  ```v1.3.0``` 
  - antv-data-set  ```v0.10.1``` 
  - antv-hierarchy  ```v0.5.0``` 

- 仅限开发者预览版(版本号后有Developer Preview标志)
  - react ```18.2.0```
  - antd ```v5.4.5```

## 2.3 脚本design
用于配合用户操作和设计组件的脚本文件. 参考如下：
``` javascript
  module.exports = function(){

      console.log(this) // 返回组件信息

      // NR(this).on 组件实例事件监控， 只有效果与Layout和Widget

      // 当组件的实例被初始化后
      NR(this).on("gadget:initialized", function($gadget, instanceInfo){
        // 返回实例的$DOM和信息
      });

      // 当组件的实例被销毁
      NR(this).on("gadget:destory", function($gadget, instanceInfo){
        // 返回实例的$DOM和信息
      });
      
      // 同样也支持jQuery默认的事件，如：click、mousedown等
      NR(this).on("click", function($gadget, instanceInfo){
          // 返回实例的$DOM和信息
      });
      
  }
```
注意：
- 必需使用 module.exports 
- 相应的方法请参考 NR、NRD的API

## 2.4 脚本render
### 2.4.1 渲染组件效果，系统自动调取该模块，并传入参数：    
```
  module.exports = function($gadget, $body, instanceInfo, reslovedConfig ...){
      // 渲染脚本（内部请使用浏览器支持脚本）
  }
```
注意：
- 该文件需要使用module.exports包裹，内部不可以使用Node.js方法和浏览器不在支持的方法（有些Node、Electron方法浏览器不支持），否则浏览器不识别.
- 后续版本将支持Babel，并支持编译和打包（问题很多，需多加测试）。使用Babel需在package里配置 babel: true。Babel上线后将支持React和Vue。

### 2.4.2 按不同的类型，传入参数不同：  
- Layout,Widget 参数renderScript($gadget, $body, instanceInfo, reslovedConfig);
- WidgetAddon 参数renderScript($gadget, instanceInfo, reslovedConfig, isClear); ```isClear表示需要强制清除既有DOM效果```
- PageAddon 参数renderScript($background, $frontBackground, $specialEffectBackground, instanceInfo, reslovedConfig); ``` instanceInfo.enable 表示实例是否被用户启用（用户既会开启，也会在开启后又选择不使用），如是否则需强制清除既有DOM效果 ```

## 2.5 setting.json
- 当选中组件时，设计器根据setting.json内容自动在属性栏渲染出配置项，当用户设置后，自动保存并将修改后的值传到渲染脚本供刷新组件效果
- json文档是一个数组
- 数组中每一项是一个字典对象（Pairs），代表一个设置项  
  属性包括：
   - control(别名:gadget) 类型，必须
   - label 显示文字
   - id 参数标识，control非header、divider时必须
   - default 默认标识
   - enums 值项
- control类型：
   - header 显示一个表头
      -  info 可选, 附加信息，例如 ```"info": {"title": "致谢", "summary": "此组件基于ECharts开发."}```
   - divider 显示一个分割线
   - text(别名：input) 文本
   - textarea 大段文本
   - number(别名：numberSpinner) 数据微调器
   - range 范围滑动器
      - min, max, step
      - displayValue 是否显示用户设置的值
   - switch 开关选择器
   - checkbox 是否选择器
   - select 选择
      - enums
   - tabs 选项卡 ```该control强制不显示label```
      - enums
   - segmented 分段控件、标签组
      - enums
   - date 日期
   - color(别名：colorPicker) 颜色
   - image(别名：imagePicker) 上传图片
   - datafile(别名：dataPicker) 上传数据文件

   - dynamicFormItems 动态增减嵌套字段
      - defaultItemNumbers 默认渲染的Item数量，默认1
      - maxItemNumbers 可选，最大Item数量
      - minItemNumbers 可选，最小Item数量， 默认1
      - items item项，数组,内部是其他Control

- enums：
   - enums是数组
   - 数组项包括属性：value值，label显示字符标识
- 关联显示：
   - 定义一个显示组
   - targetDisplayGroup 显示组的控制项
   - displayGroup 显示组的控制内容项
   - groupItem 显示组的控制内容项的关联值, 支持字符串和数组两种模式
   - 例如：
   ``` json
    [
      {
            "id": "imageType",
            "control": "tabs",
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
            "control": "upload-image",
            "label": "本地图片文件",
            "displayGroup": "imageTypeChoose",
            "groupItem": "local"
        },
        {
            "id": "url",
            "control": "text",
            "label": "网络图片地址",
            "displayGroup": "imageTypeChoose",
            "groupItem": "remote"
        }
    ]
   ```
- 其他：
   - 当类型是bool时，有额外属性:displayLabelAtRight:bool（显示标签在右边供设置）
   - 当类型是range时，有额外属性:"min", "max", "step"  

   注意：  
   - setting.json文件的字符串信息里不可出现\n（否则会导致发布失败，后面会解决）



 
