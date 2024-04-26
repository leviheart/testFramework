<template>
  <div id="container" ref="container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeJsComponent",
  // 在组件挂载时初始化THREE.js的场景、相机、渲染器和几何体
  mounted() {
    // 初始化场景
    const scene = new THREE.Scene();
    // 创建WebGL渲染器并设置其大小为窗口大小
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将渲染器的DOM元素添加到组件的容器中
    this.$refs.container.appendChild(renderer.domElement);

    // 启用阴影映射并设置类型
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 初始化透视相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 设置相机位置
    camera.position.z = 40;

    // 创建球体几何体和材质
    const geometry = new THREE.SphereGeometry(10, 64, 32);
    const textureLoader = new THREE.TextureLoader();
    const imageUrl = require("../assets/image/blueCamera.png");
    const texture = textureLoader.load(imageUrl); // 加载纹理图片
    const material = new THREE.MeshPhongMaterial({
      map: texture, // 应用纹理
      shininess: 100,
    });

    // 创建并添加带阴影的球体到场景
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    // 添加环境光和点光源到场景
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 500);
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // 设置点光源的阴影属性
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.near = 0.5;
    pointLight.shadow.camera.far = 500;

    // 定义动画函数以持续渲染场景
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.02;
      renderer.render(scene, camera);
    }
    // 启动动画
    animate();
  },
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>