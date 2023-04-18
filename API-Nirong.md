# 1. 简介
    一个基于jQuery并类似jQuery原理的JavaScript代码库（框架），实现各类Web组件，支持组件的载入，数据的读取，渲染和编辑，配合Nirong Designer即可实现可视化渲染组件。

# 2. 体系
- 组件（参考[API-Gadget.md](API-Gadget.md)）
- 组件实例。可以视作组件是一个对象(NRGadgetObject，简写成NRObject)，用户添加组件到页面后就是一个组件实例(NRGadgetInstance，简写成NRInstance)，一个组件会有很多实例.

# 3. API
类名： Nirong, NR   
Nirong.registerNRObject 和 NR.registerNRObject 等同.  
 
## 3.1 注册组件
- NR.registerNRObject(gadgetInfo:PlainObject, gadgetType:Enum) ```// 根据类型注册组件, 即将组件对象注册到页面，随时可以被实例，目前此能力由设计器自动实现```   

## 3.2 组件对象及实例
### 3.2.1 对象及实例操作
- NR.getNRObject(selector:Any, type:Enum) ```// 查询组件```   
    - selector：   
        - 当字符串，代表组件对象的name，例如:getNRObject("text")  
        - 当是对象，并且是NRInstance，则根据实例查询组件
    - type 组件对象的类型，非必需

- NR.getAllNRObject()  ``` 获取页面中的所有注册组件对象 ```

- NR.getNRInstance(selector:Any, type:Enum) ```// 返回泥融组件的实例```  
    - selector：   
        - 当字符串，代表组件实例的id，例如:getNRInstance("C2M9VmRf8I6hYLYVDCnLhGn1")  
    - type 组件对象的类型，非必需

- NR.getAllNRInstances()  ``` 获取页面中的所有组件实例，返回数组 ```

- NR.createNRInstance(selector:Any, callback:Function, parentInstanceSelector:Any, appendType:Enum, referInstanceSelector:Any) ```// 创建实例，只创建不渲染``` 
    - selector：   
        - 当字符串，代表组件对象的name 
        - 当是对象，并且是GadgetInfo，则根据组件创建实力
    - callback, 创建后回调该函数，回调函数的传入参数里是该实例的信息
    - parentInstanceSelector，父级实例的ID或PlainObject
    - appendType， 包括："insert","append","prepend", 默认 insert
    - referInstanceSelector，prepend、append等场景时，参考实例的信息

- NR.updateNRInstance(instance:PlainObject) ``` 更新组件实例（不支持WidgetAddon类型），只更新不渲染 ```
- NR.removeNRInstance(selector:Any) ``` 删除组件实例（不支持WidgetAddon类型），只删除不渲染 ```

- NR.filterNRInstances(filter:PlainObject) ``` 过滤查找页面实例（不支持WidgetAddon类型），返回数组 ```

### 3.2.2 实例渲染
- NR.renderGadget(gadgetInfo, instance:PlainObject, appendType) ```// 根据实例信息渲染组件```  
- NR.runRenderGadgetInner($gadget, instanceInfo) ```// 根据实例信息渲染组件内部内容(不含组件本身)```  
- NR.runRenderScript(instanceInfo, reslovedConfig) ```// 运行组件的渲染代码```  
- NR.reRendorNRInstance(instanceInfo)  ```// 根据实例重绘实例```  

## 3.3 画布
- NR("document") ```// 返回文档对象```  
- NR("canvas") ```// 返回画布DOM对象```  
- NR.getBgLayer() ```// 返回背景层的$DOM```  
- NR.getEffectBgLayer() ```// 返回背景特效层的$DOM```  
- NR.getFrontBgLayer() ```// 返回前景层的$DOM```  

## 3.4 画布事件绑定和解绑
- NR(function(){```/* 画布初始化完毕 */```})  

- NR("document").on("eventName", callback)  
   - eventName: dataload ```// 当获取到数据```  

- NR("canvas").on("eventName", callback)  
   - eventName: canvas:click ```// 当画布被点击```  
   - eventName: gadget:click ```// 当画布被点击```  
   - eventName: container:click ```// 当容器被点击```  
   - eventName: layouter:click ```// 当布局器被点击```  

## 3.5 组件事件绑定和解绑
 注意：本节的API只在design.js中有效

### 3.5.1 绑定和解绑
- NR(this).on 绑定事件
- NR(this).off 解绑事件 

### 3.5.2 交互事件
与jQuery一致
- "click" 
- "dblclick" 
- ……
### 3.5.3  时机事件
#### 3.5.3.1  组件初始化事件
- "gadget:beforerender"  ```// 当组件实例后，渲染前 （顺序1） ```
- "gadget:dataload"  ```// 当组件数据加载完 （顺序2） ```
- "gadget:afterrender"  ```// 当组件渲染后 （顺序3） ```

#### 3.5.3.2  组件其他事件
- "gadget:destory"  ```// 当组件删除后 ```
- "gadget:beforerefresh"  ```// 既有组件重新渲染时，该事件触发 ```
- "gadget:stackchange"  ```// 撤销/重做栈发生变化时，该事件触发```
- "canvas:resize"  ```// 画布resize```

## 3.6 数据
### 3.6.1  数据对象
- NR.projectStore() ```// 获取项目数据对象```  
- NR.pageStore() ```// 获取页面数据对象```

### 3.6.2  组件数据
#### 3.6.2.1  在Design中获得数据
此时的this是gadget
- 当组件数据加载完  
 NR(this).on("gadget:initialized", function($gadget, instanceInfo, **gadgetData**){})
- 当组件数据加载完  
 NR(this).on("gadget:dataload", function($gadget, instanceInfo, **gadgetData**){})

- NR(this).setDelegateForGetRemoteData(settings:PlainObject)
```
    // settings 设置委托请求远程动态数据
    {
        url,
        type: post/get
        datatype: json/jsonp/xml/text
    }
``` 

#### 3.6.2.2  在Render中获得数据
此时的this是gadget的instance，静态数据一般不变化，动态数据是委托系统请求的API接口数据
- instance.data ```// 获取静态数据 ``` 
- NR(this).getRemoteData()  ```// 获取远程动态数据 ``` 

### 3.6.3  全局对象
- NR.getPageGlobal(key)  ```// 根据key获取页面全局数据对象``` 
- NR.setPageGlobal(key, obj)  ```// 根据key更新页面全局数据对象``` 
- NR.removePageGlobal(key)  ```// 根据key删除页面全局数据对象``` 

- NR.getAppGlobal(key)  ```// 根据key获取APP全局数据对象``` 
- NR.setAppGlobal(key, obj)  ```// 根据key更新APP全局数据对象```
- NR.removeAppGlobal(key)  ```// 根据key删除APP全局数据对象```   

## 3.7 z-index 体系
 组件开发如不按此约定，将不可避免发生冲突和异常。
 * gadget内部：小于9000， 9000～9999 留给系统
 * 浮动布局：10000～20000， 20001～29999 留给系统
 * 弹窗：30000～40000
 * toast：90000～99999

 获取组件z-index：
 - NR.getLastFrontZIndex()  ```// 获取最前的Z Index``` 
 - NR.getLastBackZIndex()  ```//  获取最后的Z Index``` 

 ## 3.8 小工具
- NR.resolveConfig(defaultSetting:Array, savedConfig:PlainObject) ```// 合成配置```  
- NR.isDesignMode() ```// 是否是设计器状态```  
- NR.uuid(length) // ```创建唯一ID， length默认为24``` 
- NR(this).appendFiles(scripts, styles) ```// 在组件design中添加代码和样式， scripts, styles如是数组则意味加多个，scripts, styles必须在组件目录中```