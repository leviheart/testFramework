<template>
  <div id="cesiumContainer">
    <vc-viewer @ready="onViewerReady"></vc-viewer>
  </div>
</template>

<script>
export default {
  methods: {
    onViewerReady(cesiumInstance) {
      const { Cesium, viewer } = cesiumInstance;

      // 设置初始视点
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(100.0, 20.0, 1000000.0), // 经度、纬度、高度
        orientation: {
          heading: Cesium.Math.toRadians(0), // 方向角（从正北开始逆时针旋转的角度）
          pitch: Cesium.Math.toRadians(-90), // 俯仰角（视线与地平面之间的夹角）
          roll: 0.0,
        },
      });

      // 加载一个地球影像图层
      viewer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        })
      );

      // 添加一个标记
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(100.0, 20.0),
        billboard: {
          image: require('@a/image/blueCamera.png'), // 自定义图标路径
          scale: 0.8,
        },
        label: {
          text: 'Hello, Cesium!',
          font: '14px sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        },
      });
    },
  },
};
</script>

<style scoped>
#cesiumContainer {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>