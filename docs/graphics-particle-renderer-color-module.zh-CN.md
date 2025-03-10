---
order: 7
title: 颜色模块
type: 图形
group: 粒子
label: Graphics/Particle
---

[`ColorOverLifetimeModule`](${api}core/ColorOverLifetimeModule) 继承自 `ParticleGeneratorModule`，用于处理粒子系统的生命周期内的颜色变化。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*8jjgTK0-EWMAAAAAAAAAAAAADtKFAQ/original)

## 属性

| 属性                                              | 释义                                                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [color](${api}core/ColorOverLifetimeModule#color) | [ParticleCompositeGradient](${api}core/ParticleCompositeGradient) 对象，表示粒子在其生命周期内的颜色渐变 |

## 渐变编辑

对于 [ParticleCompositeGradient](${api}core/ParticleCompositeGradient) 对象，编辑器内置了渐变编辑器。渐变条上方代表颜色 key，下方代表 alpha 值 key。每个 key 在渐变条的位置代表其时间。双击现有 key 可以新建 key，长按 key 并向下拖动可以删除 key。

![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*BW3dQb--WXAAAAAAAAAAAAAADtKFAQ/original) ![avatar](https://mdn.alipayobjects.com/huamei_qbugvr/afts/img/A*NHL9RKwOFTIAAAAAAAAAAAAADtKFAQ/original)
