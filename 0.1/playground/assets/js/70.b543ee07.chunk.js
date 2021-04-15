(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{483:function(e,n,t){"use strict";t.r(n),n.default='import { OrbitControl } from "@oasis-engine/controls";\nimport * as dat from "dat.gui";\nimport {\n  AmbientLight,\n  AssetType,\n  Camera,\n  DirectLight,\n  EnvironmentMapLight,\n  SkyBox,\n  SystemInfo,\n  Texture2D,\n  TextureCubeMap,\n  Vector3,\n  WebGLEngine\n} from "oasis-engine";\n\n//-- create engine object\nlet engine = new WebGLEngine("o3-demo");\nengine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;\nengine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;\n\nlet scene = engine.sceneManager.activeScene;\nconst rootEntity = scene.createRootEntity();\n\nconst color2glColor = (color) => new Vector3(color[0] / 255, color[1] / 255, color[2] / 255);\nconst glColor2Color = (color) => new Vector3(color[0] * 255, color[1] * 255, color[2] * 255);\nconst gui = new dat.GUI();\ngui.domElement.style = "position:absolute;top:0px;left:50vw";\n\nlet envLightNode = rootEntity.createChild("env_light");\nlet envLight = envLightNode.addComponent(EnvironmentMapLight);\nlet envFolder = gui.addFolder("EnvironmentMapLight");\nenvFolder.add(envLight, "enabled");\nenvFolder.add(envLight, "specularIntensity", 0, 1);\nenvFolder.add(envLight, "diffuseIntensity", 0, 1);\n\nlet directLightColor = { color: [255, 255, 255] };\nlet directLightNode = rootEntity.createChild("dir_light");\nlet directLight = directLightNode.addComponent(DirectLight);\ndirectLight.color = new Vector3(1, 1, 1);\nlet dirFolder = gui.addFolder("DirectionalLight1");\ndirFolder.add(directLight, "enabled");\ndirFolder.addColor(directLightColor, "color").onChange((v) => (directLight.color = color2glColor(v)));\ndirFolder.add(directLight, "intensity", 0, 1);\n\nconst ambient = rootEntity.addComponent(AmbientLight);\nambient.color = new Vector3(0.2, 0.2, 0.2);\n\n//-- create camera\nlet cameraNode = rootEntity.createChild("camera_node");\ncameraNode.transform.position = new Vector3(0, 0, 5);\ncameraNode.addComponent(Camera);\ncameraNode.addComponent(OrbitControl);\n\nPromise.all([\n  engine.resourceManager\n    .load("https://gw.alipayobjects.com/os/bmw-prod/83219f61-7d20-4704-890a-60eb92aa6159.gltf")\n    .then((gltf: any) => {\n      rootEntity.addChild(gltf.defaultSceneRoot);\n      const material = gltf.materials[0];\n      const video = document.getElementById("video") as HTMLVideoElement;\n      const texture = new Texture2D(engine, 960, 540, undefined, false);\n\n      material.preRender = () => {\n        texture.setImageSource(video);\n      };\n\n      material.baseColorTexture = texture;\n    }),\n  engine.resourceManager\n    .load<TextureCubeMap>({\n      urls: [\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*Bk5FQKGOir4AAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_cPhR7JMDjkAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*trqjQp1nOMQAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_RXwRqwMK3EAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*q4Q6TroyuXcAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*DP5QTbTSAYgAAAAAAAAAAAAAARQnAQ"\n      ],\n      type: AssetType.TextureCube\n    })\n    .then((cubeMap) => {\n      envLight.diffuseMap = cubeMap;\n    }),\n  engine.resourceManager\n    .load<TextureCubeMap>({\n      urls: [\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*5w6_Rr6ML6IAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*TiT2TbN5cG4AAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*8GF6Q4LZefUAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*D5pdRqUHC3IAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*_FooTIp6pNIAAAAAAAAAAAAAARQnAQ",\n        "https://gw.alipayobjects.com/mdn/rms_7c464e/afts/img/A*CYGZR7ogZfoAAAAAAAAAAAAAARQnAQ"\n      ],\n      type: AssetType.TextureCube\n    })\n    .then((cubeMap) => {\n      envLight.specularMap = cubeMap;\n      rootEntity.addComponent(SkyBox).skyBoxMap = cubeMap;\n    })\n]).then(() => {\n  engine.run();\n});\n'}}]);