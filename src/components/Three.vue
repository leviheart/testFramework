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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.container.appendChild(renderer.domElement);

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 创建球体几何体和材质
    const geometry = new THREE.SphereGeometry(10, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x008000 });

    // 创建网格
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
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
