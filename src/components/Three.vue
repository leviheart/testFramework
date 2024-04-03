<template>
  <div id="container" ref="container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeJsComponent",
  mounted() {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.container.appendChild(renderer.domElement);

    // 启用阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100; // 调整相机距离

    // 创建球体几何体和材质
    const geometry = new THREE.SphereGeometry(10, 64, 32);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.5,
      color: 0x008000,
      envMapIntensity: 0.5, // 可选：使用环境贴图增强反射效果
      // 若使用环境贴图，需先加载并设置到材质的 envMap 属性
      // receiveShadow: true, // 如果启用阴影，开启接收阴影
    });

    // 创建网格
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true; // 如果启用阴影，开启阴影投射
    scene.add(sphere);

    // 添加光照
    const ambientLight = new THREE.AmbientLight(0x202020); // 降低环境光亮度
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2); // 增大点光源半径
    pointLight.position.set(20, 20, 20);
    pointLight.castShadow = true; // 如果启用阴影，开启阴影投射
    scene.add(pointLight);

    // 添加辅助光源（例如，平行光或聚光灯）
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-1, 1, 1).normalize(); // 设置光源方向
    directionalLight.castShadow = true; // 如果启用阴影，开启阴影投射
    scene.add(directionalLight);

    // 阴影相关配置（仅在启用阴影时需要）
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 100;
    pointLight.shadow.camera.left = -50;
    pointLight.shadow.camera.right = 50;
    pointLight.shadow.camera.top = 50;
    pointLight.shadow.camera.bottom = -50;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.bias = -0.0001; // 减少阴影边缘锯齿
    
    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      // sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.06;
      renderer.render(scene, camera);
    }
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
