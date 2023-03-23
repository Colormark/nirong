# 泥融 - 低代码开发客户端LCDC
(暂仅提供客户端，定制业务请联系10973837@qq.com). 
![软件截图](https://raw.githubusercontent.com/Colormark/nirong/main/UI.png)
## 客户端使用说明
1. 在[Releases](https://github.com/Colormark/nirong/releases)中选择适合你操作系统的版本下载并安装。（Mac下安装失败请[参考](https://www.macw.com/news/2605.html)）
2. 打开客户端，创建一个新项目或选择一个已有的项目，支持导入既有项目，点击编辑进入设计界面。
2. 在设计器界面中
 - 设置背景和背景效果。
 - 添加网格布局组件，在属性栏中添加容器，可以添加多个容器。
 - 选中容器，点击组件列表中的组件，立即添加组件到页面，在组件属性中进行设置。
 - 在组件列表的右上角点“+”按钮可以添加组件。
 - 点击“设计”和“预览”按钮可以切换设计状态和切换状态。
4. 点击“导出”按钮，可以导出页面并发布
 - 添加修改组件及组件的属性，调整布局等操作均不需要重新发布。
 - 向设计器安装一个新组建、添加一个数据源或数据文件等更新较大的操作必须重新发布。
 - 客户端内置一个轻量级版本的web服务器，在发布成功界面中可直接启动，并在浏览器中浏览制作好的页面

## 扩展开发
1. 组件用于实现网页里的各种丰富展示，插件用于增强客户端的功能
2. 扩展开发文档参考“[API.md](https://github.com/Colormark/nirong/blob/main/API.md)”
3. [组件开发参考](https://github.com/Colormark/nirong/tree/main/qrcode-a_demo_of_Nirong_gadget).
4. [插件开发参考](https://github.com/Colormark/nirong/tree/main/a_demo_of_Nirong_plugin)
5. 组件或插件开发好后，可无需打包，直接在添加界面中选文件夹并提交即可，也可以压缩成zip包并修改文件类型，组件为(nrg),插件为(nrp)

## TODO：
 - ~~插件安装~~ 已实现
 - 数据管理器，包括：上传和管理数据源；浏览数据结构；根据数据选择合适的展示组件
 - 项目支持多页，支持菜单链接页面
 - 支持组件的配件模式，例如：边框效果、背景样式等（GadgetAddon）
 - 网页模版
 - 支持远程API Package（远程接口自描述）
 - 支持从服务端批量下载组件
