---
order: 0
title: 交互总览
type: 交互
label: Interact
---

Galacean 提供了基本的输入系统，基于跨端跨平台的特性，交互系统在 PC 端和移动端都有很好的兼容性。当前的交互系统可以接受以下输入：

- [触控](${docs}input-pointer)
- [键盘](${docs}input-keyboard)
- [滚轮](${docs}input-wheel)

## 初始化

在初始化引擎时，可以自定义**触控**，**键盘**与**滚轮**的监听源。

```mermaid
---
title: Diagram of IInputOptions
---
classDiagram
    Interface IInputOptions
    IInputOptions: +EventTarget pointerTarget 触控事件的监听源，默认为当前画布
    IInputOptions: +EventTarget keyboardTarget 触控事件的监听源，默认为 window
    IInputOptions: +EventTarget wheelTarget 触控事件的监听源，默认为当前画布
```

```typescript
// 将触控事件的监听源设置为 document
const engine = await WebGLEngine.create({
  canvas,
  input: {
    pointerTarget: document,
  },
});
```

> ⚠️ 不要将触控的监听源设置为 `window` ，因为 `window` 无法接收 `PointerLevel` 事件，会导致触控信息紊乱。
> ⚠️ 若将键盘的监听源设置为某个 `HtmlElement`，需要设置它的 `tabIndex` 从而可以 focus ，例如您可以调用一次 `canvas.tabIndex = canvas.tabIndex;`

## 帧缓冲拾取

若引擎的[触控回调](${docs}input-pointer)无法满足需求，可以尝试使用[帧缓冲拾取](${docs}input-framebuffer-picker)
