---
order: 2
title: 场景
type: 核心概念
label: Core
---

Scene 作为场景单元，可以方便的进行实体树管理，尤其是大型游戏场景。如: **scene1** 和 **scene2** 作为两个不同的场景，可以各自独立管理其拥有的 **Entity** 树，因此场景下的光照组件、渲染组件和物理组件之间也互相隔离，互不影响。我们可以同时渲染一个或多个 Scene，也可以在特定时机下根据项目逻辑动态切换当前 Scene。

从结构上每个 Engine 下可以包含一个和多个激活的场景。每个 Scene 可以有多个根实体。


## 编辑器使用

### 背景

<img src="https://gw.alipayobjects.com/zos/OasisHub/c417f715-801b-4ab6-85ca-2d0348570ef4/background.gif" alt="background" style="zoom:100%;" />

| 属性 | 作用 |
| :-- | :-- |
| Mode | 支持 `Sky`、`Solid Color`、`Texture` 三种模式。默认 `Sky` 模式，配大气散射作为背景； `Solid Color` 模式支持设置纯色作为背景；`Texture` 模式支持设置纹理作为背景 |
| Color | `Solid Color` 模式时，可以设置颜色 |
| Texture | `Texture` 模式时，可以设置纹理 |
| Material | `Sky` 模式时，可以绑定材质球，一般选择天空盒或者大气散射 </br> <img src="https://gw.alipayobjects.com/zos/OasisHub/5e0474d7-136d-4a8a-a2a7-8f5ee83cb5c5/image-20231007172742202.png" alt="image-20231007172742202" style="zoom:50%;" /> |
| Mesh | `Sky` 模式时，可以绑定 Mesh。大气散射搭配球，天空盒搭配立方体 |

### 阴影

可以针对整个场景进行阴影分辨率等配置：

<img src="https://gw.alipayobjects.com/zos/OasisHub/0b8707a9-5084-4e87-b530-897bcd37c16b/shadow.gif" alt="shadow" style="zoom:100%;" />

### 雾化

可以给整个场景增加 **线性、指数、指数平方** 3 种雾化：

<img src="https://gw.alipayobjects.com/zos/OasisHub/5a713502-18b2-45eb-af56-d6530a340581/fog.gif" alt="fog" style="zoom:100%;" />

## 脚本使用

| 属性名称                                 | 解释     |
| :--------------------------------------- | :------- |
| [scenes](${api}core/SceneManager#scenes) | 场景列表 |

| 方法名称                                           | 解释     |
| :------------------------------------------------- | :------- |
| [addScene](${api}core/SceneManager#addScene)       | 添加场景 |
| [removeScene](${api}core/SceneManager#removeScene) | 移除场景 |
| [mergeScenes](${api}core/SceneManager#mergeScenes) | 合并场景 |
| [loadScene](${api}core/SceneManager#loadScene)     | 加载场景 |

### 加载场景

如果想要加载 **Scene** 资产作为应用中的一个场景，可以使用 `engine.resourceManager.load` 传入 url 即可。

```typescript
const sceneUrl = "...";

engine.resourceManager
  .load({ type: AssetType.Scene, url: "..." })
  .then((scene) => {
    engine.sceneManager.addScene(scene);
  });
```

### 获取场景对象

通过调用 `engine.sceneManager.scenes` 可以获取当前引擎运行时激活的全部场景，也可以通过 `entity.scene` 获取对应 `entity` 从属的 `scene`。

```typescript
// 获取当前所有激活的场景
const scenes = engine.sceneManager.scenes;

// 获取节点属于的场景
const scene = entity.scene;
```

### 添加/移除 Scene

`engine.sceneManager.scenes` 是只读的，若需要添加和移除 **Scene** ，需要调用 `engine.sceneManager.addScene()` 或 `engine.sceneManager.removeScene()` ，**引擎支持同时渲染多个场景**。

```typescript
// 假设已经有两个场景
const scene1, scene2;

// 添加 场景1
engine.sceneManager.addScene(scene1);

// 添加 场景2
engine.sceneManager.addScene(scene1);

// 移除 场景2
engine.sceneManager.removeScene(scene2);
```

多场景渲染示例如下：

<playground src="multi-scene.ts"></playground>

### 合并场景

可以使用 `engine.sceneManager.mergeScenes` 将 2 个场景进行合并为 1 个场景。

```typescript
// 假设已经有两个未激活的场景
const sourceScene, destScene;

// 将 sourceScene 合并到 destScene
engine.sceneManager.mergeScenes(sourceScene, destScene);

// 激活 destScene
engine.sceneManager.addScene(destScene);
```

### 销毁场景

调用 `scene.destroy()` 即可销毁场景，被销毁的场景也会自动从激活场景列表中移除。

### 设置场景背景

目前场景背景支持添加纯色、天空和纹理背景。纯色和天空相对简单，代码示例如下：

```typescript
const scene = engine.sceneManager.scenes[0];
const { background } = scene;

// 添加纯色背景
background.mode = BackgroundMode.SolidColor; // 默认纯色背景
background.solidColor.set(1, 1, 1, 1); // 纯白色

// 添加天空盒背景
background.mode = BackgroundMode.Sky;
const skyMaterial = (background.sky.material = new SkyBoxMaterial(engine)); // 添加天空盒材质
skyMaterial.texture = textureCube; // 设置立方体纹理
background.sky.mesh = PrimitiveMesh.createCuboid(engine, 2, 2, 2); // 设置天空盒网格

// 添加纹理背景
background.mode = BackgroundMode.Texture;
background.textureFillMode = BackgroundTextureFillMode.AspectFitWidth;
background.texture = texture;
```

##### 纹理背景适配模式

通过 `background.textureFillMode = BackgroundTextureFillMode.AspectFitWidth` 设置纹理适配模式。

目前纹理适配模式有以下三种：

| 适配模式                                                                | 说明                                               |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| [AspectFitWidth](${api}core/BackgroundTextureFillMode#AspectFitWidth)   | 保持宽高比，把纹理宽缩放至 Canvas 的宽，上下居中。 |
| [AspectFitHeight](${api}core/BackgroundTextureFillMode#AspectFitHeight) | 保持宽高比，把纹理高缩放至 Canvas 的高，左右居中。 |
| [Fill](${api}core/BackgroundTextureFillMode#Fill)                       | 把纹理的宽高填满 Canvas 的宽高。                   |

默认的适配模式是 `BackgroundTextureFillMode.AspectFitHeight`。

Playground 示例如下：

<playground src="background.ts"></playground>

### 设置场景环境光

请参考相关文档： [环境光](${docs}graphics-light)

### 实体树管理

| 方法名称                                              | 解释                                                                                                 |
| :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| [createRootEntity](${api}core/Scene#createRootEntity) | 新创建的 _scene_ 默认没有根实体，需要手动创建                                                        |
| [addRootEntity](${api}core/Scene#addRootEntity)       | 可以直接新建实体，或者添加已经存在的实体                                                             |
| [removeRootEntity](${api}core/Scene#removeRootEntity) | 删除根实体                                                                                           |
| [getRootEntity](${api}core/Scene#getRootEntity)       | 查找根实体，可以拿到全部根实体，或者单独的某个实体对象。注意，全部实体是只读数组，不能改变长度和顺序 |


```typescript
const engine = await WebGLEngine.create({ canvas: "demo" });
const scene = engine.sceneManager.scenes[0];

// 创建根实体
const rootEntity = scene.createRootEntity();

// 添加实体到场景
scene.addRootEntity(rootEntity);

// 删除根实体
scene.removeRootEntity(rootEntity);

// 查找根实体
const allEntities: Readonly<Entity[]> = scene.rootEntities;

const entity2 = scene.getRootEntity(2);
```

### 其他

需要注意的是，当我们熟悉了 [Engine](${api}core/Engine) 和 [Scene](${api}core/Scene) 之后，如果想要将渲染画面输出到屏幕上或者进行离屏渲染，我们还得确保当前 _scene_ 的实体树上挂载了 [Camera](${api}core/Camera)，挂载相机的方法如下：

```typescript
const cameraEntity = rootEntity.createChild("camera");

cameraEntity.addComponent(Camera);
```