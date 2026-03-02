# 简介

欢迎使用 Eagle Plugin API！通过使用我们的 API，开发者可以方便地扩展 Eagle 应用的功能。我们希望通过提供开放的 API，为开发者提供更多的创造空间，从而丰富 Eagle 应用的插件生态。

***

## 插件类型 <a href="#cxe1h" id="cxe1h"></a>

首先，让我们来介绍 Eagle 插件的四种类型：

1. **窗口插件**\
   当用户点击时执行，并弹出一个插件窗口。这种插件可以提供与用户交互的功能。
2. **背景服务插件**\
   随着应用程序启动，会自动在背景中打开，并常驻在系统背景中。
3. **格式擴展插件**\
   用于强化或扩展 Eagle 应用程序尚未支持的文件格式，包含缩略图、显示工具等。这种插件可以让用户在 Eagle 应用中打开更多格式的文件，例如新的图像格式或视频格式。
4. **检查器扩展插件**\
   用于增强 Eagle 右侧检查器的功能，允许针对不同文件格式显示对应的数据信息，如额外的属性、预览、地图、EXIF 信息等。

以上四种插件类型都有各自的用途和特点，根据您的需求，您可以选择不同类型的插件来实现您想要的功能。


了解更多：[插件类型详细说明](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types)

***

## 基于 Web 技术 <a href="#hvhxa" id="hvhxa"></a>

Eagle Plugin 是基于 Web 技术开发的，使用 JavaScript 语言编写。通过使用 API，开发者可以创建自己的插件，并使用 HTML、CSS 和 JavaScript 等 Web 技术来扩展浏览器的功能。

另外，Eagle Plugin API 不受跨域限制（CORS）的影响，因此可以访问任何网址。这个特性非常有用，因为它允许插件访问多个不同的数据源，从而实现更多的功能。

目前，Eagle Plugin API 基于 Chromium 107 和 Node 16，因此不需要考虑网页兼容性问题。开发人员可以放心地使用最新的 Web 技术，而不必担心在不同浏览器或操作系统上的兼容性问题。

***

## 支持 NodeJS 原生 API 及第三方模块 <a href="#z5f3h" id="z5f3h"></a>

Eagle Plugin 是一款非常强大的 Web 开发插件，它不仅支持各种 Web 技术，还能够支持 Node.js 原生 API 和引入第三方模块。通过这些特性，Eagle Plugin 可以帮助开发人员避免重复造轮子，同时还能大幅提升开发速度。

支持 Node.js 的原生 API。这意味着，开发人员可以使用 Node.js 的各种内置功能，比如文件系统、网络操作、操作系统服务等。这些功能可以让应用执行更复杂的任务，比如读取和写入文件、处理网络请求、实现定时任务等。

支持引入第三方模块。这意味着，开发人员可以直接使用社区提供的模块，而不用自己重复造轮子。这样一来，开发人员可以更专注于业务逻辑的实现，而不用浪费时间在重复的基础功能上。


了解更多：

* [使用 Node.js 原生 API](https://developer.eagle.cool/plugin-api/zh-cn/tutorial/node-js-native-api)
* [使用第三方模块](https://developer.eagle.cool/plugin-api/zh-cn/tutorial/3rd-modules)
  

***

## Eagle Plugin API <a href="#x8e88" id="x8e88"></a>

除了支持原生的 Web / Node.js API，Eagle 插件还可以使用 Eagle 应用提供的插件 API 来存取应用中的文件和数据。这样，可以更容易地完成各种需求，例如：

1. **获取保存的文件**\
   获取 Eagle 应用当前保存的文件和文件夹数据。这样，开发人员可以很容易地访问 Eagle 应用中的文件和文件夹，进行更多操作。
2. **新增或修改文件**\
   新增和修改 Eagle 应用中保存的数据。开发人员可以利用这个功能，在 Eagle 应用中新增或修改数据，并自动保存。
3. **调整插件窗口**\
   调整 Eagle 应用窗口的宽度、高度、位置和置顶等。这样，开发人员就可以自定义Eagle应用的界面，使其更符合自己的需求。
4. **使用剪切版**\
   如文件复制和贴上。开发人员可以使用这些功能，在 Eagle 应用中进行文件复制和粘贴等操作，提高工作效率。

总之，Eagle Plugin API 提供了多种功能，让开发人员可以很好地开发出他们想要的应用。它为 Eagle 应用提供了强大的扩展能力，让应用能够更好地满足用户的需求。你可以点击这里查看 Eagle Plugin API 完整列表。


了解更多：[Eagle Plugin API 参考](https://github.com/eagle-app/eagle-plugin-document/blob/master/zh-CN/broken-reference/README.md)


***

## 支持与感谢 <a href="#c6ta7" id="c6ta7"></a>

尽管Eagle插件系统目前还有很多不足之处，我们一直在努力改进它。如果您有任何想法或建议，我们非常欢迎您的反馈。请与我们联系，让我们一起改进插件系统，为用户提供更好的体验。

我们期待您的参与，共同打造更棒的插件生态！

# 你的第一个插件

## 获取 Eagle 桌面应用程序 <a href="#htif1" id="htif1"></a>

首先，您需要安装 Eagle 桌面应用程序。您可以点击此处下载安装程序：<https://eagle.cool/download>，如果您已经安装了 Eagle 桌面应用程序，请确保您已更新到最新版本。我们已专门添加了多项功能，以便为您提供更好的插件开发体验。

***

## 建立插件 <a href="#u0omz" id="u0omz"></a>

1. 点击工具栏上的 「插件」 按钮。

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-b91993a64e8f72b078e1bd013383d2cacbba7217%2Fimage.png?alt=media" alt=""><figcaption></figcaption></figure>
2. 在弹出的菜单中，选择 「开发者选项」。

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FMv8hmufGycFcbaDeiQB7%2Fimage.png?alt=media&#x26;token=efc1c679-6251-4954-aa8f-973c4ce6f51e" alt=""><figcaption></figcaption></figure>
3. 点击 「创建插件」。

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FmzR0lXtwCmjmD1ZJcLdr%2Fimage.png?alt=media&#x26;token=83419b10-d06f-4b8e-996c-7516d072827f" alt=""><figcaption></figcaption></figure>
4. 在新窗口中，选择您想要创建的插件类型（窗口、背景服务、格式扩展）。这里我们选择 「窗口」 类型。

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-e120bcc55470bf8bc83cb5bada161cf2c3e460f7%2Fimage.png?alt=media" alt=""><figcaption></figcaption></figure>
5. 选择您想要保存插件的位置，然后完成创建。

如果您想更多了解不同插件类型的区别，可以参考[这篇文章](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types)。这些信息将帮助您确定哪种插件类型适合您的需求。

***

## 运行示例插件 <a href="#cpnwm" id="cpnwm"></a>

1. 点击工具栏上的「插件」按钮。
2. 在弹出的菜单中，找到刚才创建的插件，并点击它。
3. 您将看到一个窗口弹出，窗口中显示了插件的基本属性。

***

## 在代码编辑器打开插件目录 <a href="#uclkm" id="uclkm"></a>

插件项目已经创建完成，这时候你可以使用 Visual Studio Code 或其它代码编辑器打开这个文件夹。插件是由多个文件组成的，你需要同时编辑这些文件，因此你需要打开整个文件夹，而不是其中某个文件。

下个章节将详细介绍插件文件结构。

### &#x20;<a href="#vfkpl" id="vfkpl"></a>

# 文件结构概述

插件是指一个包含多个文件的安装包，可直接分发给用户。

<pre><code><strong>Plugin
</strong>├─ manifest.json
├─ logo.png
├─ index.html
└─ js
   └─ plugin.js
</code></pre>

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-4c0b26edd3a41213207a8b086b7d3e328789be3d%2Fimage%20(11).png?alt=media" alt=""><figcaption></figcaption></figure>

***

## manifest.json <a href="#zqpdi" id="zqpdi"></a>

这是每个插件必须拥有的文件。它包含了有关插件的基本信息，如插件的名称、版本、执行代码入口等。不同插件类型有不同的配置方式，以下是「窗口插件」的基本配置：

```json
{
    "id": "LB5UL2P0Q9FFF",
    "version": "1.0.0",
    "name": "Hello World",
    "logo": "/logo.png",
    "keywords": ["keywrod1", "keywrod2"],
    "main":
    {
        "devTools": true,
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

* `id` - 插件 ID
* `version` - 插件版本
* `name` - 插件名
* `logo` - 插件代表图标
* `keywords` - 插件关键字，除了插件名外用户还可以使用这些关键字快速搜索到这个插件
* `main` - 插件窗口程序入口设置
  * `url` - 入口页面
  * `width` - 窗口宽度
  * `height` - 窗口高度


注：你可以查看这篇文章，[了解 `manifest.json`的所有配置方式](https://developer.eagle.cool/plugin-api/zh-cn/tutorial/manifest)。



**完整示例代码：**

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/Window>


## logo.png <a href="#pui04" id="pui04"></a>

对应 `manifest.json`中 `logo`字段。代表插件的图标，它将在插件列表及插件中心使用。请提供分辨率为 128 x 128 的 图像，图标一般应该是PNG格式，因为 PNG 对透明度的支持最好。

***

## index.html <a href="#gmbp0" id="gmbp0"></a>

对应 `manifest.json` 中 `main`字段。这是插件程序的入口文件，插件执行时 `index.html`将被独立载入在独立的浏览器窗口中运行。

# 插件类型

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-47e3ea8d7173a80272eb5e8d066cb03b2064c452%2Fimage.png?alt=media" alt=""><figcaption></figcaption></figure>

Eagle 插件系统提供了四种不同类型的插件，每种都有各自的用途和特点。您可以根据自己的需求选择不同类型的插件来实现您想要的功能，如下表所示：

|                                                                                    插件类型 | 使用场景                             |
| --------------------------------------------------------------------------------------: | -------------------------------- |
|     [窗口](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types/window) | 单次性使用，如：一键抠图、压缩、转格式、导出导入等。       |
|  [背景服务](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types/service) | 背景运行，如：背景同步、图像分析等                |
|  [格式扩展](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types/preview) | 让 Eagle 支持更多格式，提供缩略图、双击预览能力。     |
| [检查器](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types/inspector) | 针对不同文件格式，增强右侧检查器功能，如额外属性、预览、地图等。 |

# 窗口

绝大部分的插件都应该使用这种方式开发。它提供了一个浏览器窗口，你可以在这个窗口中开发想要达成的功能，当用户点击插件时，这个窗口会自动弹出。

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-b8d618997d0dc7e53df2a4b775bb0f4d21e25ed9%2Fimage%20(1).png?alt=media" alt=""><figcaption></figcaption></figure>

我们可以在 `manifest.json` 文件中设置 `main` 字段来设置窗口属性。

{% code lineNumbers="true" %}

```json
{
    "main": {}
}
```

{% endcode %}

为窗口设置默认打开链接`url`：

```json
{
    "main": {
        "url": "index.html"
    }
}
```

设置窗口默认宽度 `width`及高度`height`：

```json
{
    "main": {
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

设置其它 `metadata.json` 字段后，最终代码如下：

{% tabs %}
{% tab title="manifest.json" %}

```json
{
    "id": "LBCZE8V6LPCKD",
    "version": "1.0.0",
    "name": "窗口插件",
    "logo": "/logo.png",
    "keywords": [],
    "main":
    {
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

{% endtab %}

{% tab title="index.html" %}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <script type="text/javascript" src="js/plugin.js"></script>
</head>

<body>
    <div id="message"></div>
</body>
</html>
```

{% endtab %}

{% tab title="plugin.js" %}

```javascript
eagle.onPluginCreate((plugin) => {
    console.log('eagle.onPluginCreate');
    console.log(plugin);
    document.querySelector('#message').innerHTML = `
    <ul>
        <li>id: ${plugin.manifest.id}</li>
        <li>version: ${plugin.manifest.version}</li>
        <li>name: ${plugin.manifest.name}</li>
        <li>logo: ${plugin.manifest.logo}</li>
        <li>path: ${plugin.path}</li>
    </ul>
`;
});

eagle.onPluginShow(() => {
    console.log('eagle.onPluginShow');
});

eagle.onPluginHide(() => {
    console.log('eagle.onPluginHide');
});

eagle.onPluginBeforeExit((event) => {
    console.log('eagle.onPluginBeforeExit');
});
```

{% endtab %}
{% endtabs %}


**看看这段示例代码！**

想要获得灵感吗？快来查看我们的示例代码，这里有更多精彩内容等着你！

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/Window>



**多语言 + 多主题示例代码**

对于那些想要实现多语言国际化（i18n）的开发者来说，这个 GitHub 项目就是你最佳的学习伙伴！点击下面的链接，探索如何巧妙结合 i18n 与多主题设计，为你的应用程序增添多语言支持的魔力。

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/i18n+theme>



注：你可以查看这篇文章，[了解 `manifest.json`的所有配置方式](https://developer.eagle.cool/plugin-api/zh-cn/tutorial/manifest)。


# 背景服務

背景服务插件与[窗口插件](https://developer.eagle.cool/plugin-api/zh-cn/get-started/plugin-types/window)开发方式类似，主要区别在于代码的执行时机。背景服务插件会在软件启动时自动启动，而窗口插件只会在用户点击时执行。要创建一个背景服务插件，只需要在 `manifest.json` 中的 `main` 字段添加 `"serviceMode": true`，如下所示：

```json
{
    "main":
    {
        "serviceMode": true,    // 主要差异
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

背景服务插件也能弹出窗口，你可以在这个窗口显示当前背景任务的进度、状态，以便用户可以清楚地了解插件的当前状态。

最终代码如下：

{% tabs %}
{% tab title="manifest.json" %}

```json
{
    "id": "LBCZEHP8BBO94",
    "version": "1.0.0",
    "name": "Service Plugin",
    "logo": "/logo.png",
    "keywords": [],
    "main":
    {
        "serviceMode": true,
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

{% endtab %}

{% tab title="index.html" %}

```html

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <script type="text/javascript" src="js/plugin.js"></script>
</head>

<body>
    <div>Background services can be without UI, but you can still display the status of background services here.</div>
</body>
</html>
```

{% endtab %}

{% tab title="plugin.js" %}

```javascript
console.log(`Plugins will be created automatically, no need for users to execute them.`);

eagle.onPluginCreate((plugin) => {
    console.log('eagle.onPluginCreate');
    console.log(plugin);
});

eagle.onPluginShow(() => {
    console.log('eagle.onPluginShow');
});

eagle.onPluginHide(() => {
    console.log('eagle.onPluginHide');
});
```

{% endtab %}
{% endtabs %}


**完整示例代码：**

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/Service>



注：你可以查看这篇文章，[了解 `manifest.json`的所有配置方式](https://developer.eagle.cool/plugin-api/zh-cn/tutorial/manifest)。


{% hint style="warning" %}
**注意：** 如果插件执行过程必须依赖相对的资源库路径，你可能需要透过[`onLibraryChanged(callback)`](https://developer.eagle.cool/plugin-api/zh-cn/api/event#g3tny)，在资源库切换时，做出对应的调整，避免程序执行过程发生错误。


# 格式扩展

格式扩展插件的主要目的是使 Eagle 能够预览尚未支持的文件格式。与其他类型插件不同，格式扩展插件在 `manifest.json` 中不需要定义 `main` 属性，而是需要设置 `preview` 属性。以下是一个范例代码：

```json
"preview": {}
```

在 `preview` 中可以定义要扩展的文件扩展名。例如，如果想要让 Eagle 支持 icns 图标格式，可以输入 `"icns": {}`：

```json
"preview" : {
    "icns": {}
}
```

另外，如果你需要同时设定多个扩展名，你可以使用 `,` 将不同扩展名隔开进行定义，比如：

```json
"preview" : {
    "icns,ico": {}
}
```

格式扩展插件可以分成两个部分：

1. `"thumbnail.path"`：提供用于解析要扩展的文件格式的缩略图的 `.js` 文件。
2. `"viewer.path"`：提供用于预览要扩展的格式的 `.html` 文件。

```json
"preview": {
    "icns": {
        "thumbnail": {
            "path": "thumbnail/icns.js",
            "size": 400,
            "allowZoom": false
        },
        "viewer": {
            "path": "viewer/icns.html"
        }
    }
}
```

设置其它 `metadata.json` 字段后，最终代码如下：

{% tabs %}
{% tab title="manifest.json" %}

```json
{
    "id": "LARSKLB8OTOC2",
    "version": "1.0.0",
    "platform": "all",
    "arch": "all",
    "name": "Preview Plugin",
    "logo": "/logo.png",
    "keywords": [
        "icns"
    ],
    "devTools": false,
    "preview": {
        "icns,ico": {
            "thumbnail": {
                "path": "thumbnail/icns.js",
                "size": 400,
                "allowZoom": false
            },
            "viewer": {
                "path": "viewer/icns.html"
            }
        }
    }
}
```

{% endtab %}

{% tab title="thumbnail/icns.js" %}

```javascript
const fs = require('fs');
const icns = require('./../js/icns-util.js');
const imageSize = require('./../js/image-size.js');

module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. parsing and generate thumbnail file to dest
            await icns.icns2png(src, dest);
            let size = await imageSize(dest);

            // 2. Check if the result is correct
            if (!fs.existsSync(dest) || size.width === 0) {
                return reject(new Error(`icns file thumbnail generate fail.`));
            }

            // 3. update the item dimensions
            item.height = size?.height || item.height;
            item.width = size?.width || item.width;

            // 4. return the result
            return resolve(item);
        }
        catch (err) {
            return reject(err);
        }
    });
}
```

{% endtab %}

{% tab title="viewer/icns.html" %}

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ICNS Viewer</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        #viewer {
            pointer-events: none;
            object-fit: contain;
            object-position: center;
            width: 100%;
            height: 100%;
            max-width: 100vw;
            max-height: 100vh;
        }
    </style>
</head>
<body>
    <img id="viewer"/>
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const filePath = urlParams.get('path');
        const width = urlParams.get('width');
        const height = urlParams.get('height');
        const theme = urlParams.get('theme');
        const lang = urlParams.get('lang');

        const viewer = document.querySelector('#viewer');

        // 1. Load the thumbnail image first
        // 👍 Avoid loading for too long, and UI has no content
        viewer.src = filePath.replace(".icns", "_thumbnail.png");

        // 2. Load the file and replace thumbnail
        (async function() {
            const icns = require('./../js/icns-util.js');
            let buffer = await icns.icns2buffer(filePath);
            let base64 = `data:image/png;base64,${buffer.toString('base64')}`;
            viewer.src = base64;
        })();
    </script>
</body>
</html>
```

{% endtab %}
{% endtabs %}

{% hint style="warning" %}
请注意，目前格式扩展插件不支持 Eagle Plugin API 和 DevTools 调试功能。



**完整示例代码：**\
<https://github.com/eagle-app/eagle-plugin-examples/tree/main/Preview>


# 检查器


注意：检查器插件需要 Eagle 4.0 Beta 17 以上的版本才能支持。


你可以针对特定格式的文件，开发专属于该格式的额外检查器工具，当用户选择该文件时，就可以在右侧检查器直接使用该插件。例如：可以针对 JPG/Raw 文件开发 EXIF 属性的检查器插件，每当用户选择该文件时，就可以轻松在右侧查看到「拍摄时间、焦距、光圈、经纬度」等额外数据。

检查器插件其实是格式扩展插件的变体，其定义方式非常类似，检查器插件在 `manifest.json` 中不需要定义 `main` 属性，而是需要设置 `preview` 属性。以下是一个范例代码：

```json
{
    "preview": {}
}
```

在 `preview` 中可以定义要扩展的文件扩展名。例如，如果想开发一个针对 jpg, png 格式的额外插件，可以输入 `"`jpg,png`": {}`：

```json
{
    "preview": {
        "jpg,png": {}
    }
}
```

接着设定以下属性：

* `path`: 该插件的 HTML 文件路径
* `height`: 该插件的默认高度
* `multiSelect`: 多选时是否要显示（非特殊情况建议设置为 `false`）

```json
{
    "preview": {
        "jpg,png": {
            "inspector": {
                "path": "index.html",
                "height": 100,
                "multiSelect": false
            }
        }
    }
}
```

设置其它 `metadata.json` 字段后，最终代码如下：

{% tabs %}
{% tab title="manifest.json" %}

```json
{
    "id": "cc41e899-5fc3-445c-a113-2d9573d6edcc",
    "version": "1.0.0",
    "platform": "all",
    "arch": "all",
    "name": "Inspector Plugin",
    "logo": "/logo.png",
    "keywords": [],
    "devTools": true,
    "preview": {
        "jpg,png": {
            "inspector": {
                "path": "index.html",
                "height": 100,
                "multiSelect": false
            }
        }
    }
}
```

{% endtab %}

{% tab title="index.html" %}

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Inspector Plugin Example</title>
    <style>
        html {
            font-size: 11px;
            font-family: sans-serif;
            border-radius: 6px;
            overflow: hidden;
        }

        body {
            padding: 0;
            margin: 0;
            color: transparent;
        }

        /* colors for different themes */

        body[theme="LIGHT"],
        body[theme="LIGHTGRAY"] {
            color: black;
        }

        body[theme="GRAY"],
        body[theme="BLUE"],
        body[theme="PURPLE"],
        body[theme="DARK"] {
            color: white;
        }
    </style>
</head>

<body>
    Inspector Plugin Example
    <script>
        // Listen to plugin creation
        eagle.onPluginCreate(async (plugin) => {

            // Get the current theme
            const theme = await eagle.app.theme;
            document.body.setAttribute('theme', theme);

            // Get the selected item
            const item = await eagle.item.getSelected();

            console.log(item);
            console.log(theme);
        });

        // Listen to theme changes
        eagle.onThemeChanged((theme) => {
            document.body.setAttribute('theme', theme);
        });
    </script>
</body>

</html>
```

{% endtab %}
{% endtabs %}


**完整示例代码：**\
<https://github.com/eagle-app/eagle-plugin-examples/tree/main/Inspector>


### 如何调试检插件

调试检查器插件的方式很简单，你可以点击画面中的检查器插件右键，接着选择「开发者工具」，就可以进行调试了。

# 调试插件

## 窗口插件调试 <a href="#zqpdi" id="zqpdi"></a>

打开插件后，点击 `F12`键即可打开 `DevTools` 调试工具。

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-d8ac432fb05d0a6afa3de5926aa74d57579a69c4%2Fimage%20(5).png?alt=media" alt=""><figcaption></figcaption></figure>

具体步骤如下：

1. 在 Eagle 中打开您要调试的插件，按下 `F12` 键，这将打开 DevTools。
2. 在 DevTools 中，您可以查看插件的代码，并使用断点、调试工具来调试插件的执行过程。
3. 您还可以使用 DevTools 中的其他工具来查看插件的性能、内存使用情况等信息。

## 缩略图插件调试

缩略图插件运行在背景，代码仅会在文件添加、更新时被执行，如果你想要对缩略图功能代码进行调试，你可以在 `manifest.json` 文件中，将 `devTools` 属性设置为 `true` ，并在代码设置 `debugger` 断点，即可在 `devTools` 工具进行调试工作。

## 预览插件调试

添加并选中你想要开发的文件格式文件到 Eagle 中，打开插件面板，点击你正在开发预览插件，即可打开一个独立的预览窗口，你可以点击 `F12` 打开 `DevTools` 进行调试。


了解更多：如果您不确定如何使用 DevTools，您可以查看下面这些学习资料来学习

1. Google 官方文档：<https://developers.google.com/web/tools/chrome-devtools>
2. MDN Web 文档：<https://developer.mozilla.org/zh-CN/docs/Tools>
3. W3Schools 教程：<https://www.w3schools.com/js/js_debugging.asp>
   

## 日志系统 <a href="#pui04" id="pui04"></a>

{% hint style="warning" %}
注意：预览、缩略图插件目前不支持日志 API。


日志系统是一种用于记录软件运行状态的工具，它可以帮助开发人员更快地定位和解决问题。日志系统会记录软件的错误信息、警告信息、运行时间等信息，可以作为一种调试工具。在非开发环境下，日志系统可以有效地帮助开发人员找出问题的原因，并采取措施解决问题。

Eagle Plugin API 提供了一种用于记录插件运行信息的 [log](https://developer.eagle.cool/plugin-api/zh-cn/api/log) 功能，这样，开发人员就可以将插件的运行、警告、错误等信息记录在 Eagle 的软件日志中。使用这种功能，只需向用户提供调试报告，就能查看到这些信息。在开发插件时，使用日志功能可以帮助开发人员快速定位和解决问题。

```javascript
eagle.log.debug('debug message from plugin');
eagle.log.info('info message from plugin');
eagle.log.warn('warn message from plugin');
eagle.log.error('error message from plugin');

// [13:19:39.845] [debug] [plugin] "debug message from plugin"
// [13:19:39.845] [info] [plugin] "info message from plugin"
// [13:19:39.845] [warn] [plugin] "warn message from plugin"
// [13:19:39.845] [error] [plugin] "error message from plugin"
```


了解更多： [Log - API 参考](https://developer.eagle.cool/plugin-api/zh-cn/api/log)



点击这里查看 Eagle [软件日志](https://docs-cn.eagle.cool/article/92-how-do-i-get-the-error-log)获取方式。


# 调试插件

## 窗口插件调试 <a href="#zqpdi" id="zqpdi"></a>

打开插件后，点击 `F12`键即可打开 `DevTools` 调试工具。

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-d8ac432fb05d0a6afa3de5926aa74d57579a69c4%2Fimage%20(5).png?alt=media" alt=""><figcaption></figcaption></figure>

具体步骤如下：

1. 在 Eagle 中打开您要调试的插件，按下 `F12` 键，这将打开 DevTools。
2. 在 DevTools 中，您可以查看插件的代码，并使用断点、调试工具来调试插件的执行过程。
3. 您还可以使用 DevTools 中的其他工具来查看插件的性能、内存使用情况等信息。

## 缩略图插件调试

缩略图插件运行在背景，代码仅会在文件添加、更新时被执行，如果你想要对缩略图功能代码进行调试，你可以在 `manifest.json` 文件中，将 `devTools` 属性设置为 `true` ，并在代码设置 `debugger` 断点，即可在 `devTools` 工具进行调试工作。

## 预览插件调试

添加并选中你想要开发的文件格式文件到 Eagle 中，打开插件面板，点击你正在开发预览插件，即可打开一个独立的预览窗口，你可以点击 `F12` 打开 `DevTools` 进行调试。


了解更多：如果您不确定如何使用 DevTools，您可以查看下面这些学习资料来学习

1. Google 官方文档：<https://developers.google.com/web/tools/chrome-devtools>
2. MDN Web 文档：<https://developer.mozilla.org/zh-CN/docs/Tools>
3. W3Schools 教程：<https://www.w3schools.com/js/js_debugging.asp>
   

## 日志系统 <a href="#pui04" id="pui04"></a>

{% hint style="warning" %}
注意：预览、缩略图插件目前不支持日志 API。


日志系统是一种用于记录软件运行状态的工具，它可以帮助开发人员更快地定位和解决问题。日志系统会记录软件的错误信息、警告信息、运行时间等信息，可以作为一种调试工具。在非开发环境下，日志系统可以有效地帮助开发人员找出问题的原因，并采取措施解决问题。

Eagle Plugin API 提供了一种用于记录插件运行信息的 [log](https://developer.eagle.cool/plugin-api/zh-cn/api/log) 功能，这样，开发人员就可以将插件的运行、警告、错误等信息记录在 Eagle 的软件日志中。使用这种功能，只需向用户提供调试报告，就能查看到这些信息。在开发插件时，使用日志功能可以帮助开发人员快速定位和解决问题。

```javascript
eagle.log.debug('debug message from plugin');
eagle.log.info('info message from plugin');
eagle.log.warn('warn message from plugin');
eagle.log.error('error message from plugin');

// [13:19:39.845] [debug] [plugin] "debug message from plugin"
// [13:19:39.845] [info] [plugin] "info message from plugin"
// [13:19:39.845] [warn] [plugin] "warn message from plugin"
// [13:19:39.845] [error] [plugin] "error message from plugin"
```


了解更多： [Log - API 参考](https://developer.eagle.cool/plugin-api/zh-cn/api/log)



点击这里查看 Eagle [软件日志](https://docs-cn.eagle.cool/article/92-how-do-i-get-the-error-log)获取方式。


# 开发交流群

我们鼓励用户尝试开发插件。如果您遇到任何问题，建议您首先尝试自行解决。如果仍无法解决，您可以加入我们在 Discord 的「[Eagle 插件开发群](https://discord.gg/9EfwEybFUH)」寻求他人帮助。该开发群的目的是协助 Eagle 插件的开发。&#x20;

如果您的问题是关于「**软件建议**」或者是「**软件本身的问题/BUG报告**」，则请您转到 「[Eagle 知识库 > 联系我们](https://docs-cn.eagle.cool/)」。&#x20;

在您提问之前，请确保您已具备基本的进程开发技巧，并且已熟悉我们的 API 使用方式。同时，也请确认您已经尝试过自行上网寻找相关资料。

以下是提问的正确示例：&#x20;

* 提出明确的问题步骤相关信息
* 友善的提问态度
* 更多技巧可参考「[提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)」。

{% hint style="success" %}
**以下附上正确的提问示例：**

您好，我目前在开发的过程中遇到一个问题，是关于OOO部分。 我做了哪些尝试，并得到了哪些结果，但我期望的结果是什么。&#x20;


{% hint style="danger" %}
**以下是不建议的提问示例：**

* 「我的程序有问题 / 或不運作」，但没有提供画面、或是有用的参考信息
* 未经整理就直接提供一大串代码或进程截图。
  

# 准备插件


您必须先确保您开发的插件符合我们的[《Eagle 开发者政策》](https://developer.eagle.cool/plugin-api/zh-cn/distribution/developer-policies)。


## 插件命名

插件命名至少须符合以下规范：

* **明确的命名**\
  插件的名称应该能够清楚地揭示其主要功能或用途，让用户在浏览插件时能立即理解该插件的用途。例如，一个可以帮助用户组织书签的插件可以命名为「书签整理大师」，而不应该使用模糊不清的名称如「超级工具」。
* **字数限制**\
  为了确保插件名称的简洁性，我们建议插件名称不应超过12个中文本。过长的名称可能会使用户感到困惑，并影响插件在列表中的显示。
* **名词而非动词**\
  插件的名称应该以名词为主，而非动词。这可以帮助用户更好地理解插件的功能。例如，「图像编辑器」会比「编辑图像」更适合作为插件的名称。
* **英文命名规范**\
  如果您的插件名称使用英文，应该每个单词首字母大写，除非是特定用词。例如，应该写为「Image Editor」而非「image editor」。
* **插件名称应该遵循** [**Apple Style Guide**](https://help.apple.com/applestyleguide/#/apsgb744e4a3?sub=apdca93e113f1d64) **的规范**
  * ✅ 以下合适的插件名称
    * `Bulk Image Downloader` 此插件名称清楚地表明了其功能是大量下载图像。
    * `Duplicate Image Finder` 这个名称明确地指出了插件的功能是查找重复的图像。
    * `Image Metadata Editor V2` 此名称明确地说明了插件的功能是编辑图像的元数据，并且是版本2。
  * ❌ 以下不建议的插件名称
    * `Extension For Pics` 此名称过于笼统且无法提供插件的任何功能信息。
    * `Adobe Image Organizer` 除非你拥有Adobe的授权，否则不应该在名称中使用专有名称。
    * `Image#Sorter` 此名称使用了特殊字符#，可能会导致进程码错误或难以理解。

***

## 插件描述

插件描述需至少符合以下规范：

* **简洁明确的描述**\
  插件的描述应该在两句话内就能清楚地解释出其主要功能和用途。例如，一个用于压缩略图像文件的插件，适合的描述可能是「一键压缩各种主流格式图像，节省素材占用空间。」不适合的描述可能是「超强、超棒的工具，让你的设计工作变得更好。」
* **字数限制**\
  为了保持描述的简洁，我们建议插件的描述不应超过40个中文本。过长的描述可能会使用户感到冗长且难以理解。
* **适当的关键字使用**\
  您的插件描述应着重于功能和用途，不应在其中塞入与插件无关的其他关键字。举例来说，如果您的插件是用于管理笔记，那么描述中应避免出现像是「游戏」或「音乐」等与插件无关的词汇。

***

## 插件 Icon


我们帮你设计了一个 Icon 产生器，你可以在 [这里](https://www.figma.com/community/file/1301114081447826240/eagle-plugins-icon-template) 找到他。


插件 Icon 至少符合以下规范：

* **使用模版设计**\
  为了保持插件中心的风格和色调的一致性，您应使用我们官方提供的模版来设计您的插件图标。这样可以确保您的插件与插件中心的整体美学风格保持一致。
* **图标留白**\
  您的插件图标周围应该有一定的留白，这样可以使图标在插件中心列表中更容易被识别出来。例如，如果您的图标是一个蓝色的圆形，那么您应该在圆形的边缘与图标边界之间留出一定的空白区域，而非让圆形填满整个图标。
* **高分辨率**\
  发布至插件中心的插件 Icon 分辨率至少 256 × 256 像素(px)，且为 `PNG` 格式。


**寻求帮助**

如果您觉得设计 Icon 不是您擅长的，试着至 [社区](https://discord.gg/QUkvmAGRbX) 询问帮忙。


***

## 插件封面图

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FyqFuhirgychyLLe5ipBC%2Fimage.png?alt=media&#x26;token=9d73ba5f-4581-4aa3-996d-c47dd47bfdcf" alt=""><figcaption></figcaption></figure>

您的封面截图会显示在插件中心的列表以及详情页面中，用户可以点击并浏览它们，以在安装前更详细地了解您的插件提供的功能。您可以提供一张封面图，而在说明中可以提供更多细节。我们建议至少添加三张在详细说明中，以方便用户了解您的插件提供的功能及使您的插件详情屏起来更加美观。

***

## 提供给审阅开工作人员的必要讯息

如果您的插件需要额外的配置，像是 API Token，启动特定的系统配置，或是打开其他第三方应用进程，请提供一个 README 文件作为说明文件，并将其放置在您插件的根目录当中，供审阅的工作人员参考。

# 打包插件

## 将您的插件导出为 Eagle Plugin <a href="#fqk6i" id="fqk6i"></a>

要将您的插件项目发布到 Eagle 插件中心，需先将插件导出为 `.eagleplugin` 格式。

1. 打开插件面板 (或按下 `P` 鍵)

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2F2CZr8UFjJKiU9UKPZHAA%2Fimage.png?alt=media&#x26;token=f50c9846-e8d2-411f-a673-a8ea3555c1b1" alt=""><figcaption></figcaption></figure>
2. 右键点击欲发布的插件

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FZ7IveM6dAbJ0bLWqhXyT%2Fimage.png?alt=media&#x26;token=4971939d-7668-4849-ad12-c7157034dbd7" alt=""><figcaption></figcaption></figure>
3. 选择「打包插件」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2F0d0Utw1b1AoSewuvc4Rp%2Fimage.png?alt=media&#x26;token=82dbd9db-0394-4efe-ac48-7baf6050cf81" alt=""><figcaption></figcaption></figure>
4. 选择保存路径，完成导出

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FKuEU92ywpWKUkEfyZ7at%2Fimage.png?alt=media&#x26;token=bb2ff3a6-e192-4115-a2a8-bcd2f5db2a66" alt=""><figcaption></figcaption></figure>
5. 检查你刚刚导出的 Eagle Plugin 文件

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FeZfBfU0O5iLJqmej2rCK%2Fimage.png?alt=media&#x26;token=ca78ebca-83fe-481a-ab64-1d5c28b6fdd7" alt=""><figcaption></figcaption></figure>

接下来，您需要前往 Eagle 插件提交页面，上传 `.eagleplugin` 文件，并填写必要的信息。提交后，您的插件将经过审核。通过审核后，您的插件即可在 Eagle 插件中心上架。

# 发布插件

## 将您的插件發布至 Eagle 插件中心 <a href="#fqk6i" id="fqk6i"></a>

要将您的插件项目发布到 Eagle 插件中心，需先将插件导出为 `.eagleplugin` 格式。

## 提交新版本 <a href="#x0bye" id="x0bye"></a>

如果您需要提交新版本，您可以执行以下步骤：

1. 从右上方点击「投稿」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FkIo1vIWPU11TIwMWm68l%2Fimage.png?alt=media&#x26;token=dcf0f818-492b-412d-8107-30dcb03b0c99" alt=""><figcaption></figcaption></figure>
2. 点选「投稿插件」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fe2py4y4dEegJhNbg7c84%2Fimage.png?alt=media&#x26;token=5289005f-8066-4db6-a2af-a013b21afba0" alt=""><figcaption></figcaption></figure>
3. 点选「点击上传」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FWt2S3jppwNP4dxaf1M0l%2Fimage.png?alt=media&#x26;token=0c504086-76bd-4339-8bfd-a6bc26565d47" alt=""><figcaption></figcaption></figure>
4. 選擇您的插件並且上傳 (插件必须为 `.eagleplugin` 文件)

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FtxmjmaKeHWZyxFRSzyrZ%2Fimage.png?alt=media&#x26;token=50ce29ba-6fff-41d0-96e6-e5370f2e4d4f" alt=""><figcaption></figcaption></figure>
5. 填写相关介绍信息

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FN1dgF76ll0V7crrditBU%2Fimage.png?alt=media&#x26;token=747a9a9d-614e-4eaf-ae54-5404517b11da" alt=""><figcaption></figcaption></figure>
6. 填写本次版本更新内容

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FIJg77e5tSQbQjUY1z4Sm%2Fimage.png?alt=media&#x26;token=2d63a0ba-ea5a-45cb-8766-8f7a5d42bccb" alt=""><figcaption></figcaption></figure>
7. 提交审核並等待审核结果

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FCiAJGqxj535ssbDnbcMV%2Fimage.png?alt=media&#x26;token=2dc61710-ae50-4fd5-b27a-c6cde55f1764" alt=""><figcaption></figcaption></figure>

通过审核后，您的插件即可在 Eagle 插件中心上架。

***

## 提供用户支持 <a href="#qwdab" id="qwdab"></a>

作为插件的开发者，您需要提供用户支持。在提交插件以供审核时，您需要添加支持联系人，这可以是用户可以联系的电子邮件地址，也可以是网站或帮助中心的链接。这样，用户就可以通过您提供的信息来获得技术支持。

# 更新插件

## 提交新版本 <a href="#x0bye" id="x0bye"></a>

提交新版本需要您按照上述步骤操作。首先，您需要访问个人页面，点击欲提交新版本的插件，选择「提交新版本」，并上传新版本的 `.eagleplugin` 文件，填写本次版本更新内容，提交审核。审核完成后，您的新版本即可完成更新。

如果您需要提交新版本，您可以执行以下步骤：

1. 从右上方点击「头像」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FZ4dQad6dbOaw7IpYIpkQ%2Fimage.png?alt=media&#x26;token=0538f841-42c0-431a-a8ea-a6c92a10d5d4" alt=""><figcaption></figcaption></figure>
2. 点选「个人主页」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FPpEzGLKsyxThbPZFuJH6%2Fimage.png?alt=media&#x26;token=e53214a9-8fa6-41c8-a951-475ae3bb3ceb" alt=""><figcaption></figcaption></figure>
3. 在要更新的插件右上角选择「编辑」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FuSLldbCGNjUzGtceZbkQ%2Fimage.png?alt=media&#x26;token=32ae7c62-cd62-4f1b-beaa-ec4b2a71348d" alt=""><figcaption></figcaption></figure>
4. 在上传区域点选「上传新版本」

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FWXgqLgtMs0x3vkAVzyAU%2Fimage.png?alt=media&#x26;token=11bf22d4-21d1-4e60-ba31-fddc06b77e41" alt=""><figcaption></figcaption></figure>
5. 选择您要提交的插件 (插件必须为 .eagleplugin 文件)

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fj3JXFxwovwjYO6TVMcbz%2Fimage.png?alt=media&#x26;token=f6beb5e1-339e-4a45-b467-61de84921e78" alt=""><figcaption></figcaption></figure>
6. 填写本次版本更新内容

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FscXzrKUKFKvgjWF496T0%2Fimage.png?alt=media&#x26;token=3bc4b455-4074-49f0-beca-ffea97770530" alt=""><figcaption></figcaption></figure>
7. 提交审核並等待审核结果

   <figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FIlGNqvbdywJdLIrOVVUz%2Fimage.png?alt=media&#x26;token=5303fb4d-e84c-4f37-a1e5-7150aa6b1aeb" alt=""><figcaption></figcaption></figure>

通过审核后，您更新的插件即会在 Eagle 插件广场上显示。

# 开发者政策


我们会时常更新政策条款，所以请您以当时的政策条款为基准。


非常感谢您参与开发 Eagle 插件，您的贡献对于我们的社区来说是极其重要的。在您开始开发过程之前，我们希望您能花一些时间阅读并遵守以下的开发者政策。这些政策旨在确保每个用户的体验都能保持最高的品质，并确保所有的插件都符合我们的标准和期望。

再次感谢您的参与，并期待看到您的创新成果。

## 专有名词解释说明 <a href="#id-1-product-policies" id="id-1-product-policies"></a>

1. Eagle：又可称为 [Eagle App](https://eagle.cool/) 是一款专业的图像收藏及管理必备工具。
2. Eagle 插件：又可被称为「Eagle扩展插件、插件、Eagle Plugin、Plugin」，系指您基于 Eagle Plugin API 所开发之进程的名称。
3. Eagle 插件中心：即 [Eagle 资源社区](https://community-cn.eagle.cool/)的附属功能，您可以在此与他人分享您开发的插件。
4. macOS：属于 [Apple](https://apple.com/) 的产品商标，由苹果开发及维护的操作系统。
5. Windows：属于 [Microsoft](https://microsoft.com/) 的产品商标，由微软开发及维护的操作系统。

***

## 1. 插件政策 <a href="#id-1-product-policies" id="id-1-product-policies"></a>

### 1.1 独特的功能与价值；准确的代表性

Eagle 插件和相关的中继资料必须正确且清楚地描述其来源和功能。

**1.1.1 扩展插件必须具有单一用途**

Eagle 插件必须具有明确特定单一用途的功能。

**1.1.2 描述您的 Eagle 插件**

Eagle 插件必须正确且清楚的描述您所开发的功能和任何重要限制，包括必要或支持的输入设备。在第一次运行体验期间，您的 Eagle 插件的必须清楚的表明自身的功能或是限制。\
Eagle 插件不得使用类似或其他相似于已有的 Eagle 插件名称或图标，而且如果您没有获得许可权，则不得声明代表公司、政府机关或其他实体。

**1.1.3 功能与运作**

您开发的 Eagle 插件功能必须完全正常运作。

**1.1.4 搜索和探索**

您的「插件关键字」搜索词汇不得超过六个单字，而且应该与您的插件相关。

**1.1.5 稳定性和性能**

您的插件功能不得对 Eagle 或系统的性能、稳定性产生负面影响。

**1.1.6 进程码混淆**

不得进行进程码混淆。这包括 Eagle 插件内的进程码，以及从网络上撷取的任何外部进程码或资源。如果您的进程码无法被审阅，Eagle 插件中心可能会要求您修改进程码至可阅读的等级。

**1.1.7 变更 Eagle App 或是系统的配置**

Eagle 插件在未适当通知用户知情且同意的情况下，不得变更 Eagle 或是系统的功能或配置。任何的系统配置变更或调整都应该明确记载在 Eagle 插件的说明描述中，并且进行前需获得用户同意。

**1.1.8 许可权**

您的 Eagle 插件只能要求运作所需的许可权。您必须提供 Eagle 插件运作方式的描述。您的 Eagle 插件只能如所述运行。您的 Eagle 插件可能不会要求超出所声明运行和运作所需功能的功能许可权。

**1.1.9 当地语系化**

您应该针对 Eagle 插件声明支持的所有语言当地语系化您的 Eagle 插件。 Eagle 插件描述的文本应该以您声明的每种语言当地语系化。

如果您的 Eagle 插件已当地语系化，使某些功能无法在当地语系化版本中使用，您必须在 Eagle 插件描述中清楚陈述或显示当地语系化的限制。 Eagle 插件所提供的体验在支持的所有语言中都必须相当类似。

**1.1.10 插件的呈现和统一性**

我们希望 Eagle 插件中心能维持一贯的设计美感和使用体验。因此，您提供的插件图标、截图、插件名称以及描述应符合我们提供的「[示例](https://developer.eagle.cool/plugin-api/zh-cn/distribution/prepare)」要求。如果您的插件在这些方面未能达到我们的要求，我们有权利不予以通过审核。这些要求旨在确保插件的质量，并维护Eagle 插件中心的整体美感和一致性。

### 1.2 插件必须是可测试的

提交的 Eagle 插件必须是可测试的。如果因为任何原因而无法测试您的 Eagle 插件，包括但不限于下列专案，您的 Eagle 插件可能会不符合此需求。

**1.2.1 用户认证**

如果您的 Eagle 插件需要登陆认证，请提供有效的示范帐户。

**1.2.2 服务可用性**

如果您的 Eagle 插件需要存取服务器，服务器必须能够正常运作，才能确认其正常运作。

### 1.3 功能可用性

**1.3.1 跨平台的兼容性**

Eagle 插件应该与 Eagle 可下载的所有设备和平台上兼容 (macOS & Windows)。

如果在不兼容的设备上下载 Eagle 插件，它应该在启动时侦测到，并提示讯息给用户，详细说明设备必须符合 Eagle 插件兼容的需求才能运作。

**1.3.2 用户体验**

* Eagle 插件必须立即启动，而且必须保持回应用户输入。
* Eagle 插件必须继续运行，并保持回应用户输入。
* Eagle 插件必须正常关闭，而且不会意外关闭。
* Eagle 插件应该处理例外状况，并在处理例外状况之后保持回应用户输入。

### 1.4 广告行为

Eagle 插件不得包含任何形式的广告(包括但不限于视频、动效、文案)。

***

## 2. 安全政策

### 2.1 信息安全

您的 Eagle 插件功能不得破坏或危害用户的安全性，包括设备、系统或相关系统的安全性或功能。

**2.1.1 垃圾和恶意软件**

您开发的 Eagle 插件不得包含或激活恶意进程码。

**2.1.2 其他软件的相依性**

您的 Eagle 插件可能相依于非集成式或其他第三方软件产品 (例如另一个产品、模块或服务)，以提供主要功能，前提是您必须在描述中明确揭露相依性。

**2.1.3 Eagle 插件更新**

除非 Eagle 另有允许，否则您的 Eagle 插件只能通过 Eagle 插件中心进行更新。

### 2.2 隐私权与个人信息

下列需求适用于存取个人信息的 Eagle 插件。个人信息包括识别或可用来识别人员或与这类信息或资料相关联的所有信息或资料。

**2.2.1 仅在必要且用户同意时收集个人信息**

Eagle 插件仅能在用户明确同意时，收集、存取、使用或传输个人信息 (包括网页活动)。

**2.2.2 维护隐私权原则**

不论您的 Eagle 插件是存取、收集或传输个人信息;如果法律要求，您必须提供重要注意事项并遵守您的隐私权原则。您的隐私权原则必须通知用户 Eagle 插件存取、收集或传输个人信息的方式、该信息的使用、存储及保护方式，并指出公开该信息的物件类型。

您的隐私权原则必须描述对于用户信息的使用和共享、以及如何存取其信息的控制，而且必须遵守适用的法律和法规。当您将新功能创建至 Eagle 插件时，您的隐私权原则必须保持在最新状态。

如果您为 Eagle 插件提供隐私权原则，您同意允许 Eagle 与 Eagle 插件的用户共享这类隐私权原则。

**2.2.3 与协力厂商共享资料**

只有在取得这些用户的加入同意之后，您才能通过 Eagle 插件或相关联的中继资料，将 Eagle 插件用户的个人信息发布至外部服务或协力厂商。加入声明同意表示用户在您所要求活动的 Eagle 插件用户界面中，于下列情况下提供其快速许可权：

* 向用户描述信息的存取、使用或共享方式，并指出其揭露物件的类型。
* 在 Eagle 插件用户界面中为用户提供一个机制，让他们可以选择稍后撤销许可权并退出。

**2.2.4 共享非用户的信息**

如果您通过 Eagle 插件或中继资料将人员的个人信息发布至外部服务或协力厂商，但正在共享信息的人员不是 Eagle 插件的用户：

1. 您必须取得明确的书面同意，才能发布该个人信息。
2. 您必须允许其信息共享的人员随时撤销该同意。
3. 您的隐私权原则必须清楚揭露您可能会以这种方式收集个人信息。
4. 如果适用法律要求，您必须在要求时删除任何个人的个人信息，包括您以这种方式收集信息的个人。
5. 如果您的 Eagle 插件可让用户存取另一个人的个人信息，此需求也适用。

**2.2.5 安全地传输信息**

如果您的 Eagle 插件收集、存储或传输个人信息;它必须使用合理安全的密码编译方法安全地运行此动作。

**2.2.6 高度敏感性信息**

您的 Eagle 插件不得收集、存储或传输高度敏感的个人信息，例如健康情况或财务资料，除非该信息与 Eagle 插件的功能相关。您的 Eagle 插件也必须先取得用户同意，才能收集、存储或传输这类信息。

***

## 3. 金融交易

如果您的产品包含产品内购买、订用帐户、虚拟货币、计费功能，或撷取财务信息;下列各节中的需求适用。

### **3.1 付费功能**

您的 Eagle 插件可让用户取用通过第三方付款 API 平台来进行购买数位内容或服务。

您必须使用安全的第三方付款 API 平台来购买实物商品或服务。对于与任何其他服务有关的付款，包括实体赌博或慈善捐款，您也必须使用安全的第三方付款 API 平台。

* 如果您的 Eagle 插件用于促进或收集慈善捐款，或进行宣传抽奖/比赛，您必须遵守适用的法律进行。
* 您还必须明确表示，Eagle 并非此次促销活动的筹款者或赞助者。
* 在您的 Eagle 插件中销售的产品不得转换为任何合法有效的货币（如美元、欧元等）或任何实体商品或服务。

以下要求适用于您使用安全的第三方付款 API 平台：

* 在交易时或从用户收集任何支付或财务信息时，您的 Eagle 插件必须识别商业交易提供商、验证用户，并获得用户对交易的确认。商业交易提供商维护一个用于金融交换的安全平台。
* Eagle 插件可能会提供给用户保存此验证的能力，但用户必须有能力要求每笔交易都需要验证，或者关闭产品内交易。
* 如果您的 Eagle 插件功能会收集信用卡信息，或使用收集信用卡信息的第三方支付处理，则支付处理必须符合当前的 PCI 数据安全标准（PCI DSS）。

### **3.2** 揭示付费功能

您的 Eagle 插件及其相关元数据必须提供有关产品内购买类型和价格范围的信息。您不得误导用户，并且必须清楚地说明您的产品内促销和提供的性质，包括任何试用体验的范围和条款。

***

## 4. 内容政策

以下政策适用于在「Eagle 插件中心」中提供分发的内容和元数据（包括发布者名称，扩展功能名称，扩展功能图标，扩展功能描述，扩展功能截图，扩展功能预告片和预告片缩略图，以及任何其他扩展功能元数据）。内容指的是您的扩展功能中包含的图像，声音，视频和文案，通过您的扩展功能公开的区块，通知，错误消息或广告，以及从服务器传送的任何内容或您的扩展功能连接的任何内容。

因为扩展功能和「Eagle 插件中心」在全球范围内使用，因此这些要求是在区域和文化规范的背景下解释和应用的。

### 4.1 Eagle 插件中心列表的内容需求

您在 Eagle 插件随附的中继资料和其他内容可能包含不完整的信息或是不成熟的内容。不符合 Eagle 标准的 Eagle 插件提交会遭到拒绝或立即移除。

### 4.2 内容包括名称、图标、原创和第三方

您的扩展功能及其相关元数据中的所有内容必须由您原创或适当地从第三方权利持有人那里获得许可，并且只能按照权利持有人的许可或法律允许的其他方式使用。

### 4.3 损害风险

**4.3.1 需求**

您的扩展功能绝不能含有任何促使或美化以下真实世界活动的内容：

* 极端或无谓的暴力
* 侵犯人权
* 制造非法武器
* 对人、动物或真实或个人财产使用之武器。

**4.3.2 责任**

您的 Eagle 插件不能：

* 对终端用户或任何其他人或动物构成安全风险，也不能导致他们不适，受伤或遭受任何其他伤害
* 对真实或个人财产构成或导致损坏的风险。所有扩展功能的安全测试，证书获取，以及任何适当功能保护措施的实施，您都要自行负责。

您不能禁用任何平台的安全或舒适功能，并且必须在您的扩展功能中包含所有适用的法律要求和行业标准的警告，通知和免责声明。

### 4.4 禁止的内容、不良的内容、活动及服务

Eagle 插件必须遵守下列条件：

* Eagle 插件不得包含任何诽谤性，诬蔑的，中伤的或威胁的内容。
* Eagle 插件不得包含提供现金或其他价值之在线游戏、运动娱乐、赌博等内容。
* Eagle 插件不得包含加密货币进行交易等内容。
* Eagle 插件不得包含在真实世界中鼓励、促进或美化不合法活动的内容或功能。
* Eagle 插件不得包含粗话。
* Eagle 插件不的包含推广酒精、烟草、药物等相关内容。
* Eagle 插件不得包含或显示合理人认为不合情理的内容。
* Eagle 插件不得包含任何任何国家/地区中具有冒犯性的内容。由于当地法律或文化规范，内容在特定国家/地区可能会被视为具冒犯性。
* Eagle 插件不得包含任何成人内容(R18)。

***

***Eagle 官方保留最终审核的权利。***

政策最后更新时间：*2023-11-01 11:11*

# manifest.json 完整配置

每个插件都必须包含一个 `manifest.json` 文件。这个文件定义了插件执行方式及插件的基本信息，例如插件的名称、版本号和执行代码的入口点。

以下是 `manifest.json` 文件支持的所有字段：

```json
{
    "id": "LBCZE8V6LPCKD",
    "version": "1.0.0",
    "platform": "all",
    "arch": "all",
    "name": "窗口插件",
    "logo": "/logo.png",
    "keywords": [],
    "devTools": false,
    "main":
    {
        "url": "index.html",
        "width": 640,
        "height": 480,
        "minWidth": 640,
        "minHeight": 480,
        "maxWidth": 640,
        "maxHeight": 480,
        "alwaysOnTop": false,
        "frame": true,
        "fullscreenable": true,
        "maximizable": true,
        "minimizable": true,
        "resizable": true,
        "backgroundColor": "#ffffff",
        "multiple": false,
        "runAfterInstall": false
    }
}
```

## 字段说明：

* `id` - 插件 ID
* `version` - 插件版本
* `platform` - 支持平台
  * `all` - 所有平台
  * `mac` - mac 系统
  * `win` - Windows 系统
* `arch` - CPU 架构
  * `all` - 所有架构
  * `arm` - 仅支持 arm 架构
  * `x64` - 仅支持 x64 架构
* `name` - 插件名
* `logo` - 插件代表图标（仅支持 `png`, `jpg`, `webp` 格式）
* `keywords` - 插件关键字，除了插件名外用户还可以使用这些关键字快速搜索到这个插件
* `devTools` - 是否打开开发调试窗口
* `main` - 插件窗口程序入口设置
  * `url` - 入口页面
  * `width` - 窗口宽度
  * `height` - 窗口高度
  * `minWidth` - 窗口最小宽度
  * `minHeight` - 窗口最小高度
  * `maxWidth` - 窗口最大宽度
  * `maxHeight` - 窗口最大高度
  * `alwaysOnTop` - 窗口是否永远在别的窗口的上面， 默认值为 `false`。
  * `frame` - 默认值为 `true`，当为 `false` 时，将使用[无边框窗口](https://developer.eagle.cool/plugin-api/zh-cn/tutorial/frameless-window)，这是一种特殊的窗口模式，它不带有外壳（包括窗口边框、标题栏、工具栏等），只含有网页内容。
  * `fullscreenable` - 窗口是否可以进入全屏状态，默认值为 `true`。
  * `maximizable` - 窗口是否最大化，默认值为 `true`。
  * `minimizable` - 窗口是否可最小化，默认值为 `true`。
  * `resizable` - 窗口大小是否可调整，默认值为 `true`。
  * `backgroundColor` - 窗口背景色，默认值为`#FFF`。
  * `multiple` - 窗口是否可以多開，默認為 `false`。
  * `runAfterInstall` - 安装后自动打开，默认为 `false`

# 取得数据

你可以通过 Eagle Plugin API 提供的方法存取保存在 Eagle 应用的各种数据，比如`文件`、`文件夹`、`资源库`等，这里有一些简单的示例：

## **示例一：取得当前应用选中的文件**

```javascript
let selected = await eagle.item.getSelected();
console.log(selected);
```

## **示例二：取得指定条件之文件**

```javascript
let items = await eagle.item.get({
    ids: [],
    isSelected: true,
    isUnfiled: true,
    isUntagged: true,
    keywords: [""],
    ext: "",
    tags: [],
    folders: [],
    shape: "square",
    rating: 5,
    annotation: "",
    url: ""
});

```

## **示例三：取得当前应用选中的文件夹**

```javascript
let folders = await eagle.folder.getSelected();
```

除上述外，Eagle Plugin API 还提供许多不同的 API 获取信息，请点击下方链接查看完整信息：

* [资源库](https://developer.eagle.cool/plugin-api/zh-cn/api/library)
* [项目](https://developer.eagle.cool/plugin-api/zh-cn/api/item)
* [文件夹](https://developer.eagle.cool/plugin-api/zh-cn/api/folder)
* [应用](https://developer.eagle.cool/plugin-api/zh-cn/api/app)
* [操作系统](https://developer.eagle.cool/plugin-api/zh-cn/api/os)
* [通知](https://developer.eagle.cool/plugin-api/zh-cn/api/notification)
* [对话框](https://developer.eagle.cool/plugin-api/zh-cn/api/dialog)
* [剪切板](https://developer.eagle.cool/plugin-api/zh-cn/api/clipboard)
* [日志](https://developer.eagle.cool/plugin-api/zh-cn/api/log)

# 修改数据

使用 Eagle Plugin API 方法获取的结果皆可以直接进行修改，如果想要保存修改的结果，只需调用结果对象的 `save()` 方法即可完成，这里有一些简单的示例：\\

## **示例一：修改当前应用选中的文件**

```javascript
// 取得 Eagle 应用当前被选中的文件
let items = await eagle.item.getSelected();
let item = items[0];

// 修改标签
item.tags = ['tag1', 'tag2'];

// 保存修改
await item.save();

```

## **示例二：修改文件夹属性**

```javascript
// 取得 Eagle 应用当前被选中的文件夹
let folder = (await eagle.folder.getSelected())[0];

// 修改属性
folder.name = 'New Folder Name';
folder.description = 'New description...';

// 保存修改
await folder.save();
```

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 API 提供的 `save()` 方法进行数据的存取与修改，应避免直接修改 Eagle 资源库底下的任意文件。

# 修改数据

使用 Eagle Plugin API 方法获取的结果皆可以直接进行修改，如果想要保存修改的结果，只需调用结果对象的 `save()` 方法即可完成，这里有一些简单的示例：\\

## **示例一：修改当前应用选中的文件**

```javascript
// 取得 Eagle 应用当前被选中的文件
let items = await eagle.item.getSelected();
let item = items[0];

// 修改标签
item.tags = ['tag1', 'tag2'];

// 保存修改
await item.save();

```

## **示例二：修改文件夹属性**

```javascript
// 取得 Eagle 应用当前被选中的文件夹
let folder = (await eagle.folder.getSelected())[0];

// 修改属性
folder.name = 'New Folder Name';
folder.description = 'New description...';

// 保存修改
await folder.save();
```

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 API 提供的 `save()` 方法进行数据的存取与修改，应避免直接修改 Eagle 资源库底下的任意文件。


# 存取本地文件

我们可以很轻松地使用原生的 Node.js API 来实现存取本地文件的功能。这让我们在插件系统中实现这样的任务变得更加容易。

***

## 使用 `fs` 模块存取本地文件 <a href="#iamlo" id="iamlo"></a>

利用 Node.js 的 `fs`的一系列方法来实现本地文件存取，对本地文件系统进行操作。例如，可以使用 `fs.readFile()` 方法来读取文件内容，使用 `fs.writeFile()` 方法来写入文件。这里是一个示例：

```javascript
const fs = require('fs');

// 读取文件
fs.readFile('/path/to/file', (err, data) => {
  if (err) throw err;

  console.log(data);
});

// 写入文件
fs.writeFile('/path/to/file', 'hello world', (err) => {
  if (err) throw err;

  console.log('done');
});
```

这些方法都是异步的，所以它们不会阻塞 UI，从而可以保证应用的高性能。另外，`fs` 模块还提供了一些其他有用的方法，例如可以用 `fs.stat()` 方法来获取文件的大小、创建时间等信息，也可以用 `fs.rename()` 方法来重命名文件。通过使用 `fs` 模块，我们可以很方便地存取本地文件。

{% hint style="success" %}
**🦄 最佳实践：** 尽可能不要使用 Node.js 里面的 sync 方法，这些方法会导致 UI 线程阻塞，从而导致用户界面卡顿，用户体验极差。此外，使用异步方法能够提高程序的执行效率，因为它不会阻塞程序的执行，可以同时处理多个任务。


***

## 使用原生对话框取得文件路径 <a href="#nyq1o" id="nyq1o"></a>

Eagle Plugin API 提供了一个 `dialog` 模块，可以用来创建原生系统对话框，进行文件保存及选取。这里有耶些示例：

**示例一：弹出文件选择对话框**

```javascript
let result = await eagle.dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
});
```

**示例二：弹出保存对话框**

```javascript
let result = await eagle.dialog.showSaveDialog({
    properties: ['openDirectory']
});
```

如果你需要更详细的介绍，可以参考 [dialog 模块](https://developer.eagle.cool/plugin-api/zh-cn/api/dialog)。

# 发出网路请求

## 使用 `fetch` 发出网路请求 <a href="#vrr9c" id="vrr9c"></a>

`fetch` 函数是一个用于访问网络资源的工具，可以让您发送 HTTP 请求，并处理请求的响应。`fetch` 函数支持许多不同类型的请求，包括 `GET`、`POST`、`PUT` 和 `DELETE`，并支持请求体和响应体的自定格式。

使用 `fetch` 函数，可以方便地访问网络资源，并控制请求和响应的流程。例如，可以使用以下代码来发送一个 `GET` 请求，并在请求实现后处理响应：

```javascript
fetch('https://example.com/api/endpoint')
    .then(response => response.json())
    .then(data => {
    	// 在这里处理响应
    });
```

该示例代码会发送一个 GET 请求到指定的网络资源，然后在请求完成后，将响应体解析为 JSON 格式，并在这里处理解析后的响应体。


若要了解 Javascript 中的 `fetch` 函数，建议可以阅读 MDN 网站上的介绍：\
<https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>。

该文章介绍了 `fetch` 函数的基本用法，并提供了示例代码展示如何使用 `fetch` 来发送 HTTP 请求，并处理请求的响应。

此外，还可以参考下列文章了解更多关于 fetch 的信息：

* 《Using Fetch》（<https://davidwalsh.name/fetch>）
* 《Fetch API In Depth》（<https://css-tricks.com/using-fetch/>）
  

***

## 使用 `https` 发出请求 <a href="#oowx7" id="oowx7"></a>

由于浏览器默认的安全性限制，`fetch` 方法有时候会遇到一些限制，这种情况下我们可以改采用 Node.js 原生的网络 API 来发送网络请求，获得更高的弹性。

使用 `https.get` 方法发送 HTTP GET 请求非常简单，只需要提供请求的 URL 即可。例如，可以使用以下代码来发送一个 HTTP GET 请求：

```javascript
const https = require('https');

https.get('https://www.example.com', (res) => {
  console.log(`Got response: ${res.statusCode}`);

  res.on('data', (d) => {
    // 处理响应数据
  });

}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
```

# 使用 Node.js 原生 API

Eagle 插件支持使用 Node.js 的原生 API，因此我们可以享受到以下好处：

* 可以利用 Node.js 的强大功能来实现一些复杂的功能，比如数据处理、文件压缩、网络通信等。
* 可以使用现有的 Node.js 生态系统中的各种模块和库来快速实现应用程序的各种功能，避免重复造轮子。
* 可以构建跨平台的应用程序，因为 Node.js 在 Windows、macOS 都有很好的支持。

## 示例 <a href="#oedfw" id="oedfw"></a>

```javascript
const fs = require('fs');

// 讀取文件
fs.readFile('/path/to/file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// 寫入文件
fs.writeFile('/path/to/file.txt', 'Hello, world!', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

```

这段代码会读取一个文件，然后在文件中写入一段文本。在读取和写入操作实现时，会在控制台中输出相应的信息。

除了 `fs` 模块外，Node.js 原生 API 还有许多实用的模块提供了一系列常用的功能。下面是一些常用的 Node.js 原生模块：

1. `http` 模块：提供了 HTTP 服务器和客户端的功能。
2. `path` 模块：提供了处理文件路径的工具函数。
3. `os` 模块：提供了获取操作系统信息的功能。
4. `crypto` 模块：提供了加密和解密的功能。
5. `zlib` 模块：提供了数据压缩和解压缩的功能。

## 推荐学习资源 <a href="#unfm7" id="unfm7"></a>

通过使用 Node.js 的原生 API，可以大大提升应用进程的灵活性和功能性。如果您是 Node.js 的新手，那么下面这些教程可能会对您有所帮助：

* MDN 的 Node.js 入门教程：<https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/Introduction>
* Traversy Media 的《Node.js Tutorial for Beginners》：<https://www.youtube.com/watch?v=TlB_eWDSMt4>
* freeCodeCamp 的《Node.js Basics Tutorial | Learn the Basics of Node.js in 30 Minutes》：<https://www.youtube.com/watch?v=w-7RQ46RgxU>
* The Net Ninja 的《Node.js Tutorial for Beginners》：<https://www.youtube.com/watch?v=w-7RQ46RgxU>

上面这些视频可以帮助您快速入门 Node.js 开发，了解 Node.js 的基础知识和实用技巧。

# 使用第三方模快

## 使用第三方模块 is.js

使用第三方模块的方式与使用原生模块类似，只需要通过 `require()` 函数引入模块即可。

以 `is.js` 为例，`is.js` 是一个用于 JavaScript 的数据类型判断库。它提供了一系列方法，用于判断一个变量的数据类型是否符合预期。

首先，你需要在 Node.js 中安装 `is.js` 模块，可以通过以下命令来安装：

```bash
npm install is_js --save
```

{% hint style="warning" %}
注意：is.js 的 npm 包名是 is\_js，名字中有下划线


安装完成后，你就可以在 Node.js 应用进程中使用 `is.js` 模块。例如，你可以通过以下方式来引入 `is.js` 模块并使用它的函数：

```javascript
const is = require('is_js');

if (is.number(x)) {
  console.log('x 是一个数字');
}
else {
  console.log('x 不是一个数字');
}
```

通过 `is.js` 库，您可以轻松地对 JavaScript 中的变量进行类型判断，从而避免类型不匹配导致的错误。

如果您想要集成到 Eagle 插件中，以下是示例代码与运行结果：

```javascript
const is = require('is_js');

eagle.onPluginCreate(() => {
    var x = 1;

    if (is.number(x)) {
        document.write('x 是一个数字');
    } else {
        document.write('x 不是一个数字');
    }
});
```

以下是运行的结果：

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FnRHS0CYbf6JaJxkAs7kJ%2Fimage.png?alt=media&#x26;token=2753a531-b89c-464c-8fb7-245d711572f7" alt=""><figcaption><p>运行示例</p></figcaption></figure>


上述示例项目可以在 [这里](https://github.com/eagle-app/eagle-plugin-examples/tree/main/3rd-party) 获取


***

## 第三方包管理工具：NPM <a href="#zql65" id="zql65"></a>

npm 是 Node.js 的官方包管理工具，提供了一种方便的方式来管理第三方模块和发布您自己的模块。通过 npm，您可以使用 `npm install` 命令快速安装模块。npm 提供了强大的模块管理功能，可以帮助您更好地管理项目依赖和模块版本，提高项目的开发效率。

此外，npm 还提供了一个在线模块仓库，您可以在这里搜索和下载第三方模块。总的来说，npm 是 Node.js 开发者不可或缺的工具，提供了一系列实用的功能，帮助您更好地开发和管理您的项目。


**npm 官网 -** <https://www.npmjs.com/>


## 替代镜像源：CNPM

如果你的网络环境访问 NPM 速度不好，那么您可以尝试使用 CNPM（China npm）。CNPM 是一个针对中国大陆网络环境优化的 NPM 客户端，它通过淘宝 NPM 镜像源提供更快、更稳定的服务。当您在中国大陆访问官方 NPM 服务器速度受限或不稳定时，可以考虑使用 CNPM 作为替代方案。

CNPM 容易安装和操作，提供了类似于 NPM 的命令行接口，所以无论您是在克隆、下载、安装各类 Node.js 包还是管理已有模块，CNPM 都会变得非常简单。通过 CNPM，您可以在中国大陆环境下更顺畅地管理 Node.js 项目的依赖包，提高您的开发效率。

总而言之，如果您的网络环境访问 NPM 速度不佳，请尝试使用 CNPM。作为一个针对中国大陆网络环境优化的 NPM 客户端，它将为您提供更快、更稳定的包管理服务，从而有效地解决您可能遇到的一系列问题，为您的 Node.js 开发工作带来便利。


**cnpm Github** - <https://github.com/cnpm/cnpm>


# 多国语言（i18n）

Eagle 插件內建了 i18next 模塊，這使得開發者可以很輕鬆的製作出支持多國語言的插件。i18next 是一个用于多国语言应用的 JavaScript 库，它可以轻松地处理多国语言翻译，并且提供了多种翻译的支持，包括自定义义翻译、局部化、多语系支持等。

以下我们将手把手说明如何让插件支持多国语系：

## 步骤一、建立 `_locales` 文件夹

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-569807c86a1c45f8575718fb2d6ba12d5de015c9%2Fimage%20(19).png?alt=media" alt=""><figcaption></figcaption></figure>

## 步骤二、建立语言 `.json` 文件

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FPsAfKVcJJLQ54irTknHB%2Fimage.png?alt=media&#x26;token=4053d6df-f03d-4810-a074-d05d60729d04" alt=""><figcaption></figcaption></figure>

{% tabs %}
{% tab title="\_locales/en.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "i18n example"
        }
    },
    "contextMenu": {
        "copy": "Copy",
        "paste": "Paste"
    }
}
```

{% endtab %}

{% tab title="\_locales/zh\_CN.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "多国语言范例"
        }
    },
    "contextMenu": {
        "copy": "复制",
        "paste": "粘贴"
    }
}
```

{% endtab %}

{% tab title="\_locales/zh\_TW\.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "多國語言範例"
        }
    },
    "contextMenu": {
        "copy": "複製",
        "paste": "貼上"
    }
}
```

{% endtab %}

{% tab title="\_locales/ja\_JP.json" %}

```json
{
    "manifest": {
        "app": {
            "name": "i18n の例"
        }
    },
    "contextMenu": {
        "copy": "コピー",
        "paste": "ペース"
    }
}
```

{% endtab %}
{% endtabs %}


目前支持的语言有 `en`, `ja_JP`, `es_ES`, `de_DE`, `zh_TW`, `zh_CN`, `ko_KR`, `ru_RU`。


## 步骤三、调整 `manifest.json`

使用 Eagle Plugin 的 `i18next` 功能，你可以通過設定簡單的 JSON 文件來定義多國語言應用的翻譯。

```json
{
    "id": "LE564883T24ZR",
    "version": "1.0.0",
    
    // 1. 调整名称
    "name": "{{manifest.app.name}}",
    "logo": "/logo.png",
    "keywords": [],
    
    // 2. 设置支持语言、默认语言
    "fallbackLanguage": "zh_CN",
    "languages": ["en", "zh_TW", "zh_CN", "ja_JP"],
    
    "main": {
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

## 步骤四、更换代码中使用到的字符串

调整 plugin.js，使用 i18next 方法获取字符串，并进行 alert

{% code title="plugin.js" %}

```javascript
eagle.onPluginCreate((plugin) => {

    // 取得多国语言字段
    let copyText = i18next.t('contextMenu.copy');
    let pasteText = i18next.t('contextMenu.paste');

    document.querySelector('#message').innerHTML = `
    <ul>
        <li>Language: ${eagle.app.locale}</li>
        <li>Copy: ${copyText}</li>
        <li>Paste: ${pasteText}</li>
    </ul>
    `;
});
```

{% endcode %}

## 步骤五、切换应用语言，查看修改结果

您可以依照以下步骤来更改 Eagle 软件的语言设置：在萤幕上找到并点击 「Eagle」 按钮，接着选择 「偏好配置」，然后点击 「常用」 选项，最后在 「语言」 部分进行所需修改。

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2FUFA3jrYlSYjkehVk4stt%2Fimage.png?alt=media&#x26;token=bea62075-2ad2-41e9-a92c-b146c9ed89b5" alt=""><figcaption></figcaption></figure>

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-a32e2c55e65473ae04516b88f980c83fc620a3ba%2Fimage%20(20).png?alt=media" alt=""><figcaption></figcaption></figure>

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fgit-blob-cb19a0370eaf4f0da654e55033aeda93aa49c713%2Fimage%20(16)%20(1).png?alt=media" alt=""><figcaption></figcaption></figure>


**完整示例代码：**

<https://github.com/eagle-app/eagle-plugin-examples/tree/main/i18n>


## 学习进阶用法

i18next 拥有许多便捷的方法，让我们能够轻松应对各种翻译情境。为了保证篇幅，这里仅对核心使用方法进行说明。如果需要了解 i18next 的使用方法和进阶用法，推荐阅读以下链接：

* i18next 官方文档：<https://www.i18next.com/overview/getting-started>
* i18next 的 GitHub 仓库：<https://github.com/i18next/i18next>

通过阅读官方文档，你可以了解 i18next 的基本概念和用法，并找到一些示例代码来帮助你开始使用它。GitHub 仓库中包含了 i18next 的源代码和更多的文档，如果你想进一步了解它的实现细节，可以在那里查看。

# 无边框窗口

无边框窗口是一种特殊的窗口模式，它不带有外壳（包括窗口边框、标题栏、工具栏等），只含有网页内容。使用无边框窗口模式可以让您完全自定义窗口界面，让您的应用程序在所有操作系统上的风格都保持一致。不过，由于无边框窗口没有系统自带的外壳，因此在使用时需要注意，以免影响用户体验。

## 创建无边框窗口​

在 `manifest.json` 文件中，将 `window` 对象的 `frame` 属性设置为 `false`，即可启用无边框窗口模式。

```json
{
    "id": "LB5UL2P0Q9FFF",
    "version": "1.0.0",
    "name": "Hello World",
    "logo": "/logo.png",
    "keywords": ["keywrod1", "keywrod2"],
    "main":
    {
        "frame": false,        // 👈 无边框模式
        "url": "index.html",
        "width": 640,
        "height": 480
    }
}
```

## 可拖拽区 <a href="#ke-tuo-ye-qu" id="ke-tuo-ye-qu"></a>

您可以在应用程序中使用 `-webkit-app-region` 属性，来控制应用程序窗口的可拖拽区域。

默认情况下, 无边框窗口是不可拖拽的。 应用程序需要在 CSS 中指定 `-webkit-app-region: drag` 来告诉插件哪些区域是可拖拽的（如操作系统的标准标题栏），在可拖拽区域内部使用 `-webkit-app-region: no-drag` 则可以将其中部分区域排除。 请注意, 当前只支持矩形形状。

要使整个窗口可拖拽, 您可以添加 `-webkit-app-region: drag` 作为 `body` 的样式:

```html
<body style="-webkit-app-region: drag">
</body>
```

请注意，如果您使整个窗口都可拖拽，则必须将其中的按钮标记为不可拖拽，否则用户将无法点击它们：

```css
button {
  -webkit-app-region: no-drag;
}
```

如果只将自定义标题栏设置为可拖拽，还需要使标题栏中的所有按钮都不可拖拽。

# event（事件）

## onPluginCreate(callback) <a href="#gylpl" id="gylpl"></a>

插件窗口建立时，Eagle 会主动调用这个方法，你可以使用此方法初始化插件需要的模块。

* `callback` Function
  * `plugin` Object - 插件属性
    * `manifest` Object - 插件 manifest.json 完整配置。
    * `path` String - 插件所在路径

```javascript
eagle.onPluginCreate((plugin) => {
    console.log(plugin.manifest.name);
    console.log(plugin.manifest.version);
    console.log(plugin.manifest.logo);
    console.log(plugin.path);
});
```


提示：如果插件不需要 manifest 信息就可以运行，那么你也可以使用 `window.onload` 来进行开发。


## onPluginRun(callback) <a href="#gylpl" id="gylpl"></a>

当用户点击插件面板的插件时，Eagle 会主动调用这个方法。

* `callback` Function

```javascript
eagle.onPluginRun(() => {
    console.log('eagle.onPluginRun');
});
```

## onPluginBeforeExit(callback) <a href="#z1a5y" id="z1a5y"></a>

插件窗口关闭前 Eagle 会主动调用这个方法。

* `callback` Function

```javascript
eagle.onPluginBeforeExit(() => {
    console.log("插件将退出");
});

// 阻止窗口关闭
window.onbeforeunload = (event) => {
    return event.returnValue = false;
};
```


提示：如果你想要阻止窗口被关闭，你可以注册 `window.onbeforeunload`方法避免窗口被关闭。


## onPluginShow(callback) <a href="#w2vxi" id="w2vxi"></a>

插件窗口显示时时，Eagle 会主动调用这个方法。

* `callback` Function

```javascript
eagle.onPluginShow(() => {
    console.log("插件窗口显示");
});
```

## onPluginHide(callback) <a href="#zgvst" id="zgvst"></a>

插件窗口隐藏时时，Eagle 会主动调用这个方法。

* `callback` Function

```javascript
eagle.onPluginHide(() => {
    console.log("插件窗口隐藏");
});
```

## onLibraryChanged(callback) <a href="#g3tny" id="g3tny"></a>

当用户切换资源库时，Eagle 会主动调用这个方法。

* `callback` Function
  * `libraryPath` String - 当前资源库路径。

```javascript
eagle.onLibraryChanged((libraryPath) => {
    console.log(`侦测到资源库切换，新的资源库路径: ${libraryPath}`);
});
```


提示：如果你需要获取更完整的资源库信息，你可以使用 `eagle.library.info()` 方法取得。


{% hint style="warning" %}
**注意：** 如果插件执行过程必须依赖相对的资源库路径，你可能需要透过注册此方法，在资源库切换时，做出对应的调整，避免程序执行过程发生错误。


## onThemeChanged(callback) <a href="#xlf6z" id="xlf6z"></a>

Eagle 主程序主题配色改变是，Eagle 会主动调用这个方法，如果插件支持多种配色主题，你可以使用此方法做出对应的 UI 调整。

* `callback` Function
  * `theme` String - 当前主题配色的名称，如 `Auto`、`LIGHT`、`LIGHTGRAY`、`GRAY`、`DARK`、`BLUE`、`PURPLE`。

```javascript
eagle.onThemeChanged((theme) => {
    console.log(`配色主题以改为: ${theme}`);
});
```

### &#x20;<a href="#nptwx" id="nptwx"></a>

# item（项目）

```javascript
eagle.onPluginCreate(async (plugin) => {
    // 取得 Eagle 应用当前被选中的文件
    let items = await eagle.item.getSelected();
    let item = items[0];
    
    // 修改属性
    item.name = 'New Name';
    item.tags = ['tag1', 'tag2'];
    
    // 保存修改
    await item.save();
});
```

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 `item` API 提供的 `save()` 方法进行数据的存取与修改，应避免直接修改 Eagle 资源库底下的 `metadata.json` 或任意文件。


***

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## get(options) <a href="#bdcw2" id="bdcw2"></a>

万用搜索方法，可获取指定条件的文件。

* `options` Object - 查询条件
  * `id` string (可选) - 文件 id
  * `ids` string\[] (可选) - 文件 id 数组
  * `isSelected` boolean (可选) - 正在被选中的文件
  * `isUntagged` boolean (可选) - 尚未标签
  * `isUnfiled` boolean (可选) - 尚未分类
  * `keywords` string\[] (可选) - 包含关键字
  * `tags` string\[] (可选) - 包含标签
  * `folders` string\[] (可选) - 包含文件夹
  * `ext` string (可选) - 格式
  * `annotation` string (可选) - 注释
  * `rating` Interger (可选) - 评分，`0 ~ 5`
  * `url` string (可选) - 来源链接
  * `shape` string (可选) - 形状，`square`、`portrait`、`panoramic-portrait`、`landscape`、`panoramic-landscape`
  * `fields` string\[] (可选) - 指定返回的字段，仅返回需要的数据以提升性能
* 返回 `Promise<items: Item[]>` - `items` 查询结果

```javascript
let items = await eagle.item.get({
    ids: [],
    isSelected: true,
    isUnfiled: true,
    isUntagged: true,
    keywords: [""],
    ext: "",
    tags: [],
    folders: [],
    shape: "square",
    rating: 5,
    annotation: "",
    url: ""
});


let selected = await eagle.item.get({
    isSelected: true
});

let jpgs = await eagle.item.get({
    ext: "jpg"
});

// 仅获取特定字段以提升性能
let itemsWithFields = await eagle.item.get({
    tags: ["Design"],
    fields: ["id", "name", "tags", "modifiedAt"]
});
```


提示：使用 `fields` 参数可以显著提升性能，特别是在处理大量文件时只需要部分信息的场景。


***

## getAll() <a href="#na8ve" id="na8ve"></a>

返回所有文件

* 返回 `Promise<items: Item[]>` - `items` 所有文件

```javascript
let items = await eagle.item.getAll();
console.log(items);
```

{% hint style="success" %}
**🦄 最佳实践：** 如果资源库文件数量非常多（例：20W+），避免无限制的呼叫此方法，避免造成应用性能的降低。


***

## getById(itemId) <a href="#katrb" id="katrb"></a>

返回指定 ID 之文件

* `itemId` string
* 返回 `Promise<item: Item>` - `item` 对应 ID 的文件

```javascript
let item = await eagle.item.getById('item_id');
console.log(item);
```

## getByIds(itemIds) <a href="#by1ek" id="by1ek"></a>

返回指定 IDs 之文件

* `itemIds` string\[]
* 返回 `Promise<items: Item[]>` - `items` 对应 IDs 的文件

```javascript
let items = await eagle.item.getByIds(['item_id_1', 'item_id_2']);
console.log(items);
```

***

## getSelected() <a href="#ffgvj" id="ffgvj"></a>

返回应用当前选中的文件

* 返回 `Promise<items: Item[]>` - `items` 选中之文件

```javascript
let selected = await eagle.item.getSelected();
console.log(selected);
```

***

## getIdsWithModifiedAt() <a href="#getidswithmodifiedat" id="getidswithmodifiedat"></a>

快速获取所有文件的 ID 和最后修改时间

* 返回 `Promise<items: Object[]>` - 包含 `id` 和 `modifiedAt` 的对象数组

```javascript
let idsWithTime = await eagle.item.getIdsWithModifiedAt();
console.log(idsWithTime);
// 输出示例：
// [
//   { id: "ITEM_ID_1", modifiedAt: 1625123456789 },
//   { id: "ITEM_ID_2", modifiedAt: 1625123456790 },
//   ...
// ]

// 可用于增量同步或检测文件变化
let changedItems = idsWithTime.filter(item => 
    item.modifiedAt > lastSyncTime
);
```


提示：此方法专门优化用于获取文件 ID 和修改时间，比使用 `get()` 方法获取完整数据要快得多。


***

## count(options) <a href="#count" id="count"></a>

计算符合条件的文件数量，支持与 `get()` 方法相同的查询条件。

* `options` Object - 查询条件（与 `get()` 方法相同）
  * `id` string (可选) - 文件 id
  * `ids` string\[] (可选) - 文件 id 数组
  * `isSelected` boolean (可选) - 正在被选中的文件
  * `isUntagged` boolean (可选) - 尚未标签
  * `isUnfiled` boolean (可选) - 尚未分类
  * `keywords` string\[] (可选) - 包含关键字
  * `tags` string\[] (可选) - 包含标签
  * `folders` string\[] (可选) - 包含文件夹
  * `ext` string (可选) - 格式
  * `annotation` string (可选) - 注释
  * `rating` Interger (可选) - 评分，`0 ~ 5`
  * `url` string (可选) - 来源链接
  * `shape` string (可选) - 形状，`square`、`portrait`、`panoramic-portrait`、`landscape`、`panoramic-landscape`
* 返回 `Promise<count: number>` - `count` 符合条件的文件数量

```javascript
// 计算 JPG 格式文件数量
let jpgCount = await eagle.item.count({
    ext: "jpg"
});

// 计算带有特定标签的文件数量
let taggedCount = await eagle.item.count({
    tags: ["Design", "Illustration"]
});

// 计算未分类文件数量
let unfiledCount = await eagle.item.count({
    isUnfiled: true
});
```


提示：当只需要获取文件数量时，使用 `count()` 比 `get()` 性能更好。


***

## countAll() <a href="#countall" id="countall"></a>

快速返回资源库中所有文件的总数

* 返回 `Promise<count: number>` - `count` 所有文件数量

```javascript
let totalCount = await eagle.item.countAll();
console.log(`资源库共有 ${totalCount} 个文件`);
```


提示：`countAll()` 针对性能进行了优化，比 `getAll()` 后计算数组长度要快得多。


***

## countSelected() <a href="#countselected" id="countselected"></a>

返回应用当前选中的文件数量

* 返回 `Promise<count: number>` - `count` 选中的文件数量

```javascript
let selectedCount = await eagle.item.countSelected();
console.log(`当前选中了 ${selectedCount} 个文件`);
```

***

## select(itemIds) <a href="#select" id="select"></a>

选中指定的文件

* `itemIds` string\[] - 要选中的文件 ID 数组
* 返回 `Promise<result: boolean>` - `result` 是否选中成功

```javascript
// 选中单个文件
await eagle.item.select(['ITEM_ID_1']);

// 选中多个文件
await eagle.item.select(['ITEM_ID_1', 'ITEM_ID_2', 'ITEM_ID_3']);

// 清空选中
await eagle.item.select([]);
```


提示：调用此方法会替换当前的选中状态，而不是追加到现有选中项。



提示：`select()` 方法需要 Eagle 4.0 build12 以上版本支持。


***

## addFromURL(url, options) <a href="#tg9ak" id="tg9ak"></a>

将图片链接添加至 Eagle

* `url`string - 欲添加图片链接，支持 `http`、 `https`、 `base64`
* `options` Object
  * `name` string (可选) - 文件名
  * `website` string (可选) - 来源网址
  * `tags` string\[] (可选) - 标签
  * `folders` string\[] (可选) - 所属文件夹 IDs
  * `annotation` string (可选) - 注释
* 返回 `Promise<itemId: string>` - `itemId`成功创建的项目 ID

```javascript
const imgURL = 'https://cdn.dribbble.com/userupload/3885520/file/original-ee68b80a6e10edab6f192e1e542da6ed.jpg';
const itemId = await eagle.item.addFromURL(imgURL, { 
    name: 'Camping', 
    website: 'https://dribbble.com/shots/19744134-Camping-2', 
    tags: ["Dribbble", "Illustration"],
    folders: [],
    annotation: 'add from eagle api',
});
```

***

## addFromBase64(base64, options) <a href="#zmwst" id="zmwst"></a>

添加 base64 图像至 Eagle

* `base64`string - base64 格式图像
* `options` Object
  * `name` string (可选) - 文件名
  * `website` string (可选) - 来源网址
  * `tags` string\[] (可选) - 标签
  * `folders` string\[] (可选) - 所属文件夹 IDs
  * `annotation` string (可选) - 注释
* 返回 `Promise<itemId: string>` - `itemId`成功创建的项目 ID

```javascript
const base64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjM0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNDAgMjM0Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzI2MTMwMCIgZD0iTTEwIDEwaDIyMHYyMTMuOTk5aC0yMjB6Ii8+PHBhdGggZD0iTTAgMHYyMzRoMjQwLjAwMXYtMjM0aC0yNDAuMDAxem0xMCAxMGgyMjAuMDAxdjIxNGgtMjIwLjAwMXYtMjE0em03My4yNTIgMTIyLjUwMWwtNy45MiAyOS45ODJjLS4xNjUuODI0LS40OTUgMS4wMTgtMS40ODUgMS4wMThoLTE0LjY4N2MtLjk4OCAwLTEuMTUyLS4zMy0uOTg4LTEuNDg1bDI4LjM4LTk5LjQ0OGMuNDk1LTEuODE1LjgyNS0zLjM3Ny45OS04LjMyOCAwLS42Ni4zMy0uOTkuODI1LS45OWgyMC45NTVjLjY2IDAgLjk5LjE2NSAxLjE1NS45OWwzMS44NDUgMTA3Ljk0Yy4xNjUuODI0IDAgMS4zMi0uODI1IDEuMzJoLTE2LjVjLS44MjQgMC0xLjMxOS0uMTkzLTEuNDg0LS44NTRsLTguMjUtMzAuMTQ2aC0zMi4wMTF6bTI3Ljg4NS0xNi4yNWMtMi44MDUtMTEuMDU2LTkuNDA1LTM1LjI4Ni0xMS44OC00N2gtLjE2NWMtMi4xNDYgMTEuNzE1LTcuNDI1IDMxLjQ5LTExLjU1IDQ3aDIzLjU5NXptNDQuOTkzLTU1LjU3OGMwLTYuNDM1IDQuNDU1LTEwLjIzIDEwLjIzLTEwLjIzIDYuMTA1IDAgMTAuMjMgNC4xMjUgMTAuMjMgMTAuMjMgMCA2LjYtNC4yOSAxMC4yMy0xMC4zOTUgMTAuMjMtNS45NCAwLTEwLjA2NS0zLjYzLTEwLjA2NS0xMC4yM3ptMS4xMiAyMi43MzJjMC0uODI1LjMzLTEuMTU1IDEuMTU1LTEuMTU1aDE1LjY4OWMuODI1IDAgMS4xNTUuMzMgMS4xNTUgMS4xNTV2NzguOTM5YzAgLjgyNi0uMTY1IDEuMTU2LTEuMTU1IDEuMTU2aC0xNS41MjRjLS45OSAwLTEuMzItLjQ5Ni0xLjMyLTEuMzJ2LTc4Ljc3NXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjRkY3QzAwIi8+PC9zdmc+';
const itemId = await eagle.item.addFromBase64(base64, { 
    name: 'Illustation Logo', 
    website: 'https://www.eagle.cool/', 
    tags: ["Adobe", "Logo"],
    folders: [],
    annotation: 'ai logo form api',
});
```

***

## addFromPath(path, options) <a href="#lnsox" id="lnsox"></a>

从本地文件路径添加文件至 Eagle

* `path`string - 欲添加文件路径
* `options` Object
  * `name` string (可选) - 文件名
  * `website` string (可选) - 来源网址
  * `tags` string\[] (可选) - 标签
  * `folders` string\[] (可选) - 所属文件夹 IDs
  * `annotation` string (可选) - 注释
* 返回 `Promise<itemId: string>` - `itemId`成功创建的项目 ID

```javascript
const filePath = 'C:\\Users\\User\\Downloads\\ai.svg';
const itemId = await eagle.item.addFromPath(filePath, { 
    name: 'Illustation Logo', 
    website: 'https://www.eagle.cool/', 
    tags: ["Adobe", "Logo"],
    folders: [],
    annotation: 'ai logo form api',
});
```

***

## addBookmark(url, options) <a href="#atulp" id="atulp"></a>

添加书签链接至 Eagle

* `url`string - 欲添加书签链接
* `options` Object
  * `name` string (可选) - 书签名
  * `base64` string (可选) - 自订缩图 base64 格式
  * `tags` string\[] (可选) - 标签
  * `folders` string\[] (可选) - 所属文件夹 IDs
  * `annotation` string (可选) - 注释
* 返回 `Promise<itemId: string>` - `itemId`成功创建的项目 ID

```javascript
const bookmarkURL = 'https://www.google.com/';
const itemId = await eagle.item.addBookmark(bookmarkURL, { 
    name: 'Eagle', 
    tags: ["Eagle", "Site"],
    folders: [],
    annotation: 'bookmark form api',
});
```

```javascript
const bookmarkURL = 'https://www.google.com/';
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAnCAYAAACIVoEIAAAAAXNSR0IArs4c6QAACUFJREFUWAmlWFlzVMcV/u42Gi0w2pEE1miFIIGRkMoowRCbRErKlUqeU5Uqv+UhD6n4yW8pJ1V5i/9AquynuPLisCUEHNtsdkJYBAGMkWWJAhGMomAWIzSjmbvkO31vX90ZCSMlPdW3u8/e55w+t+8A/2cLAHNZf+MNU4tdhluJPoQZmieeaMBaxt/OuD++b1k/c/MuEElKV9nG/KXLF998e+C137zpvpWzrO7AJb680Vo/gnEKJ2X76zzvd68/Z79jd/ziRG3RMUaNIKiIqcoFlK0LnofNm9Y7M/ng1/dtbDICG4ZItoDqB3kceusPzQ9/Or1QaVqv5opir10mAQiEnk0GmYu7m4oBqfGOXTC8n5t25leBu6iECuGzmhlYaO7dhEeGDT/nwoi8VJm2cX3/u5i363utlrbX53M+DD/yh9BEhmj5asmHjAEN56hcagcwGwKvAGVURC1ET4ur5wVo3VCDup4GzC+60Mlj2BaKMzdx7vQ4XvzJqwiq0wiKrlKoZCWFci5L3ZTXCPAjILdKRkZOuzMm1JOy0WSctgxnsWAyJJ6PgBqFt5rw8388gNquPnQM9WGh4C1tTO8wUprUpUDyYPd9X1GaQRBQ3Op+ruuho6sR6U1NcF0aJLL4sBwbjy6PY+KzOxj5wSjydopwyiROaMQD0mWtxtCGEC/waO3TFk7B8DFUGiqQsqbwhInZ6QoLXTs78IQb4sFQlAETKlXI4fSBP6Fr126GtR0LDJuSLo+QLKRVz8SDuBgt8yj9TPos3JXi1x4LiUMGgTEDiz56+9oQ1K9HIGETej6clIU7p47j3jwwOLYXC54StOQV0iiPrTCKDSU4rqXZgpBkFXcvteRcxRp1tWm0bhcv8ERF6MA0YXx5D+eOncDzYz+C09SAxad4aUl2OIs1cCJzKQmuH4WPIEP7MCYkUdLzAb25eTCLxTRPFPMqRBpIOyYm/3IYyLSh91tDyBWZ3JESFT7KEZl6zmnckrpiby2FTxj5izEidWnt0YjWtgzWd7eiQKXSlFNZAgo3JnHl3FUMvTIGr6qKOSF8oSFJcXGikzeeh2pCes2jpKvw+cp1hC9vBFqmge6dncgZLNeSf0LFrVcEHsYPH0Tj1kG0bNuCXLIEkEToYg9FE7UZ4U8o01PBicHSVO3TngqPceglmUsJyHY3w2ltLCkBpuPg4aWzmL4xh/7du1CwHCqSA7PcS6JHwQWn+wowMUhopZm+t5RTChJhxKiqSgfPDdBLYdSUUJ8lwMnN48rR93gSs7h55iQst8jXpqRmwN1GIaScZadLFOtOZcoQvRb6KNFDTylBkTARTQKPxbGrfxP8zDr4UgIiZoeF8s7Jv+KhW4F9P/wObk7ewv3xM7BsvrtiBWKeyAmNLDE0CQupljYSJzotpqywk0HmHo2oq6tC09Z25FkCpCmFJvNq7i6unPwYW1/eh5bBPnR9cy8uHTkK68nj0FsUsJKHxLCkcUqe3oTIZ49skhwXLwhWVLPJyPzoHuxEPlWhfKwFpCwTnx89xHrUiezQAB7mfWzZM4IFowYzJ45BvKhpVzuWh1BMMHmM1dkQw6RLcrdsrEd1thVFlgBlIx8Gw5Of+gSfX53E9u+NophK813OupTJoP+7o7h6+gy82TsI6E0xqESZ3qseiS83WugZINWWckoYiLDpjexgF3LRpUQpYBI7vE1cP3IITduGUd/bw5oltwuwgnvYOPg80q09mDxyEI5lxAYpwyK5JUYIjL3EcAL8oOSWEHKKl9p7W2A1N6hE14LkFvBw/GN8MfsYm/fuQV4MphCFp2SXYd42NoqpT2/gycRVetWJPSGKtfLkqOYrGEwQpcurWTEGqK5O8f3WhbxLAJso9Q0T1vwjTHz4AczGrNylmYV8j0sJYHmQUSp9XU83NuzYhWt/Zs65BcUXqDIhpSKkS44Kx8wR/rCLGSpwrFOinD8pAR3bsnBrangLkPwKjXL4Orl76ii+LPAiaKUwfewQ7EdzcIp52IU8nKj7XEsh/c/9POb+fhwVflHh7UXSSSddPI9glsCiLnKC/ILKbzkuhpSA+sYa1G5u50tV/BAaZPAWgAdzmL54GVZDrzJ0+pMJfHHhNaSqqtVmxKNx46vIr/8Gzu8/gKrD7ypPxrhnTAw5ICzC0iQW6sKWHejGIj3BIkVlhNFmdSKrMmgceBF3Z2bRv2sHgt1D8B/wlNEz8ReDEiUPfrc0tiNYJM1Xc1yG4YjRXzORO76Rz+PC8bfp0WLBaO+VK24rCyWPuHKg5g5QMB1kR0YwO/V7GAtzaNz3Ci98O2I6Rc5HzCZx52oN9qgImPRH9WIRF37Jc1KVdrBxRy9ycsWVgIQyJdFU8+k5u7YencPD+PT9/RjZuhNeppknoHQDyc3EBuq9yaiBWr7AIh0KHTgo5PKKyty+dzuM+hoWQj88ukJLYqHXyS61qGVgEBZP38z7THTWsiRe0+lRH31FE+nWuBI+4oRW00e1E2amrcmIKkBsRCyADEoIudxUJXpfHsWta58hf+MaL1pMR42PhCf5tKIkbMV5tHlFH364Gia/tQheaoqRy1ihKGYvsoJnuntQt3UoLAvyvSgBj/Ayxjzk51Ktn2acwGOc0MtaX110aSc8bkIgUmOFguG6wD8LOve8hHv3HvOS9zeYfB/GgoVeyGQs69qA5FhOo3hFD5t8RKzYFFGZcLmvV2xoxcYXvo2pD4/BePIVDWF+JehKjEzAkzTlc83Dmi3NMFm99bn4euOIFZ4COTe+MMIr8DrMfsR7lMOCKcoFLyO79ohel4wJuhJ4JIPo8DUjk2c1LUBuoUZNBtm9Y7h57izc2dvxdUXTxCOFKmOTY6Rc4Enj1Tx0EEtcdF14llFJfJFhbOzfjgpeV25/cBA2v3iUt0Sh7gmlGqeN0KMYpnqCR/Tww4F/5/CWa/Kx6s5KGVSk0bnv+/j3jRksTP4T8oUTChJh7HwPGolevtY4gQu9vAECFmQ2w75z/pTdMLiHO5TUErtX1+S6ka60kM724dbJ99BT20AZq+cv1xKwID+YuMid8YX8+F/T/3DT68ZM23H+F6EBt7jgWpi7flm+XMt1rWFt+LlbUx+RwRX3VFZsGW63U04K4c1hDYJYVAsF0qd4+VsTWykx/cO/Ib35a2dvE/H4v9IJhWmtCpMiAAAAAElFTkSuQmCC';
const itemId = await eagle.item.addBookmark(bookmarkURL, { 
    name: 'Eagle', 
    base64: base64,
    tags: ["Eagle", "Site"],
    folders: [],
    annotation: 'bookmark form api',
});
```

***

## open(itemId, options) <a href="#yxkul" id="yxkul"></a>

在全部列表显示 `itemId` 对应的文件

* `itemId`string - 欲显示文件 ID
* `options` Object (可选) - 开启选项
  * `window` boolean (可选) - 是否在新窗口中开启文件，默认为 `false`
* 返回 `Promise<result: boolean>`

```javascript
// 在当前窗口开启
await eagle.item.open("item_id");

// 在新窗口开启
await eagle.item.open("item_id", { window: true });
```


提示：`window` 参数需要 Eagle 4.0 build12 以上版本支持。



提示：你也可以直接呼叫 item 实例的 `open()` 方法打开文件。


***

## 類：Item <a href="#uezi0" id="uezi0"></a>

由 Eagle API `get`返回的 Object 类型，提供修改、保存功能。

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 Item 实例提供的 `save()` 方法进行数据的存取与修改，应避免直接修改 Eagle 资源库底下的 `metadata.json` 或任意文件。


***

#### 实例方法 <a href="#sihmc" id="sihmc"></a>

### **save()**

保存所有修改

* 返回 `Promise<result: boolean>` - `result`是否修改成功

```javascript
let item = await eagle.item.getById('item_id');
item.name = 'New Name';
item.tags = ['tag_1', 'tag_2'];

// 保存修改
await item.save();
```

***

### moveToTras&#x68;**()**

将文件丢到垃圾桶

* 返回 `Promise<result: boolean>` - `result`是否成功删除

```javascript
await item.moveToTrash();
```

***

### **replaceFile(filePath)**

使用指定文件替换原文件，将自动刷新缩略图，无须再次呼叫 `refreshThumbnail()`。

{% hint style="success" %}
**🦄 最佳实践：** 直接对要更改的文件进行操作是具有风险的，若过程中出现错误或异常，都有可能造成文件损毁且无法复原。因此，先将新版本文件保存在电脑其它路径，确定无误后，再使用 `replaceFile()`方法来替换是更稳健的作法。


* `filePath`string - 欲替换文件之路径
* 返回 `Promise<result: boolean>` - `result`是否替换成功

```javascript
let item = await eagle.item.getById('item_id');
let result = await item.replaceFile('new_file_path');

console.log(result);
```

***

### **refreshThumbnail()**

重新刷新文件缩略图，同时也会重新获取文件大小、颜色分析、尺寸等属性。

* 返回 `Promise<result: boolean>` - `result`是否成功

```javascript
let item = await eagle.item.getById('item_id');
let result = await item.refreshThumbnail();

console.log(result);
```

***

### **setCustomThumbnail(thumbnailPath)**

为文件设置自定缩略图。

* `thumbnailPath`string - 欲设置缩略图的路径
* 返回 `Promise<result: boolean>` - `result`是否替换成功

```javascript
let item = await eagle.item.getById('item_id');
let result = await item.setCustomThumbnail('thumbnail_path');

console.log(result);
```

***

### **open(options)**

在全部列表显示此文件

* `options` Object (可选) - 开启选项
  * `window` boolean (可选) - 是否在新窗口中开启文件，默认为 `false`
* 返回 `Promise<void>`


提示：你也可以直接呼叫 `eagle.item.open(itemId, options)`方法打开文件夹。


```javascript
let item = await eagle.item.getById('item_id');
// 在当前窗口开启
await item.open();

// 在新窗口开启
await item.open({ window: true });

// 等价于
await eagle.item.open('item_id');
await eagle.item.open('item_id', { window: true });
```


提示：`window` 参数需要 Eagle 4.0 build12 以上版本支持。


***

### **select()**

选中此文件

* 返回 `Promise<result: boolean>` - `result` 是否选中成功

```javascript
let item = await eagle.item.getById('item_id');
await item.select();

// 等价于
await eagle.item.select([item.id]);
```


提示：调用实例方法 `select()` 会清空当前选中并仅选中此文件。如需批量选中多个文件，请使用静态方法 `eagle.item.select(itemIds)`。



提示：`select()` 方法需要 Eagle 4.0 build12 以上版本支持。


***

#### 实例属性 <a href="#woenk" id="woenk"></a>

### **`id` string**

只读，文件 ID。

### **`name` string**

文件名。

### **`ext` string**

只读，文件扩展名。

### **`width` Interger**

图像宽度。

### **`height` Interger**

图像高度。

### **`url` string**

来源链接。

### **`isDeleted` boolean**

只读，文件是否在垃圾桶。

### **`annotation` string**

文件注释。

### **`tags` string\[]**

文件标签。

### **`folders` string\[]**

所属文件夹 ids。

### **`palettes` Object\[]**

只读，色票信息。

### **`size` Interger**

只读，文件大小。

### **`star` Interger**

评分信息，`0 ~ 5`。

### **`importedAt` Interger**

导入时间（时间戳）。可读写，修改后需调用 `save()` 保存。

```javascript
// 读取导入时间
let date = new Date(item.importedAt);

// 修改导入时间（需要 Eagle 4.0 build18+）
item.importedAt = Date.now();
item.importedAt = new Date('2024-01-01').getTime();
await item.save();
```


备注：设置值必须为正整数时间戳，无效值将被忽略。此功能需要 Eagle 4.0 build18 或更高版本。


### **`modifiedAt` Interger**

只读，最后修改时间。

```javascript
let modifiedDate = new Date(item.modifiedAt);
console.log(`文件最后修改于: ${modifiedDate.toLocaleString()}`);
```

### **`noThumbnail` boolean**

只读，文件是否有缩略图，无缩略图文件将以原始文件进行预览。

### **`noPreview` boolean**

只读，文件是否支持双击预览。

### **`filePath` string**

只读，返回文件所在路径。

### **`fileURL` string**

只读，返回文件所在路径之链接（`file:///`）。

### **`thumbnailPath` string**

只读，返回缩略图路径。

### **`thumbnailURL` string**

只读，返回缩略图链接（`file:///`），如需在 HTML 显示该文件，可以使用这个属性。

### **`metadataFilePath`string**

只读，该文件 `metadata.json` 所在位置。

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 `item` API 提供的 `save()` 方法进行数据的存取与修改，应避免直接 `metadata.json`。


### &#x20;<a href="#nptwx" id="nptwx"></a>

# folder（文件夾）

```javascript
// 取得 Eagle 应用当前被选中的文件夹
let folder = (await eagle.folder.getSelected())[0];

// 修改属性
folder.name = 'New Folder Name';
folder.description = 'New description...';

// 保存修改
await folder.save();
```

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 API 提供的 `save()` 方法进行数据的存取与修改，应避免直接修改 Eagle 资源库底下的 `metadata.json` 或任意文件。


## 方法 <a href="#z1a5y" id="z1a5y"></a>

## create(options) <a href="#xnzds" id="xnzds"></a>

建立文件夾

* `options` Object
  * `name` string - 文件夾名
  * `description` string (可选) - 文件夾描述
  * `parent` string (可选) - 父文件夹 ID，带此参数等同 `createSubfolder(parentId, options)`
* 返回 `Promise<folder: Folder>` - `folder` 成功创建的文件夹

```javascript
let newFoler = await eagle.folder.create({
    name: 'New Folder',
    description: 'Folder\'s description.',
});
```

***

## createSubfolder(parentId, options) <a href="#rys4i" id="rys4i"></a>

建立子文件夾

* `parentId` string - 父文件夹 ID
* `options` Object
  * `name` string - 文件夾名
  * `description` string (可选) - 文件夾描述
* 返回 `Promise<folder: Folder>` - `folder` 成功创建的文件夹

```javascript
let parentFolder = await eagle.folder.getById('folder_id');
let subFolder = await eagle.folder.createSubfolder(parentFolder.id, {
    name: 'Subfolder',
    description: 'Subfolder description.',
});
```

***

## get(options) <a href="#x9nu2" id="x9nu2"></a>

获取指定条件的文件夹。

* `options` Object - 查询条件
  * `id` string (可选) - 文件夾 id
  * `ids` string\[] (可选) - 文件夾 id 数组
  * `isSelected` boolean (可选) - 正在被选中的文件夹
  * `isRecent` boolean (可选) - 近期存取的文件夹
* 返回 `Promise<folders: Folder[]>` - `folders` 查询结果

```javascript
// 取得指定 id 对应的文件夹
let folders = await eagle.folder.get({
    ids: ['folder_id1', 'folder_id2']
});

// 取得应用当前被选中的文件夹
let folders = await eagle.folder.get({
    isSelected: true
});
```

***

## getAll() <a href="#fbdzh" id="fbdzh"></a>

获取所有文件夹。

* 返回 `Promise<folders: Folder[]>` - `folders` 查询结果

```javascript
let folders = await eagle.folder.getAll();
```

***

## getById(folderId) <a href="#sy5fz" id="sy5fz"></a>

获取对应 `folderId` 的文件夹。

* `folderId` string - 文件夾 id
* 返回 `Promise<folder: Folder>` - `folder` 查询结果

```javascript
let folder = await eagle.folder.getById('folder_id');
```

***

## getByIds(folderIds) <a href="#n0gjq" id="n0gjq"></a>

获取对应 `folderIds` 的文件夹数组。

* `folderIds` string\[] - 文件夾 id 数组
* 返回 `Promise<folders: Folder[]>` - `folders` 查询结果

```javascript
let folders = await eagle.folder.getByIds(['folder_id1', 'folder_id2']);
```

***

## getSelected() <a href="#dsbgj" id="dsbgj"></a>

获取当前应用选中的文件夹

* 返回 `Promise<folders: Folder[]>` - `folders`

```javascript
let folders = await eagle.folder.getSelected();
```

***

## getRecents() <a href="#dwsxw" id="dwsxw"></a>

获取最近使用的的文件夹

* 返回 `Promise<folders: Folder[]>` - `folders`

```javascript
let folders = await eagle.folder.getRecents();
```

***

## open(folderId) <a href="#gjdst" id="gjdst"></a>

Eagle 将打开对应 `folderId`文件夹。

* 返回 `Promise<void>`

```javascript
await eagle.folder.open('folder_id');

// 等价于
let folder = await eagle.folder.getById('folder_id');
await folder.open();
```


提示：你也可以直接呼叫 folder 实例的 `open()` 方法打开文件夹。


***

## 類：Folder <a href="#uezi0" id="uezi0"></a>

由 Folder API `get`返回的 Object 类型，提供修改、保存功能。

```javascript
let folder = await eagle.folder.getById('folder_id');

console.log(folder.id);
console.log(folder.name);

folder.name = 'new name';
console.log(folder.name);

await folder.save();
```

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 Folder 实例提供的 `save()` 方法进行数据的存取与修改，应避免直接修改 Eagle 资源库底下的 `metadata.json` 或任意文件。


***

#### 实例方法 <a href="#sihmc" id="sihmc"></a>

### **save()**

保存所有修改

* 返回 `Promise<void>`

```javascript
let folder = await eagle.folder.getById('folder_id');
folder.name = 'New Fodler Name';

// 保存修改
await folder.save();
```

***

### **open()**

Eagle 将打开此文件夹。

* 返回 `Promise<void>`

```javascript
let folder = await eagle.folder.getById('folder_id');
await folder.open();

// 等价于
await eagle.folder.open('folder_id');
```


提示：你也可以直接呼叫 `eagle.folder.open(folderId)`方法打开文件夹。


***

#### 实例属性 <a href="#woenk" id="woenk"></a>

`Folder` 实例包含以下属性：

### **`id` string**

只读，文件夹 id。

### **`name` string**

文件夹名称。

### **`description` string**

文件夹描述、介绍。

### **`icon` string**

只读，文件夹图标。

### **`iconColor` string**

文件夹图标颜色。

```javascript
let folder = await eagle.folder.getById('folder_id');

// 设置文件夹颜色为红色
folder.iconColor = eagle.folder.IconColor.Red;

// 或直接使用字符串值
folder.iconColor = 'red';

// 保存修改
await folder.save();
```


提示：在 Eagle 4.0 build12 版本之前，此属性为只读状态，不支持修改。从 Eagle 4.0 build12 版本开始，支持修改此属性。


### **`createdAt` Interger**

只读，文件夹创建时间(timestamp)。

```javascript
let date = new Date(folder.createdAt);
```

### **`parent` string**

父文件夾 ID。

```javascript
let folder = await eagle.folder.getById('folder_id');

// 获取父文件夹 ID
console.log(folder.parent);

// 更改父文件夹（将文件夹移动到另一个父文件夹下）
folder.parent = 'parent_folder_id';
await folder.save();

// 移动到根目录（设为 null 或 undefined）
folder.parent = null;
await folder.save();
```


提示：在 Eagle 4.0 build12 版本之前，此属性为只读状态，不支持修改。从 Eagle 4.0 build12 版本开始，支持修改此属性，可以通过更改此属性来移动文件夹到不同的父文件夹下。


### **`children` Folder\[]**

只读，子文件夹数组。

```javascript
let children = folder.children;

console.log(children[0]);
await children[0].open();
```

***

## 靜態屬性 <a href="#static-properties" id="static-properties"></a>

### **`IconColor` Object**

提供预定义的文件夹图标颜色常量，用于设置文件夹的 `iconColor` 属性。

```javascript
// 可用的颜色常量
eagle.folder.IconColor.Red      // 'red'
eagle.folder.IconColor.Orange   // 'orange' 
eagle.folder.IconColor.Yellow   // 'yellow'
eagle.folder.IconColor.Green    // 'green'
eagle.folder.IconColor.Aqua     // 'aqua'
eagle.folder.IconColor.Blue     // 'blue'
eagle.folder.IconColor.Purple   // 'purple'
eagle.folder.IconColor.Pink     // 'pink'
```

**使用示例：**

```javascript
let folder = await eagle.folder.getById('folder_id');

// 使用颜色常量设置文件夹颜色
folder.iconColor = eagle.folder.IconColor.Blue;
await folder.save();

// 批量设置多个文件夹颜色
let folders = await eagle.folder.getAll();
for (let i = 0; i < folders.length; i++) {
    if (i % 2 === 0) {
        folders[i].iconColor = eagle.folder.IconColor.Green;
    } else {
        folders[i].iconColor = eagle.folder.IconColor.Purple;
    }
    await folders[i].save();
}
```

{% hint style="success" %}
**🦄 最佳实践：** 建议使用 `eagle.folder.IconColor` 常量而非直接使用字符串值，这样可以获得更好的代码提示和类型安全。


### &#x20;<a href="#nptwx" id="nptwx"></a>

# tag（标签）

```javascript
// 取得所有标签
const tags = await eagle.tag.get();

// 按名称筛选标签
const designTags = await eagle.tag.get({ name: "design" });

// 取得最近使用标签
const recents = await eagle.tag.getRecentTags();

// 取得常用标签
const starred = await eagle.tag.getStarredTags();
```

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## get(options) <a href="#x9nu2" id="x9nu2"></a>

获取标签，可通过选项进行筛选。

* `options` Object (可选) - 查询条件
  * `name` string (可选) - 按标签名称进行模糊搜索，不区分大小写
* 返回 `Promise<tags: Object[]>` - tags 查询结果。

```javascript
// 获取所有标签
const tags = await eagle.tag.get();

// 按名称筛选标签
const filteredTags = await eagle.tag.get({
    name: "design"
});
```


提示：`name` 参数需要 Eagle 4.0 build12 以上版本支持。


***

## getRecentTags() <a href="#dwsxw" id="dwsxw"></a>

获取最近使用的的标签。

* 返回 `Promise<tags: Object[]>` - tags 查询结果。

```javascript
const recents = await eagle.tag.getRecentTags();
```

***

## getStarredTags() <a href="#starred" id="starred"></a>

获取常用标签（用户收藏的标签）。

* 返回 `Promise<tags: Object[]>` - tags 查询结果。

```javascript
const starred = await eagle.tag.getStarredTags();
```


提示：`getStarredTags()` 方法需要 Eagle 4.0 build18 以上版本支持。


***

## merge(options) <a href="#merge" id="merge"></a>

合并标签：将来源标签重新命名为目标标签，所有使用来源标签的素材都会自动更新。

* `options` Object - 选项参数
  * `source` string - 来源标签名称（将被移除）
  * `target` string - 目标标签名称（合并后保留）
* 返回 `Promise<Object>` - 合并结果
  * `affectedItems` number - 受影响的素材数量
  * `sourceRemoved` boolean - 来源标签是否已移除

```javascript
// 将所有 "UI Design" 标签合并为 "UI"
const result = await eagle.tag.merge({
    source: 'UI Design',
    target: 'UI'
});

console.log(`已合并 ${result.affectedItems} 个素材的标签`);
```


提示：`merge()` 方法需要 Eagle 4.0 build18 以上版本支持。


{% hint style="warning" %}
注意：合并操作会更新所有使用来源标签的素材、标签群组、收藏标签和历史标签。此操作不可逆。


***

## 类：Tag <a href="#tag-class" id="tag-class"></a>

由 Eagle API `get` 返回的 Object 类型，提供修改、保存功能。

{% hint style="success" %}
**🦄 最佳实践：** 为了确保数据安全性，请使用 Tag 实例提供的 `save()` 方法进行数据的修改，应避免直接修改 Eagle 资源库底下的标签数据。


***

### 实例方法 <a href="#instance-methods" id="instance-methods"></a>

#### **save()**

保存标签的修改。目前仅支持修改标签名称。

* 返回 `Promise<result: boolean>` - `result` 是否修改成功

```javascript
// 获取所有标签
const tags = await eagle.tag.get();

// 找到要修改的标签
const tag = tags.find(t => t.name === 'old-name');

// 修改标签名称
tag.name = 'new-name';

// 保存修改
await tag.save();
```


提示：`save()` 方法需要 Eagle 4.0 build12 以上版本支持。


{% hint style="warning" %}
注意：修改标签名称后，所有使用该标签的文件都会自动更新为新的标签名称。


***

### 实例属性 <a href="#instance-properties" id="instance-properties"></a>

#### **`name` string**

标签名称。可修改此属性并通过 `save()` 方法保存。

#### **`count` number**

只读，使用此标签的文件数量。

#### **`color` string**

标签颜色。

#### **`groups` string\[]**

只读，标签所属的分组。

#### **`pinyin` string**

只读，标签名称的拼音（用于搜索和排序）。

# tagGroup（标签群组）

```javascript
// 取得所有标签群组
const tagGroups = (await eagle.tagGroup.get());
```

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## get() <a href="#x9nu2" id="x9nu2"></a>

获取所有标签群组。

* 返回 `Promise<tagGroups: Object[]>` - tagGroups 查询结果。

```javascript
const tagGroups = (await eagle.tagGroup.get());
```

## create(options) <a href="#x9nu2" id="x9nu2"></a>

获取所有标签群组。

* 返回 `Promise<tagGroup: Object>` - 新建立的标签群组

```javascript
await eagle.tagGroup.create({
  name: "new group",
  color: "red",
  tags: ["tag1", "tag2"],
  description: "群组描述"  // Eagle 4.0 build18+
});
```

***

**实例方法**

## save() <a href="#x9nu2" id="x9nu2"></a>

保存标签群组修改。

* 返回 `Promise<tagGroup: Object>` - 保存结果。

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

tagGroup.name = "new name";
tagGroup.color = "red"; // red, orange, yellow, green, aqua, blue, purple, pink
tagGroup.tags = ["tag1", "tag2"];
tagGroup.description = "群组描述";  // Eagle 4.0 build18+

await tagGroup.save();
```

## remove() <a href="#x9nu2" id="x9nu2"></a>

删除标签群组。

* 返回 `Promise<result: boolean>` - result是否删除成功

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

await tagGroup.remove();
```

## addTags(options) <a href="#addtags" id="addtags"></a>

增量添加标签到群组，不需要传入完整的标签数组。

* `options` Object - 选项参数
  * `tags` string\[] - 要添加的标签名称数组
  * `removeFromSource` boolean (可选) - 是否从原群组移除标签，默认 `false`
    * `false`：仅添加标签（标签可同时存在多个群组）
    * `true`：移动标签（从原群组移除）
* 返回 `Promise<tagGroup: Object>` - 更新后的标签群组

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

// 添加标签（允许同时存在多个群组）
await tagGroup.addTags({
    tags: ['UI', 'UX', 'Typography']
});

// 移动标签（从原群组移除）
await tagGroup.addTags({
    tags: ['Branding'],
    removeFromSource: true
});
```


提示：`addTags()` 方法需要 Eagle 4.0 build18 以上版本支持。


## removeTags(options) <a href="#removetags" id="removetags"></a>

从群组移除指定标签。

* `options` Object - 选项参数
  * `tags` string\[] - 要移除的标签名称数组
* 返回 `Promise<tagGroup: Object>` - 更新后的标签群组

```javascript
const tagGroups = (await eagle.tagGroup.get());
const tagGroup = tagGroups[0];

// 从群组移除标签
await tagGroup.removeTags({
    tags: ['Outdated', 'Draft']
});
```


提示：`removeTags()` 方法需要 Eagle 4.0 build18 以上版本支持。


{% hint style="warning" %}
注意：此方法仅从群组移除标签，不会删除标签本身或影响素材上的标签。


# library（资源库）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## info() <a href="#s7pkf" id="s7pkf"></a>

取得当前资源库详细信息，包含文件夹、智能文件夹、标签群组等

* 返回 `Promise<data: Object>`
  * `data` Object - 资源库各项属性

```javascript
console.log(await eagle.library.info());
```

***

## 屬性 <a href="#adtwq" id="adtwq"></a>

`library` 模块包含以下属性：

## `name` string <a href="#qxggi" id="qxggi"></a>

返回当前资源库名称

```javascript
console.log(eagle.library.name)
// test
```

## `path` string <a href="#qxggi" id="qxggi"></a>

返回当前资源库所在路径

```javascript
console.log(eagle.library.path);
// C:\Users\User\Pictures\Design.library
```

## `modificationTime` Integer

返回最后修改时间 (timestamp)

```javascript
console.log(eagle.library.modificationTime);
// 1681281134495
```

# window（窗口）

下面示例为 `window` 的常用功能：

```javascript
await eagle.window.show();			// 显示插件窗口
await eagle.window.hide();			// 隐藏插件窗口

await eagle.window.minimize();			// 缩小窗口
await eagle.window.restore();			// 还原缩小

await eagle.window.maximize();			// 最大化窗口
await eagle.window.unmaximize();		// 还原最大化

await eagle.window.setFullScreen(true);		// 设为全屏幕
await eagle.window.setFullScreen(false);	// 离开全屏幕
```

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## show() <a href="#kaydt" id="kaydt"></a>

显示并聚焦于窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.show();
```

***

## showInactive() <a href="#reqm4" id="reqm4"></a>

显示但不聚焦于窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.showInactive();
```

***

## hide() <a href="#mklts" id="mklts"></a>

隐藏插件窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.hide();
```

***

## focus() <a href="#lskqe" id="lskqe"></a>

使插件窗口获取焦点。

* 返回 `Promise<>`

```javascript
await eagle.window.focus();
```

***

## minimize() <a href="#de7df" id="de7df"></a>

最小化插件窗口。

* 返回 `Promise<>`

```javascript
await eagle.window.minimize();
```

***

## isMinimized() <a href="#v47e2" id="v47e2"></a>

判断窗口是否最小化。

* 返回 `Promise<minimized: boolean>`
  * `minimized` boolean - 窗口是否最小化

```javascript
let isMinimized = await eagle.window.isMinimized();
```

***

## restore() <a href="#yvcxf" id="yvcxf"></a>

将插件窗口从最小化状态恢复到以前的状态。

* 返回 `Promise<>`

```javascript
await eagle.window.restore();
```

***

## maximize() <a href="#a53af" id="a53af"></a>

最大化插件窗口。 如果窗口尚未显示，该方法也会将其显示 (但不会聚焦)。

* 返回 `Promise<>`

```javascript
await eagle.window.maximize();
```

***

## unmaximize() <a href="#tg6me" id="tg6me"></a>

取消插件窗口最大化

* 返回 `Promise<>`

```javascript
await eagle.window.unmaximize();
```

***

## isMaximized() <a href="#zxdhs" id="zxdhs"></a>

判断窗口是否最大化

* 返回 `Promise<maximized: boolean>`
  * `maximized` boolean - 窗口是否最大化

```javascript
let isMaximized = await eagle.window.isMaximized();
```

***

## setFullScreen(flag) <a href="#leibk" id="leibk"></a>

设置窗口是否应处于全屏模式。

* `flag` boolean - 是否设为全屏
* 返回 `Promise<>`

```javascript
await eagle.window.setFullScreen(true);		// 进入全屏
await eagle.window.setFullScreen(false);	// 退出全屏
```

***

## isFullScreen() <a href="#irx5v" id="irx5v"></a>

判断窗口是否全屏

* 返回 `Promise<fullscreen: boolean>`
  * `fullscreen` boolean - 窗口是否全屏

```javascript
let isMaximized = await eagle.window.isMaximized();
```

***

## setAspectRatio(aspectRatio) <a href="#plpcl" id="plpcl"></a>

这将使窗口保持长宽比。

* `aspectRatio` Float - 保持的宽高比（宽 / 高）
* 返回 `Promise<>`

```javascript
await eagle.window.setAspectRatio(16/9);		// 将窗口宽高比例限制为 16:9
```

***

## setBackgroundColor(backgroundColor) <a href="#no73b" id="no73b"></a>

设置窗口的背景颜色。

* `backgroundColor` String - 此参数表示您所希望的背景色的HEX代码。
* 返回 `Promise<>`

```javascript
await eagle.window.setBackgroundColor("#FFFFFF");
```


注1：此属性可以直接在 manifest.json 进行设置。

注2：这个设定主要用来设定在 HTML / CSS 内容尚未完成前，窗口默认的背景颜色，适当的设定可以避免发生窗口显示出现闪烁的状况。


***

## setSize(width, height) <a href="#mq0dz" id="mq0dz"></a>

设置窗口大小

* `width` Integer - 窗口宽度
* `height` - Integer - 窗口高度
* 返回 `Promise<>`

```javascript
await eagle.window.setSize(720, 480);
```


注：此属性可以直接在 manifest.json 进行设置。


## getSize() <a href="#mq0dz" id="mq0dz"></a>

取得窗口大小

* 返回 `Promise<Integer[]>`

```javascript
await eagle.window.getSize();
```

## setBounds(**bounds**)

调整窗口的大小并将其移动到提供的边界。任何未提供的属性将默认为当前值。

```javascript
await eagle.window.setBounds({ x: 440, y: 225, width: 800, height: 600 })
```

## getBounds()

取得窗口边界

* 返回 `Promise<Rectangle[]>` - 窗口边界的物件

```javascript
await eagle.window.getBounds()
```

## setResizable(resizable) <a href="#e56j2" id="e56j2"></a>

设置窗口是否支持调整大小

* `resizable` boolean - 是否支持调整大小
* 返回 `Promise<>`

```javascript
await eagle.window.setResizable(true);
await eagle.window.setResizable(false);
```


注：此属性可以直接在 manifest.json 进行设置。


***

## isResizable() <a href="#pyh5l" id="pyh5l"></a>

窗口是否支持调整大小

* 返回 `Promise<resizable: boolean>`
  * `resizable` boolean

```javascript
let isResizable = await eagle.window.isResizable();
```

***

## setAlwaysOnTop(flag) <a href="#p5shn" id="p5shn"></a>

设置窗口是否应始终显示在其他窗口的前面。

* `flag` boolean
* 返回 `Promise<>`

```javascript
await eagle.window.setAlwaysOnTop(true);
await eagle.window.setAlwaysOnTop(false);
```

***

## isAlwaysOnTop() <a href="#quly3" id="quly3"></a>

窗口是否应始终显示在其他窗口的前面

* 返回 `Promise<alwaysOnTop: boolean>`
  * `alwaysOnTop` boolean

```javascript
let isAlwaysOnTop = await eagle.window.isAlwaysOnTop();
```

***

## setPosition(x, y) <a href="#erkhe" id="erkhe"></a>

将窗口移动到 x 和 y。

* `x` Integer
* `y` Integer
* 返回 `Promise<>`

```javascript
await eagle.window.setPosition(100, 200);
```

***

## getPosition() <a href="#ua19x" id="ua19x"></a>

取得插件窗口座标 x 和 y。

* 返回 `Promise<position: Integer[]>`
  * `position` Integer\[]
    * x - position\[0]
    * y - position\[1]

```javascript
let position = await eagle.window.getPosition();	// [100, 200]
```

***

## setOpacity(opacity) <a href="#dlzuz" id="dlzuz"></a>

设置窗口的不透明度， 超出界限的数值被限制在\[0, 1] 范围内。

* `opacity` number - 介于0.0 ( 完全透明 ) 和1.0 ( 完全不透明 ) 之间
* 返回 `Promise<>`

```javascript
await eagle.window.setOpacity(0.5);
```

***

## getOpacity() <a href="#fes0x" id="fes0x"></a>

取得窗口透明度，介于0.0 (完全透明) 和1.0 (完全不透明) 之间。

* 返回 `Promise<opacity: number>`
  * `opacity` number

```javascript
let opacity = await eagle.window.getOpacity();
```

***

## flashFrame(flag) <a href="#vxzv7" id="vxzv7"></a>

启动或停止闪烁窗口, 以吸引用户的注意。

* `flag` boolean - 是否闪烁
* 返回 `Promise<>`

```javascript
await eagle.window.flashFrame(true);
await eagle.window.flashFrame(false);
```

***

## setIgnoreMouseEvents(ignore) <a href="#yvfx8" id="yvfx8"></a>

忽略窗口内的所有鼠标事件。在此窗口中发生的所有鼠标事件将被传递到此窗口下面的窗口，但如果此窗口具有焦点，它仍然会接收键盘事件。

* `ignore` boolean - 是否忽略鼠标事件
* 返回 `Promise<>`

```javascript
await eagle.window.setIgnoreMouseEvents(true);
await eagle.window.setIgnoreMouseEvents(false);
```


搭配 setAlwaysOnTop() 功能，将可以创建一个悬浮在屏幕最上方且可穿透鼠标点击的特殊窗口。


## capturePage(rect) <a href="#yvfx9" id="yvfx9"></a>

撷取 `rect` 指定区域的页面快照。省略 `rect` 将捕获整个可见页面。

* `rect` object - 可选，截图范围
  * `x` number
  * `y` number
  * `width` number
  * `height` number
* 返回 `Promise<[NativeImage](https://www.electronjs.org/docs/latest/api/native-image)>`

```javascript
const image = await eagle.window.capturePage();
const base64 = image.toDataURL("image/jpeg");

const image2 = await eagle.window.capturePage({ x: 0, y: 0, width: 100, height: 50 });
const buffer = image2.toPNG();
```

## setReferer(url) <a href="#id-4a6f" id="id-4a6f"></a>

函数用来配置当前的引用来源网址（referer URL）。当您配置了引用来源后，后续的请求都会使用这个配置的引用来源。

* `url` 文本 - 引用来源的网址
* 返回 `void`

```javascript
eagle.window.setReferer("https://cn.eagle.cool");
```

# app（应用）

下面示例为 `app` 的常用属性：

```javascript
console.log(eagle.app.version);				// Eagle 版本
console.log(eagle.app.build);				// Eagle Build 号
console.log(eagle.app.locale);				// 应用界面语系，en/zh_CN/zh_TW/ja_JP
console.log(eagle.app.arch);				// x86 | x64
console.log(eagle.app.platform);			// darwin | win32
console.log(eagle.app.isWindows);			// true | false, 操作系统是否为 Windows
console.log(eagle.app.isMac);				// true | false, 操作系统是否为 Mac
console.log(eagle.app.runningUnderARM64Translation);	// 是否运行在 rosetta 转译模式
```

***

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## isDarkColors() <a href="#a6hjz" id="a6hjz"></a>

确认当前系统是否处于深色（Dark）模式。

* 返回 `boolean` - 当前系统是否正在处于 Dark 模式。

```javascript
eagle.app.isDarkColors();		// true | false
```

***

## getPath(name) <a href="#b8lgu" id="b8lgu"></a>

您可以通过名称请求以下路径

* `name` string - 您可以通过名称请求以下路径
  * `home` - 用户的 home 文件夹（主目录）
  * `appData` - 每个用户的应用程序数据目录，默认情况下指向：
  * `userData` - 储存你应用程序配置文件的文件夹，默认是 appData 文件夹附加应用的名称 按照习惯用户存储的数据文件应该写在此目录，同时不建议在这写大文件，因为某些环境会备份此目录到云端存储。
  * `temp` - 临时文件夹
  * `exe` - 当前的可执行文件
  * `desktop` - 当前用户的桌面文件夹
  * `documents` - 用户文档目录的路径
  * `downloads` - 用户下载目录的路径
  * `music` - 用户音乐目录的路径
  * `pictures` - 用户图片目录的路径
  * `videos` - 用户视频目录的路径
  * `recent` - 用户最近文件的目录 (仅限 Windows)。
* 返回 `Promise<path: string>` - `path` 查询路径结果。

```javascript
await eagle.app.getPath('appData');	// 'C:\Users\User\AppData\Roaming'
await eagle.app.getPath('pictures');	// 'C:\Users\User\Pictures'
await eagle.app.getPath('desktop');	// 'C:\Users\User\Desktop'
```


备注：此功能与 Electron API 的 [app.getPath](https://www.electronjs.org/zh/docs/latest/api/app#appgetapppath) 功能类似。


***

## getFileIcon(path\[, options]) <a href="#ndrop" id="ndrop"></a>

取得指定路径文件关联的图标。

* `path` string - 欲取得图示之文件路径
* `options` Object（可选）
  * `size` string
  * `small` - 16x16
  * `normal` - 32x32
  * `large` - `Windows` 为 32x32, `macOS` 不支持。
* 返回 `Promise<img: NativeImage>`
  * `img` [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) - 一个 NativeImage 类型的应用图标。

```javascript
let img = await eagle.app.getFileIcon('path_to_file', { size: 'small' });

// 取得图像信息
let base64 = img.toDataURL();
let size = img.getSize();	// {'width': 16, height: 16}

// 保存到电脑
let buffer = img.toPNG();
require('fs').writeFileSync('output_path/example.png', buffer);
```


备注：此功能与 Electron API 的 [app.getAppIcon](https://www.electronjs.org/zh/docs/latest/api/app#appgetfileiconpath-options) 功能类似。


***

## createThumbnailFromPath(path, maxSize) <a href="#psczp" id="psczp"></a>

取得指定路径文件关联的图标。

* `path` string - 欲取得缩略图之文件路径
* `maxSize` Size - 返回缩略图的最大宽度和高度(正数)。 在 Windows 平台下将忽略 maxSize.height 并根据 maxSize.width 缩放高度
* 返回 `Promise<img: NativeImage>`
  * `img` [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) - 文件的缩略图预览图像。

```javascript
let img = await eagle.app.createThumbnailFromPath('path_to_file', { 
    height: 200, 
    width: 200 
});

// 取得图像信息
let base64 = img.toDataURL();
let size = img.getSize();	// {'width': 200, height: 150}

// 保存到电脑
let buffer = img.toPNG();
require('fs').writeFileSync('output_path/example.png', buffer);
```


备注：此功能与 Electron API 的 [nativeImage.createThumbnailFromPath(path, maxSize)](https://www.electronjs.org/zh/docs/latest/api/native-image#nativeimagecreatethumbnailfrompathpath-maxsize-macos-windows) 功能类似。


***

## show() <a href="#show" id="show"></a>

将 Eagle 主应用程序窗口唤起并显示在画面最上方。

* 返回 `Promise<boolean>` - 操作是否成功。

```javascript
await eagle.app.show();
```


备注：此功能需要 Eagle 4.0 build18 或更高版本。


***

## 屬性 <a href="#adtwq" id="adtwq"></a>

## version <a href="#f95hw" id="f95hw"></a>

`string` 属性，获取当前 Eagle 应用程序版本。

## build <a href="#gwrv2" id="gwrv2"></a>

`number` 属性，获取当前 Eagle 应用程序 Build Number。

## locale <a href="#dd0fm" id="dd0fm"></a>

`string` 属性，获取当前 Eagle 应用程序界面语系。

* `en` - 英文
* `zh_CN` - 简体中文
* `zh_TW` - 繁体中文
* `ja_JP` - 日文
* `ko_KR` - 韩文
* `es_ES` - 西班牙文
* `de_DE` - 德文
* `ru_RU` - 俄文

## arch <a href="#hqmzh" id="hqmzh"></a>

`string` 属性，返回操作系統 CPU 架構。

* `x64`
* `arm64`
* `x86`

## platform <a href="#z5qbr" id="z5qbr"></a>

`string` 属性，返回一個標識操作系統平台的字符串。

* `darwin` - macOS 操作系统
* `win32` - Windows 操作系统

## env <a href="#bdd4y" id="bdd4y"></a>

`Object` 属性，返回环境变量的对象。

```javascript
console.log(eagle.app.env);

{
  APPDATA: "C:\\Users\\User\\AppData\\Roaming",
  HOMEDRIVE: "C:",
  HOMEPATH: "\\Users\\User",
  LANG: "zh_TW.UTF-8",
  TEMP: "C:\\Users\\User\\AppData\\Local\\Temp"
}
```

```javascript
console.log(eagle.app.env['TEMP']);

"C:\\Users\\User\\AppData\\Local\\Temp"
```

## execPath <a href="#uvg0k" id="uvg0k"></a>

`string` 属性，当前应用程序执行路径。

```javascript
console.log(eagle.app.execPath);

"C:\\Program Files\\Eagle\\Eagle.exe"
```

## pid <a href="#cldbp" id="cldbp"></a>

`number` 属性，当前插件进程 id。

## isWindows <a href="#u8kad" id="u8kad"></a>

`boolean` 属性，是否当前为 Window 操作系统。

## isMac <a href="#qw2s4" id="qw2s4"></a>

`boolean` 属性，是否当前为 Mac 操作系统。

## runningUnderARM64Translation <a href="#kbkmv" id="kbkmv"></a>

`boolean` 属性，为 true 时表明当前应用正在使用 ARM64 运行环境 (比如 macOS [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_\(software\)) 或者 Windows [WOW](https://en.wikipedia.org/wiki/Windows_on_Windows)).


提示：此功能与 Electron API 的 [app.runningUnderARM64Translation](https://www.electronjs.org/zh/docs/latest/api/app#apprunningunderarm64translation-%E5%8F%AA%E8%AF%BB-macos-windows) 功能类似，您可以使用此属性来提示用户下载应用程序的 arm64 版本，当用户错误地在转译环境下运行 x64 版本。


## theme <a href="#cztqx" id="cztqx"></a>

`string` 属性， - 当前主题配色的名称，如 `LIGHT`、`LIGHTGRAY`、`GRAY`、`DARK`、`BLUE`、`PURPLE`。

## userDataPath <a href="#ud9km" id="ud9km"></a>

`string` 属性，当前用户数据目录的路径。

```javascript
console.log(eagle.app.userDataPath);

"C:\\Users\\User\\AppData\\Roaming\\Eagle"
```


备注：此功能需要 Eagle 4.0 build12 或更高版本。


### &#x20;<a href="#nptwx" id="nptwx"></a>

# os（操作系统）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## tmpdir() <a href="#a6hjz" id="a6hjz"></a>

取得操作系统默认的暂存文件路径。

* 返回 `string` - 操作系统默认的暂存文件路径

```javascript
eagle.os.tmpdir();         // 'C:\\Users\\User\\AppData\\Local\\Temp'
```

***

## version() <a href="#gxw5i" id="gxw5i"></a>

取得操作系统內核版本的字符串。

* 返回 `string` - 操作系统內核版本的字符串

```javascript
eagle.os.version();         // 'Windows 10 Home'
```

***

## type() <a href="#jauoc" id="jauoc"></a>

返回的操作系統名稱。\
例如：在 macOS 上返回 `Darwin`，在 Windows 上返回 `Windows_NT`。

* 返回 `string` - 操作系統名稱

```javascript
eagle.os.type();         // 'Windows_NT', 'Darwin'
```

***

## release() <a href="#jmfqv" id="jmfqv"></a>

返回操作系统的发行版。

* 返回 `string` - 操作系统的发行版

```javascript
eagle.os.release();         // '10.0.22621'
```

***

## hostname() <a href="#w5b2t" id="w5b2t"></a>

返回操作系统的主机名。

* 返回 `string` - 操作系统的主机名

```javascript
eagle.os.hostname();         // 'My_Windows'
```

***

## homedir() <a href="#iiwv7" id="iiwv7"></a>

返回当前用户的 home 目录。

* 返回 `string` - 当前用户的 home 目录

```javascript
eagle.os.homedir();         // 'C:\\Users\\User'
```

***

## arch() <a href="#eekcv" id="eekcv"></a>

返回操作系統 CPU 架構。

* 返回 `string` - 当前 CPU 架構
  * `x64`
  * `arm64`
  * `x86`

```javascript
eagle.os.arch();         // 'x64'
```

### &#x20;<a href="#nptwx" id="nptwx"></a>

# screen（屏幕）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## getCursorScreenPoint() <a href="#tkp0d" id="tkp0d"></a>

当前鼠标的绝对位置 x, y。

* 返回 `Promise<point: Object>`
  * `point` Object
    * `point.x`
    * `point.y`

```javascript
let point = await eagle.screen.getCursorScreenPoint();
```

***

## getPrimaryDisplay() <a href="#sskcn" id="sskcn"></a>

返回主屏幕信息

* 返回 `Promise<display: Display>`
  * `display` [Display](https://www.electronjs.org/zh/docs/latest/api/structures/display) 对象 - 当前屏幕信息

```javascript
let display = await eagle.screen.getPrimaryDisplay();
```

***

## getAllDisplays() <a href="#eev58" id="eev58"></a>

返回一个数组Display\[]，表示当前可用的屏幕。

* 返回 `Promise<displays: Display[]>`
  * `displays` [Display](https://www.electronjs.org/zh/docs/latest/api/structures/display)\[]

```javascript
let displays = await eagle.screen.getAllDisplays();
```

***

## getDisplayNearestPoint(point) <a href="#ox9dk" id="ox9dk"></a>

取得插件窗口座标 x 和 y。

* `point` Object
  * `point.x` Interger 类型
  * `point.y` Interger 类型
* 返回 `Promise<display: Display>`
  * `display` [Display](https://www.electronjs.org/zh/docs/latest/api/structures/display) 对象 - 当前屏幕信息

```javascript
let display = await eagle.screen.getDisplayNearestPoint({ x: 100, y: 100 });
```

# notification（通知）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## show(options) <a href="#tkp0d" id="tkp0d"></a>

显示通知窗口

* `options` Object
  * `title` string - 通知窗口标题
  * `body` string - 通知窗口描述
  * `icon` URL/base64 - 通知窗口图标，支持链接或 base64 格式（可选）
  * `mute` boolean - 提示音效（可选）
  * `duration` Interger - 自动隐藏时间（毫秒）（可选）
* 返回 `Promise<>`

```javascript
await eagle.notification.show({
    title: "Basic Notification",
    body: "Notification from the Plugin process",
    mute: false,
    duration: 3000,
    icon: "https://"
});
```

***

# contextMenu（右鍵菜單）

## 方法 <a href="#z1a5y" id="z1a5y"></a>

## open(menuItems) <a href="#tkp0d" id="tkp0d"></a>

弹出右键菜单。

* `menuItems` : [MenuItem](https://www.electronjs.org/docs/latest/api/menu-item)
  * `id` string - 菜单项目 ID
  * `label` string - 菜单项目显示文字
  * `submenu` \[MenuItem] - 子菜单

```javascript
eagle.contextMenu.open([
    {
        id: "edit",
        label: "编辑",
        submenu: [
            {
                id: "resize",
                label: "调整大小",
                click: () => { alert("图片已调整大小") }
            },
            {
                id: "crop",
                label: "裁剪",
                click: () => { alert("图片已裁剪") }
            },
            {
                id: "rotate",
                label: "旋转",
                click: () => { alert("图片已旋转") }
            }
        ]
    },
    {
        id: "effects",
        label: "效果",
        submenu: [
            {
                id: "grayscale",
                label: "灰度",
                click: () => { alert("灰度效果已应用") }
            },
            {
                id: "sepia",
                label: "深褐色",
                click: () => { alert("深褐色效果已应用") }
            },
            {
                id: "invert",
                label: "反色",
                click: () => { alert("颜色反转已应用") }
            }
        ]
    },
    {
        id: "export",
        label: "导出",
        click: () => { alert("图片已导出") }
    }
])
```

# dialog（对话框）

下面是一个选择多个文件的对话框示例：

```javascript
let result = await eagle.dialog.showOpenDialog({ 
    properties: ['openFile', 'multiSelections'] 
});
```

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## showOpenDialog(options) <a href="#tkp0d" id="tkp0d"></a>

显示打开文件对话框。

* `options` Object
  * `title` string (可选) - 对话框窗口的标题
  * `defaultPath` string (可选) - 对话框的默认展示路径
  * `buttonLabel` string (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter](https://www.electronjs.org/zh/docs/latest/api/structures/file-filter)\[] (可选)
    * `name` string
    * `extensions` string\[]
  * `properties` string\[] (可选) - 包含对话框相关属性。 支持以下属性值:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * `multiSelections`- 允许多选。
    * `showHiddenFiles`- 显示对话框中的隐藏文件。
    * `createDirectory` `macOS` - 允许你通过对话框的形式创建新的目录。
    * `promptToCreate` `Windows`- 如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创
  * `message` string (可选) `macOS` - 显示在输入框上方的消息。
* 返回 `Promise<result: Object>`
  * `result`Object
    * `canceled` boolean - 对话框是否被取消
    * `filePaths` string\[] - 用户选择的文件路径的数组. 如果对话框被取消，这将是一个空的数组。

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

```javascript
let result = await eagle.dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
});
```


备注：此功能与 Electron API 的 [dialog.showOpenDialog](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options) 功能类似。


***

## showSaveDialog(options) <a href="#g872m" id="g872m"></a>

显示保存文件对话框。

* `options` Object
  * `title` string (可选) - 对话框窗口的标题
  * `defaultPath` string (可选) - 对话框的默认展示路径
  * `buttonLabel` string (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter](https://www.electronjs.org/zh/docs/latest/api/structures/file-filter)\[] (可选)
    * `name` string
    * `extensions` string\[]
  * `properties` string\[] (可选) - 包含对话框相关属性。 支持以下属性值:
    * `openDirectory` - 允许选择文件夹
    * `showHiddenFiles`- 显示对话框中的隐藏文件。
    * `createDirectory` `macOS` - 允许你通过对话框的形式创建新的目录。
* 返回 `Promise<result: Object>`
  * `result`Object
    * `canceled` boolean - 对话框是否被取消
    * `filePath` string - 如果对话框被取消，该值为 `undefined`。

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

```javascript
let result = await eagle.dialog.showSaveDialog({
    properties: ['openDirectory']
});
```


备注：此功能与 Electron API 的 [dialog.showSaveDialog](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowsavedialogbrowserwindow-options) 功能类似。


***

## showMessageBox(options) <a href="#grq5h" id="grq5h"></a>

显示讯息对话框。

* `options`Object
  * `message` string - 对话框主要内容
  * `title` string (可选) - 对话框标题
  * `detail` string (可选) - 额外信息
  * `buttons` strings\[] (可选) - 按钮文本数组
  * `type` string (可选) - 可以为 `none`、 `info`、 `error`、`question` 或者 `warning`
* 返回 `Promise<result: Object>`
  * `result`Object
    * `response` Interger - 点击按钮的索引

```javascript
let result = await eagle.dialog.showMessageBox({
    title: "Messagebox title",
    message: "Message from the Plugin process",
    detail: "Ultra message here",
    buttons: ["确定", "取消"],
    type: "info"
});

console.log(result);		// {response: 0}
```


此功能与 Electron API 的 [dialog.showSaveDialog](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowsavedialogbrowserwindow-options) 功能类似。


***

## showErrorBox(title, content) <a href="#erokr" id="erokr"></a>

显示错误讯息的对话框。

* `title` string - 显示在错误框中的标题
* `content` string - 显示在错误框中的文本内容
* 返回 `Promise<void>`

{% code overflow="wrap" %}

```javascript
await eagle.dialog.showErrorBox("Error box title", "Error message from the Plugin process");
```

{% endcode %}


备注：此功能与 Electron API 的 [dialog.showSaveDialog](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowsavedialogbrowserwindow-options) 功能类似。


### &#x20;<a href="#nptwx" id="nptwx"></a>

# clipboard（剪贴板）


提示：推荐使用 Clipboard Viewer（[Win](https://freeclipboardviewer.com/) / [Mac](https://langui.net/clipboard-viewer/)） 工具进行开发调试，让开发过程更顺利。


```javascript
await eagle.clipboard.writeText('Example string');

console.log(await eagle.clipboard.readText());
```

***

### 方法 <a href="#z1a5y" id="z1a5y"></a>

## clear() <a href="#tkp0d" id="tkp0d"></a>

清除剪贴板内容。

```javascript
eagle.clipboard.writeText('Example string');
eagle.clipboard.clear();
console.log(eagle.clipboard.readText());	// undefined
```

***

## has(format) <a href="#p4ult" id="p4ult"></a>

当前剪贴板内容是否包含指定的 format

* `format` string - 指定格式
* 返回 boolean - 是否包含指定格式

```javascript
console.log(eagle.clipboard.has('public/utf8-plain-text'));	// false

const buffer = Buffer.from('writeBuffer', 'utf8');
eagle.clipboard.writeBuffer('public/utf8-plain-text', buffer);

console.log(eagle.clipboard.has('public/utf8-plain-text'));	// true
```

***

## writeText(text) <a href="#eear5" id="eear5"></a>

将 `text` 作为纯文本写入剪贴板。

* `text` string - 欲写入文本

```javascript
eagle.clipboard.writeText('Example string');
console.log(eagle.clipboard.readText());	// 'Example string'
```

***

## readText() <a href="#ytddd" id="ytddd"></a>

获取前当剪切板的纯文本内。

* 返回 string

```javascript
console.log(await eagle.clipboard.readText());
```

***

## writeBuffer(format, buffer) <a href="#ol666" id="ol666"></a>

将 `buffer` 作为 `format` 类型写入剪贴板。

* `format` string - 剪切板格式
* `buffer` Buffer - 欲写入内容之 Buffer 格式

```javascript
const buffer = Buffer.from('writeBuffer', 'utf8');
eagle.clipboard.writeBuffer('public/utf8-plain-text', buffer);
```

***

## readBuffer(format) <a href="#gadle" id="gadle"></a>

从剪贴板中读取 `format` 类型的内容。

* 返回 Buffer

```javascript
const buffer = Buffer.from('this is binary', 'utf8');
eagle.clipboard.writeBuffer('public/utf8-plain-text', buffer);

const out = eagle.clipboard.readBuffer('public/utf8-plain-text');

console.log(buffer.equals(out));	// true
```

***

## writeImage(image) <a href="#cwuzf" id="cwuzf"></a>

将 `image` 写入剪贴板。

* `image` [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) - 欲写入剪贴板图像

```javascript
let img = nativeImage.createFromPath('path_to_img_file');
eagle.clipboard.writeImage(img);
```

***

## readImage() <a href="#hfggy" id="hfggy"></a>

从剪贴板中读取图像格式内容。

* 返回 [NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image)

```javascript
let input = nativeImage.createFromPath('path_to_img_file');
eagle.clipboard.writeImage(input);

let output = eagle.clipboard.readImage();
```

***

## writeHTML(markup) <a href="#naujl" id="naujl"></a>

将 `markup` 作为 HTML 格式写入剪贴板。

* `markup` string

```javascript
eagle.clipboard.writeHTML('<b>Hi</b>');
console.log(eagle.clipboard.readHTML());	// <b>Hi</b>
```

***

## readHTML() <a href="#btaqx" id="btaqx"></a>

从剪贴板中读取 HTML 格式内容。

* 返回 string

```javascript
eagle.clipboard.writeHTML('<b>Hi</b>');
console.log(eagle.clipboard.readHTML());	// <b>Hi</b>
```

***

## copyFiles(paths) <a href="#t8sny" id="t8sny"></a>

将指定文件拷贝到剪切板，支持文件管理器粘贴。

* `paths` strings\[] - 欲复制到剪贴板的文件。

```javascript
eagle.clipboard.copyFiles([
    'path_to_file',
    'path_to_file2'
]);
```

***

# drag（拖拽文件）

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## startDrag(filePaths) <a href="#tkp0d" id="tkp0d"></a>

显示通知窗口

* `filePaths` string\[] - 欲拖拽文件路径
* 返回 `Promise<>`

```javascript
await eagle.drag.startDrag([
    "C:\\Users\\User\\Pictures\\drag1.jpg",
    "C:\\Users\\User\\Pictures\\drag2.jpg",
]);
```


备注：此功能与 Electron API 的 [webContents.startDrag(item)](https://www.electronjs.org/zh/docs/latest/tutorial/native-file-drag-drop) 功能类似。


#### &#x20;<a href="#p4ult" id="p4ult"></a>

### &#x20;<a href="#nptwx" id="nptwx"></a>

# shell（壳）

`shell` 模块提供与桌面集成相关的功能。

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## beep() <a href="#tkp0d" id="tkp0d"></a>

播放系统哔哔的提示声音。

* 返回 `Promise<void>`

```javascript
await eagle.shell.beep();
```

***

## openExternal(url) <a href="#haugb" id="haugb"></a>

使用系统默认方式打开指定 URL。注意：如果系统没有设置默认应用，此功能将不会有任何反应。

* `url` string - 欲打开之URL
* 返回 `Promise<void>`

```javascript
await eagle.shell.openExternal('https://www.google.com/');
```

***

## openPath(path) <a href="#bh5yu" id="bh5yu"></a>

使用系统默认方式打开指定路径。

* `path` string - 欲打开文件路径
* 返回 `Promise<void>`

```javascript
await eagle.shell.openPath('path_to_file');
```

***

## showItemInFolder(path) <a href="#sdnth" id="sdnth"></a>

在文件管理器中显示指定的文件、文件夹。

* `path` string - 欲显示指定的文件、文件夹
* 返回 `Promise<void>`

```javascript
await eagle.shell.showItemInFolder('path_to_file_or_directory');
```

### &#x20;<a href="#nptwx" id="nptwx"></a>

# log（日志）


点击这里查看 Eagle [软件日志](https://docs-cn.eagle.cool/article/92-how-do-i-get-the-error-log)获取方式。


```javascript
eagle.log.debug('debug message from plugin');
eagle.log.info('info message from plugin');
eagle.log.warn('warn message from plugin');
eagle.log.error('error message from plugin');

// [13:19:39.845] [debug] [plugin] "debug message from plugin"
// [13:19:39.845] [info] [plugin] "info message from plugin"
// [13:19:39.845] [warn] [plugin] "warn message from plugin"
// [13:19:39.845] [error] [plugin] "error message from plugin"
```

***

#### 方法 <a href="#z1a5y" id="z1a5y"></a>

## debug(obj) <a href="#haugb" id="haugb"></a>

记录 debug 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

```javascript
eagle.log.debug(obj);
eagle.log.debug(array);
eagle.log.debug('error message from plugin');
```

***

## info(obj) <a href="#qxf3f" id="qxf3f"></a>

记录 info 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

***

## warn(obj) <a href="#ctpju" id="ctpju"></a>

记录 warn 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

***

## error(obj) <a href="#mo6j1" id="mo6j1"></a>

记录 error 类型内容到软件日志

* `obj` Object - 欲记录之内容，可以是 `Object`、`String`、`Array` 等各种格式

```javascript
try {
    let a = {};
    a.b.c = 'test';
}
catch (err) {
    eagle.log.error('error message from plugin');
    eagle.log.error(err.stack || err);
}

// [13:23:24.191] [error] [plugin] "error message from plugin"
// [13:23:24.191] [error] [plugin] "TypeError: Cannot set properties of undefined (setting 'c')\n    at <anonymous>:3:11"
```

***

# FFmpeg

{% hint style="warning" %}
注意：此功能需要在 Eagle 4.0 beta 7 以上版本才能使用


## FFmpeg 依赖插件简介

「FFmpeg 依赖插件」是一款面向浏览器插件开发者的开发工具包，它将 FFmpeg 强大的多媒体处理能力封装为易用的依赖包。此工具包让开发者能在自身的插件中轻松实现图像、视频和音频格式的编解码，以及流媒体处理和格式转换等高级功能。通过集成「FFmpeg 依赖插件」，开发者可无缝拓展其插件的多媒体处理能力，为用户带来更多富有创意和实用性的功能。

## 安装 FFmpeg 依赖插件

1. 进入插件中心
2. 搜索并找到 FFmpeg 插件
3. 点击安装 FFmpeg 插件


请注意，当用户安装具有 FFmpeg 依赖的插件时，Eagle 会自动提示用户安装「FFmpeg 依赖插件」。因此，开发者无需专门编写代码让用户进行安装，只需为可能出现的错误提供相应提示。


## 如何使用 FFmpeg 依赖插件

如果你希望在你的插件中使用 FFmpeg 相关功能，你需要在插件的 `manifest.json` 文件中添加 `dependencies` 定义，让 Eagle 系统知道这个插件需要额外的扩展功能，示例如下：

```json
{
    "id": "LBCZE8V6LPCKD",
    "version": "1.0.0",
    "platform": "all",
    "arch": "all",
    "name": "窗口插件",
    "logo": "/logo.png",
    "keywords": [],
    "dependencies": ["ffmpeg"],
    "devTools": false,
    "main":
    {
        "url": "index.html",
        "width": 640,
        "height": 480,
    }
}
```

### 窗口插件示例 <a href="#gylpl" id="gylpl"></a>

你可以使用 `eagle.extraModule.ffmpeg` 来调用 FFmpeg 依赖插件提供的功能，示例如下：

```javascript
eagle.onPluginCreate(async (plugin) => {

    // 检查 FFmpeg 依赖插件是否已经安装
    const isFFemptInstalled = await eagle.extraModule.ffmpeg.isInstalled();
    
    // 从打开插件中心，弹出安装 FFmpeg 依赖插件页面。
    if (!isFFemptInstalled) {
        await eagle.extraModule.ffmpeg.install();
        return;
    }
    
    // 获取 FFmpeg 二进制文件所在位置
    const ffmpegPaths= await eagle.extraModule.ffmpeg.getPaths();
    const ffmpegBinaryPath = ffmpegPaths.ffmpeg;
    const ffprobeBinaryPath = ffmpegPaths.ffprobe;
    
    // 使用 spwan 指令执行相关操作
    const spawn = require('child_process').spawn;
    const ffprobe = spawn(ffprobePath, [
	'-v', 'error',
	'-print_format', 'json',
	'-show_format',
	'-show_streams',
	"C:\\your_file.mp4"
    ]);
});
```

### 缩略图插件示例 <a href="#gylpl" id="gylpl"></a>

你可以通过 `extraModule` 参数获取 FFmpeg 相关功能，示例如下：

```javascript

module.exports = async ({ src, dest, item, plugin, extraModule }) => {
    return new Promise(async (resolve, reject) => {
        try {
        
            const ffmpegModule = extraModule.ffmpeg;
	
            // 检查 FFmpeg 依赖插件是否已经安装
            if (!ffmpegModule.isInstalled) {
		return reject(new Error(`ffmpeg is not installed.`));
	    }
	    
            // 获取 FFmpeg 二进制文件所在位置
            const { ffmpeg, ffprobe } = ffmpegModule.paths;
            
            // 使用 spwan 指令执行相关操作
            const spawn = require('child_process').spawn;
            const ffprobe = spawn(ffprobePath, [
	        '-v', 'error',
        	'-print_format', 'json',
	        '-show_format',
	        '-show_streams',
	        "C:\\your_file.mp4"
            ]);
            
            return resolve(item);
        }
        catch (err) {
            return reject(err);
        }
    });
}
```

# AI SDK

{% hint style="warning" %}
注意：此功能需要在 Eagle 5.0 Beta 以上版本才能使用（目前尚未发布，详细发布时间请关注 Eagle 官网）


***

<div align="center"><figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2Fk2L6nx8QEKTBJiiw7Asi%2Fimage.png?alt=media&#x26;token=fb926a50-cb79-439b-8e2e-ce38323c1797" alt=""><figcaption></figcaption></figure></div>

## AI SDK 依赖插件简介

「AI SDK 依赖插件」是一款面向浏览器插件开发者的开发工具包，提供统一的 AI 模型配置中心，支持各大主流 AI 模型，一次配置，处处可用。此工具包让开发者能在自身的插件中轻松实现文本生成、结构化对象生成以及流式处理等 AI 功能。通过集成「AI SDK 依赖插件」，开发者可无缝拓展其插件的 AI 处理能力，为用户带来更多智能化和实用性的功能。

### 统一配置中心：一次设定，处处可用

AI SDK 插件提供了统一的 AI 模型配置中心，支援：

**商业模型**：

* OpenAI（GPT-4、GPT-4 Vision）
* Anthropic Claude（Claude 3 Opus、Claude 3.5 Sonnet）
* Google Gemini（Gemini Pro、Gemini Ultra）
* DeepSeek（DeepSeek Chat、DeepSeek Coder）
* 阿里 Qwen（通义千问）

**本地模型**（完全离线运行）：

* Ollama（支援 Llama 3、Mistral、Phi-3 等）
* LM Studio（图形化界面，新手友好）

配置一次后，所有 AI 相关插件都能直接使用，无需重复设定。例如：今天你安装了「AI 翻译」与「AI 重命名」插件，它们都会自动共用你在 SDK 里填好的配置，甚至可以各自选择不同的模型，而不需要你再次输入 API Key。

<figure><img src="https://3660253004-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FHZrMIIw27Dg9HnexbzyY%2Fuploads%2F3YZwshPIy4de8uL9Ov2n%2Fimage.png?alt=media&#x26;token=bedd14b8-4b6c-42fb-8fb2-13bc9cc9d21a" alt=""><figcaption></figcaption></figure>

### 开放的开发环境

基于 [ai-sdk.dev](https://ai-sdk.dev/) 标准（AI SDK v5），AI SDK 插件为开发者提供了一组干净、稳定的基础设施。开发者不用再花心力处理 API Key 储存、模型切换、错误重试等基础配置，可以专注于插件的功能创新。唯一的区别在于 Provider 的获取方式，我们使用自己开发的 Provider 来确保更好的稳定性和用户体验。

{% hint style="warning" %}
**版本兼容性**：此插件基于 AI SDK v5 构建。如果您熟悉较新版本（v6、v7 等）的 AI SDK，请注意某些 API 或功能可能会有所不同。请务必参考此文档以了解在 Eagle 生态系统中的正确使用方法。


***

## 安装 AI SDK 依赖插件

1. 进入插件中心
2. 搜索并找到 AI SDK 插件
3. 点击安装 AI SDK 插件


请注意，当用户安装具有 AI SDK 依赖的插件时，Eagle 会自动提示用户安装「AI SDK 依赖插件」。因此，开发者无需专门编写代码让用户进行安装，系统会自动确保相关依赖已安装后才允许插件运行。


***

## 如何使用 AI SDK 依赖插件

如果你希望在你的插件中使用 AI SDK 相关功能，你需要在插件的 `manifest.json` 文件中添加 `dependencies` 定义，让 Eagle 系统知道这个插件需要额外的扩展功能，示例如下：

```json
{
    "id": "LBCZE8V6LPCKD",
    "version": "1.0.0",
    "platform": "all",
    "arch": "all",
    "name": "窗口插件",
    "logo": "/logo.png",
    "keywords": [],
    "dependencies": ["ai-sdk"],
    "devTools": false,
    "main":
    {
        "url": "index.html",
        "width": 640,
        "height": 480,
    }
}
```

### 窗口插件示例 <a href="#gylpl" id="gylpl"></a>

你可以使用 `eagle.extraModule.ai` 来调用 AI SDK 依赖插件提供的功能。以下是各种使用方式的示例：

#### generateText() - 基本文本生成

```javascript
eagle.onPluginCreate(async (plugin) => {
    // 获取 AI 模块和 Provider
    const ai = eagle.extraModule.ai;
    const { openai, anthropic, gemini, deepseek, qwen, ollama, lmstudio } = await ai.getProviders();
    const { generateText } = ai;

    // 基本文本生成
    const result = await generateText({
        model: openai("gpt-5"),
        prompt: "请帮我写一个关于数字艺术的创意简介",
    });

    console.log(result.text);
});
```

#### generateObject() - 结构化对象生成

```javascript
eagle.onPluginCreate(async (plugin) => {
    const ai = eagle.extraModule.ai;
    const { openai } = await ai.getProviders();
    const { generateObject } = ai;

    // 生成结构化数据
    const result = await generateObject({
        model: anthropic("claude-4-sonnet"),
        schema: {
            type: "object",
            properties: {
                tags: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            reason: { type: "string" },
                        },
                    },
                },
                description: { type: "string" },
            },
        },
        messages: [
            {
                role: "system",
                content: "你是一个专业的图像分析专家，能够准确识别图像内容并给出合适的标签和描述。",
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "请分析这张图片并给出5个相关标签，每个标签需要说明原因，同时提供一个简洁的图片描述。",
                    },
                    {
                        type: "image",
                        image: "https://example.com/sample-image.jpg",
                    },
                ],
            },
        ],
    });

    console.log("标签:", result.object.tags);
    console.log("描述:", result.object.description);
});
```

#### streamText() - 流式文本生成

```javascript
eagle.onPluginCreate(async (plugin) => {
    const ai = eagle.extraModule.ai;
    const { openai } = await ai.getProviders();
    const { streamText } = ai;

    // 流式生成文本，适合实时显示
    const { textStream } = await streamText({
        model: gemini("gemini-2.0-flash-exp"),
        prompt: "请详细介绍数字艺术的发展历程和主要特点",
    });

    // 逐步接收并显示生成的文字
    for await (const textPart of textStream) {
        console.log(textPart);
    }
});
```

#### streamObject() - 流式对象生成

```javascript
eagle.onPluginCreate(async (plugin) => {
    const ai = eagle.extraModule.ai;
    const { openai } = await ai.getProviders();
    const { streamObject } = ai;

    // 流式生成结构化对象
    const { partialObjectStream } = await streamObject({
        model: deepseek("deepseek-chat"),
        schema: {
            type: "object",
            properties: {
                analysis: {
                    type: "object",
                    properties: {
                        colors: {
                            type: "array",
                            items: { type: "string" }
                        },
                        style: { type: "string" },
                        mood: { type: "string" },
                        suggestions: {
                            type: "array",
                            items: { type: "string" }
                        }
                    }
                }
            },
        },
        messages: [
            {
                role: "system",
                content: "你是一个艺术评论家，能够深入分析艺术作品的色彩、风格、情感和改进建议。",
            },
            {
                role: "user",
                content: "请分析这件艺术作品的色彩搭配、艺术风格、传达的情感，并提供改进建议。",
            },
        ],
    });

    // 逐步接收部分对象
    for await (const partialObject of partialObjectStream) {
        console.log("当前分析结果:", partialObject);
    }
});
```


**重要提醒**：AI SDK 完全兼容 [ai-sdk.dev](https://ai-sdk.dev/) v5 的所有 API 和使用方式，上述示例仅展示了基本用法。唯一不同之处在于 Provider 的获取方式 - 请使用 `eagle.extraModule.ai.getProviders()` 来获取已配置的 AI 提供商，系统会自动处理 API Key 和相关配置，开发者无需关心这些细节。

更多详细的使用方法和高级功能，请参考 [AI SDK v5 官方文档](https://ai-sdk.dev/docs/ai-sdk-core/generating-text)。请注意，较新版本的 AI SDK 可能会有不同的 API 或功能。


# AI Search

{% hint style="danger" %}
**此功能尚未发布**：此功能需要 Eagle 4.0 build18+ 版本，并安装未来的「AI Search」插件才能使用。详细发布时间请关注 Eagle 官网。


***

## AI Search 插件简介

「AI Search」是一款提供 AI 语意搜索功能的插件，支持文字语意搜索、以图搜图等智能搜索能力。通过整合此插件，开发者可以在自己的插件中轻松实现强大的 AI 搜索功能。

### 主要功能

* **文字语意搜索** - 使用自然语言描述，搜索相关图片
* **以图搜图** - 使用图片搜索相似的图片
* **Item ID 搜索** - 根据已有项目搜索相似图片

***

## 如何使用 AI Search

使用 `eagle.extraModule.aiSearch` 来调用 AI Search 插件提供的功能。

### 状态查询

在调用搜索方法前，建议先检查服务状态：

```javascript
eagle.onPluginCreate(async (plugin) => {
    const aiSearch = eagle.extraModule.aiSearch;

    // 检查插件是否已安装
    const isInstalled = await aiSearch.isInstalled();
    console.log('已安装:', isInstalled);

    // 检查服务是否就绪
    const isReady = await aiSearch.isReady();
    console.log('服务就绪:', isReady);

    // 检查是否正在启动中
    const isStarting = await aiSearch.isStarting();
    console.log('启动中:', isStarting);

    // 检查是否正在同步数据
    const isSyncing = await aiSearch.isSyncing();
    console.log('同步中:', isSyncing);
});
```

### 服务控制

```javascript
eagle.onPluginCreate(async (plugin) => {
    const aiSearch = eagle.extraModule.aiSearch;

    // 打开 AI Search 插件（若未安装会提示安装）
    await aiSearch.open();

    // 检查服务健康状态
    const isHealthy = await aiSearch.checkServiceHealth();
    console.log('服务健康:', isHealthy);

    // 获取同步状态详情
    const syncStatus = await aiSearch.getSyncStatus();
    console.log('同步状态:', syncStatus);
});
```

***

## 搜索方法

### searchByText(query, options) - 文字语意搜索

使用自然语言描述搜索相关图片。

* `query` string - 搜索关键字或描述
* `options` Object (可选) - 搜索选项
  * `limit` number - 结果数量限制，默认 20
* 返回 `Promise<Object>` - 搜索结果
  * `results` Array - 搜索结果数组
    * `item` Item - 完整的 Item 对象
    * `score` number - 相似度分数

```javascript
eagle.onPluginCreate(async (plugin) => {
    const aiSearch = eagle.extraModule.aiSearch;

    // 检查服务是否就绪
    if (!await aiSearch.isReady()) {
        console.log('AI Search 服务尚未就绪');
        return;
    }

    // 文字语意搜索
    const result = await aiSearch.searchByText('一只橘色的猫咪', {
        limit: 10
    });

    // 遍历搜索结果
    result.results.forEach(r => {
        console.log('相似度:', r.score);
        console.log('文件名称:', r.item.name);
        console.log('标签:', r.item.tags);
    });
});
```

### searchByBase64(base64, options) - Base64 图片搜索

使用 Base64 编码的图片搜索相似图片。

* `base64` string - Base64 编码的图片字符串
* `options` Object (可选) - 搜索选项
  * `limit` number - 结果数量限制，默认 20
* 返回 `Promise<Object>` - 搜索结果

```javascript
eagle.onPluginCreate(async (plugin) => {
    const aiSearch = eagle.extraModule.aiSearch;

    // 使用 Base64 图片搜索
    const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...';
    const result = await aiSearch.searchByBase64(base64Image, {
        limit: 20
    });

    console.log('找到', result.results.length, '个相似图片');

    result.results.forEach(r => {
        console.log(`${r.item.name} - 相似度: ${(r.score * 100).toFixed(1)}%`);
    });
});
```

### searchByItemId(itemId, options) - 以现有项目搜索

使用已存在的 Eagle 项目 ID 搜索相似图片。

* `itemId` string - Eagle 项目 ID
* `options` Object (可选) - 搜索选项
  * `limit` number - 结果数量限制，默认 20
* 返回 `Promise<Object>` - 搜索结果

```javascript
eagle.onPluginCreate(async (plugin) => {
    const aiSearch = eagle.extraModule.aiSearch;

    // 获取当前选中的项目
    const selectedItems = await eagle.item.get({ isSelected: true });

    if (selectedItems.length === 0) {
        console.log('请先选择一个项目');
        return;
    }

    // 使用选中项目的 ID 搜索相似图片
    const result = await aiSearch.searchByItemId(selectedItems[0].id, {
        limit: 30
    });

    console.log('找到', result.results.length, '个相似图片');

    // 结果中的 item 是完整的 Item 对象，可以直接使用其方法
    for (const r of result.results) {
        console.log(`${r.item.name} (${r.item.ext}) - 相似度: ${r.score}`);

        // 可以直接使用 Item 的方法
        // await r.item.save();
    }
});
```

***

## 完整示例

### 创建相似图片搜索功能

```javascript
eagle.onPluginCreate(async (plugin) => {
    const aiSearch = eagle.extraModule.aiSearch;

    // 1. 检查服务状态
    if (!await aiSearch.isInstalled()) {
        // 打开安装提示
        await aiSearch.open();
        return;
    }

    if (!await aiSearch.isReady()) {
        console.log('请等待 AI Search 服务启动完成');
        return;
    }

    // 2. 执行搜索
    try {
        const result = await aiSearch.searchByText('日落时的海滩风景');

        if (result.results.length === 0) {
            console.log('没有找到相关图片');
            return;
        }

        // 3. 处理搜索结果
        const topResults = result.results
            .filter(r => r.score > 0.5)  // 只保留相似度 > 50% 的结果
            .slice(0, 10);               // 取前 10 个

        console.log(`找到 ${topResults.length} 个高相关度图片：`);

        topResults.forEach((r, index) => {
            console.log(`${index + 1}. ${r.item.name}`);
            console.log(`   相似度: ${(r.score * 100).toFixed(1)}%`);
            console.log(`   尺寸: ${r.item.width} x ${r.item.height}`);
            console.log(`   标签: ${r.item.tags.join(', ') || '无'}`);
        });

        // 4. 可以进一步操作这些项目
        // 例如：选中这些项目
        const itemIds = topResults.map(r => r.item.id);
        await eagle.item.select(itemIds);

    } catch (error) {
        console.error('搜索失败:', error.message);
    }
});
```

***

## API 参考

### 状态查询方法

| 方法              | 返回类型               | 说明                   |
| --------------- | ------------------ | -------------------- |
| `isInstalled()` | `Promise<boolean>` | 检查 AI Search 插件是否已安装 |
| `isReady()`     | `Promise<boolean>` | 检查服务是否就绪可用           |
| `isStarting()`  | `Promise<boolean>` | 检查服务是否正在启动中          |
| `isSyncing()`   | `Promise<boolean>` | 检查是否正在同步数据           |

### 服务控制方法

| 方法                     | 返回类型               | 说明              |
| ---------------------- | ------------------ | --------------- |
| `open()`               | `Promise<void>`    | 打开 AI Search 插件 |
| `checkServiceHealth()` | `Promise<boolean>` | 检查服务健康状态        |
| `getSyncStatus()`      | `Promise<Object>`  | 获取详细的同步状态       |

### 搜索方法

| 方法                                 | 返回类型              | 说明            |
| ---------------------------------- | ----------------- | ------------- |
| `searchByText(query, options?)`    | `Promise<Object>` | 文字语意搜索        |
| `searchByBase64(base64, options?)` | `Promise<Object>` | Base64 图片搜索   |
| `searchByItemId(itemId, options?)` | `Promise<Object>` | 以项目 ID 搜索相似图片 |

### 搜索结果格式

```javascript
{
    // ... 其他字段
    results: [
        {
            item: Item,    // 完整的 Item 对象，包含所有属性和方法
            score: number  // 相似度分数 (0-1)
        },
        // ...
    ]
}
```


**提示**：搜索结果中的 `item` 是完整的 Item 对象实例，可以直接使用 `save()`、`refreshThumbnail()` 等所有 Item 方法。


