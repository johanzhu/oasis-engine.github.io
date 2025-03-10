---
order: 3
title: 编辑脚本
type: 脚本
label: Script
---

![Code Editor Snapshot](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*oXB7Q7j8ngMAAAAAAAAAAAAADqiTAQ/original)

Galacean Editor 提供了一个功能强大的代码编辑器，提供了代码提示，第三方包引入，引擎事件调试，脚本参数调试，项目实时预览等多种能力，可帮助你快速编辑和调试代码。

> 想要详细了解 Galacean 的脚本系统的，请阅读 [脚本系统](${docs}script)

## 代码编辑

在场景编辑器中创建脚本资产后，双击该脚本即可打开代码编辑器。Galacean 中的脚本需使用 [Typescript](https://www.typescriptlang.org/) 语言编写，同时新脚本默认基于内置模板创建。另外，Galacean 的代码编辑器基于 Monaco，快捷键与 VSCode 类似。修改脚本后，按 `Ctrl/⌘ + S` 保存，右侧实时预览区展现最新场景效果。

> 提示：Galacean 代码编辑器目前支持 `.ts` `.gs` 和 `.glsl` 的文件编辑

## 文件预览

![Code Editor Snapshot](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*o51FQa9Uh0MAAAAAAAAAAAAADqiTAQ/original)

1. **文件搜索** 可快速搜索项目中的文件
2. **代码筛选** 文件树是否仅显示代码文件 ( `.ts` `.gs` `.glsl` )
3. **内置文件** 用来显示哪些文件是不可编辑的内部文件
4. **展开/隐藏** 可切换文件夹的展开或隐藏
5. **代码文件** 可编辑的代码文件会显示对应的文件类型的缩略图标

## 引入第三方包

代码编辑器内置了与项目相对应的引擎，可自动提供引擎 API 的智能提示，从而帮助你快速实现基于引擎的逻辑。但大多数情况下你都需要引入 Galacean 生态包或其他第三方包来增强功能。

![Code Editor Snapshot](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*Nc2MQqOeWxgAAAAAAAAAAAAADqiTAQ/original)

1. **搜索框** 在搜索框输入包名，按下 回车键，即可快速拉取包的版本列表
2. **版本选择** 默认情况下使用 `latest` 版本
3. **导入按钮** 选择好包名和版本，点击导入按钮即可将三方包的类型信息加载到工作区
4. **包列表** 此处会列出当前项目依赖的所有第三方包
5. **版本切换** 此处可切换已导入的包的版本，切换后会将新的类型信息加载到工作区

> 试一下：在搜索框输入 `@galacean/engine-toolkit`，点击「引入」按钮，然后在代码中使用 `import { OrbitControl } from '@galacean/engine-toolkit` 来引入自由相机组件。

## 实时预览区

Galacean 的代码编辑器提供实时预览功能。保存代码后，预览区会自动更新，从而让你快速查看代码的执行结果。

![Code Editor Snapshot](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*dCHqRIMdHbkAAAAAAAAAAAAADqiTAQ/original)

1. **拖动按钮** 按住来拖动模拟器。将模拟器拖到屏幕右边缘，即可将其固定在右侧面板上。
2. **统计信息切换** 点击来切换场景统计信息的显示状态
3. **新窗口打开** 在新窗口中来打开项目预览页面
4. **脚本参数编辑** 如果当前场景中激活的脚本，拥有可配置的参数，即可打开此面板来实时调整脚本参数。想要了解脚本参数的详细信息，请查看 [脚本系统](${docs}script-attributes)
5. **关闭按钮** 点击来关闭模拟器。关闭后，屏幕右上方提供一个显示按钮，点击即可重新打开模拟器

## 事件调试

在代码编辑器中，我们提供了一个事件调试面板，从而帮助你快速调试场景中的事件。

![Code Editor Snapshot](https://mdn.alipayobjects.com/huamei_fvsq9p/afts/img/A*xtmMT676qvcAAAAAAAAAAAAADqiTAQ/original)

1. **事件列表** Galacean Editor 会自动收集场景中的所有事件名并显示在这里
2. **事件参数配置** 你可以点击此按钮来配置触发事件时所携带的参数，参数的配置使用 `JSON` 格式编写
3. **事件触发按钮** 点击此按钮会触发场景中的对应事件

> 注意，脚本组件一定要绑定到某个实体上，才会展示事件列表。

