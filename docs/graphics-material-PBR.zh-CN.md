---
order: 3
title: PBR 材质
type: 图形
group: 材质
label: Graphics/Material
---

PBR 全称是 **Physically Based Rendering**，中文意思是**基于物理的渲染**，最早由迪士尼在 2012 年提出，后来被游戏界广泛使用。跟传统的 **Blinn-Phong** 等渲染方法相比，PBR 遵循能量守恒，符合物理规则，美术们只需要调整几个简单的参数，即使在复杂的场景中也能保证正确的渲染效果。PBR 遵循能量守恒，是基于物理的渲染，并且引入了 [IBL](${docs}graphics-light) 模拟全局光照，通过金属度、粗糙度等参数，更加方便地调节渲染效果。


<playground src="pbr-helmet.ts"></playground>

## 编辑器使用

根据真实世界中光线与材质的交互，绝缘体（即当金属度为 0 时）材质也能反射大约 4% 纯色光线，从而渲染出周边环境，如下模型金属度为 0 但是还能隐约看到反射的周边环境：

<img src="https://gw.alipayobjects.com/zos/OasisHub/1017d75b-03a3-4c06-8971-524544373429/image-20231007153753006.png" alt="image-20231007153753006" style="zoom:50%;" />

我们调节材质的金属度，可以发现，金属度越大，周围的环境越清晰，并且开始从白色纯色变成彩色。这是因为电介质（即金属度为 1 时）材质会将光线 100% 全部反射出物体表面，即反射出彩色的周边环境：

<img src="https://gw.alipayobjects.com/zos/OasisHub/711f8b97-247c-465e-8cf2-4896b0c78534/metal.gif" alt="metal" style="zoom:100%;" />

材质默认是各向同性，即从不同方向观测材质表面，反射形状是相同的，我们可以通过调节各向异性相关参数，控制随着视线的变化，反射在切线、副切线空间延伸的方向，做到类似唱片拉丝的效果:

![material-anisotropy](https://gw.alipayobjects.com/zos/OasisHub/3d420bb8-9546-4412-a725-7a342a25fd22/material-anisotropy.gif)

除此之外，还有很多通用属性可以配置，比如粗糙度、环境遮蔽、自发射光、透明度等等：

<img src="https://gw.alipayobjects.com/zos/OasisHub/4806589e-386f-404a-82e5-d273e98b707d/other.gif" alt="other" style="zoom:100%;" />

## 参数

### 通用参数
| 参数 | 应用 |
| :-- | :-- |
| [baseColor](${api}core/PBRBaseMaterial#baseColor) | 基础颜色。**基础颜色** \* **基础颜色纹理** = **最后的基础颜色**。基础颜色是物体的反照率值,与传统的漫反射颜色不同，它会同时贡献镜面反射和漫反射的颜色，我们可以通过上面提到过的金属度、粗糙度，来控制贡献比。 |
| [emissiveColor](${api}core/PBRBaseMaterial#emissiveColor) | 自发光颜色。使得即使没有光照也能渲染出颜色。 |
| [baseTexture](${api}core/PBRBaseMaterial#baseTexture) | 基础颜色纹理。搭配基础颜色使用，是个相乘的关系。 |
| [normalTexture](${api}core/PBRBaseMaterial#normalTexture) | 法线纹理。可以设置法线纹理 ，在视觉上造成一种凹凸感，还可以通过法线强度来控制凹凸程度。 |
| [emissiveTexture](${api}core/PBRBaseMaterial#emissiveTexture) | 自发射光纹理。我们可以设置自发光纹理和自发光颜色（[emissiveFactor](${api}core/PBRBaseMaterial#emissiveTexture)）达到自发光的效果，即使没有光照也能渲染出颜色。 |
| [occlusionTexture](${api}core/PBRBaseMaterial#occlusionTexture) | 阴影遮蔽纹理。我们可以设置阴影遮蔽纹理来提升物体的阴影细节。 |
| [tilingOffset](${api}core/PBRBaseMaterial#tilingOffset) | 纹理坐标的缩放与偏移。是一个 Vector4 数据，分别控制纹理坐标在 uv 方向上的缩放和偏移，参考 [案例](${examples}tiling-offset) |
| [clearCoat](${api}core/PBRBaseMaterial#clearCoat) | 透明涂层的强度，默认为 0，既不开启透明涂层效果，参考 [案例](${examples}pbr-clearcoat) 。 |
| [clearCoatTexture](${api}core/PBRBaseMaterial#clearCoatTexture) | 透明涂层强度纹理，和 clearCoat 是相乘的关系。 |
| [clearCoatRoughness](${api}core/PBRBaseMaterial#clearCoatRoughness) | 透明涂层的粗糙度。 |
| [clearCoatRoughnessTexture](${api}core/PBRBaseMaterial#clearCoatRoughnessTexture) | 透明涂层粗糙度纹理，和 clearCoatRoughness 是相乘的关系。 |
| [clearCoatNormalTexture](${api}core/PBRBaseMaterial#clearCoatNormalTexture) | 透明涂层法线纹理，如果没有设置则会共用原材质的法线。 |

除了以上通用参数，PBR 提供了 **金属-粗糙度** 和 **高光-光泽度** 两种工作流，分别对应 [PBRMaterial](${api}core/PBRMaterial) 和 [PBRSpecularMaterial](${api}core/PBRSpecularMaterial)。

### PBRMaterial

| 参数 | 应用 |
| :-- | :-- |
| [metallic](${api}core/PBRMaterial#metallic) | 金属度。模拟材质的金属程度，金属值越大，镜面反射越强，即能反射更多周边环境。 |
| [roughness](${api}core/PBRMaterial#roughness) | 粗糙度。模拟材质的粗糙程度，粗糙度越大，微表面越不平坦，镜面反射越模糊。 |
| [roughnessMetallicTexture](${api}core/PBRMaterial#roughnessMetallicTexture) | 金属粗糙度纹理。搭配金属粗糙度使用，是相乘的关系。 |
| [anisotropy](${api}core/PBRMaterial#anisotropy) | 各向异性强度。默认为0，关闭各项异性计算。 |
| [anisotropyRotation](${api}core/PBRMaterial#anisotropyRotation) | 各向异性旋转角度。沿切线、副切线空间旋转相应角度。 |
| [anisotropyTexture](${api}core/PBRMaterial#anisotropyTexture) | 各向异性纹理。RG通道保存着各向异性方向，会和 anisotropyRotation 计算结果相乘；B通道保存着各向异性强度，会和 anisotropy 相乘。 |

<playground src="pbr-base.ts"></playground>

### PBRSpecularMaterial

| 参数 | 应用 |
| :-- | :-- |
| [specularColor](${api}core/PBRSpecularMaterial#specularColor) | 高光度。不同于金属粗糙度工作流的根据金属度和基础颜色计算镜面反射，而是直接使用高光度来表示镜面反射颜色。(注，只有关闭金属粗糙工作流才生效) |
| [glossiness](${api}core/PBRSpecularMaterial#glossiness) | 光泽度。模拟光滑程度，与粗糙度相反。(注，只有关闭金属粗糙工作流才生效) |
| [specularGlossinessTexture](${api}core/PBRSpecularMaterial#specularGlossinessTexture) | 高光光泽度纹理。搭配高光光泽度使用，是相乘的关系。 |

> **注**：如果您使用了 PBR 材质，千万别忘了开启[环境光的 IBL 模式](${docs}graphics-light)～只有添加了之后，属于 PBR 的金属粗糙度、镜面反射、物理守恒、全局光照才会展现出效果。

