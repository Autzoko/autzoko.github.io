---
title: Cloudfare与Telegraph-image搭建个人图床
date: 2024-06-21 20:32:22
tags:
- 个人图床
categories:
- Others
---
## 什么是个人图床

简单举例，当在使用markdown或者HTML等文本框架时，插入图片（或其他媒体资源）通常使用两种插入方式：

- 通过本地路径获取；一般通过指定图片在本机或服务器上的路径（一般是绝对路径或者相对路径）来获取图片，图片信息保存在个人媒介上。
- 通过网络URL获取；一般通过指定图片在其他云服务提供商上的URL路径来实时加载图片资源。这个用来保存图片的云服务一般被称为**图床**。

而在写个人博客时，通常希望博文中可以插入一些图片来方便撰写。除了直接在markdown中插入本机图片，使用**个人图床**也是一个较好的选择，尤其适合我这种**访问量低**也不会上传大量图片资源的博主。

## Telegraph-image

*Telegraph-image*相当于一个*Flickr/imgur*的平替，通过在Cloudfare Pages中部署该Function可以起到图片上传和引用等寄存服务。

Telegraph-image的github仓库：[Telegraph-Image](https://github.com/cf-pages/Telegraph-Image)

该仓库的README中也介绍了如何部署该服务，这里只是简单的重复一下。

### 注册Cloudfare

前往[Cloudflare](https://www.cloudflare-cn.com/)（这里使用的国区代理）注册即可。（建议）直接使用个人邮箱注册即可，注册成功后邮箱会收到一封验证邮件，点击验证邮件即可。

### Fork仓库

将Telegraph-image的仓库Fork到自己属下。Fork都是用默认配置，只Fork main分支即可。另一种方法是将该仓库clone到本地再部署，这样比较麻烦故不推荐。

### 部署Telegraph-image

点击Cloudfare侧边栏的Works & Pages栏

![Cloudfare部署：前往Pages](https://telegraph-image-939.pages.dev/file/d90065769142c1717af70.png)

前往Pages界面然后点击”连接到Git“：

![链接Git](https://telegraph-image-939.pages.dev/file/30902cf144842a45b51db.png)

之后点击添加Github账户，添加自己的Github账户。添加成功后选择Fork过来的Telegraph-Image仓库来部署：

![选择Github仓库开始部署](https://telegraph-image-939.pages.dev/file/8b9e5b6c8d8690e64b911.png)

然后点击右下方的**开始设置**按钮。进入下一个页面后可以更改**项目名称**，项目分支仍然是**main**分支，其余配置无需改动（都是空即可）。这一页的内容完成后点击**保存并部署**即可开始部署。

此时网页内会有仿命令行窗口来提示部署进度，最后直至完成。

![点击访问站点](https://telegraph-image-939.pages.dev/file/bab680b450758f45de1ed.png)

代理生成之后会出现访问站点的链接，点击该链接即可前往个人图床网站。在图床网站可以选择文件上传或者直接ctrl-v粘贴，拖拽上传图片。上传图片成功之后会在下方自动生成一个图片链接，复制该链接至需要用到的地方即可（如Markdown，本博客的图片均来自个人图床的链接）。

![个人图床界面](https://telegraph-image-939.pages.dev/file/6cefed96e0d38386abc4f.png)

**到这里一个简单的个人图床就大功告成啦。后续添加图像上传验证Token之类也会慢慢更新，尝试发掘出更多的拓展功能。**
