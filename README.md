# 泥融 - 数据展示设计器
(暂未达到可开源的程度，仅提供客户端). 
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
 - 客户短内置一个轻量级版本的web服务器，在发布成功界面中可直接启动，并在浏览器中浏览制作好的页面

## 组件开发
1. 定制组件的开发和安装可以文档参考“[API.md](https://github.com/Colormark/nirong/blob/main/API.md)”
2. 参考组件[qrcode](https://github.com/Colormark/nirong/tree/main/qrcode-a_demo_of_Nirong_gadget).
3. 组件开发好后，可无需打包，直接在添加组件界面中选文件夹并提交即可
