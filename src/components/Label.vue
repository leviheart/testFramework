<!-- <template>
	<div class="container">
		<div id="cesiumContainer"></div>
	</div>
</template>

<script>
	var viewer, camera;
	export default {
		data() {
			return {};
		},
		mounted() {
			this.init(); // 二
		},
		methods: {
			init() {
				viewer = new Cesium.Viewer("cesiumContainer", {});
				var layer = viewer.imageryLayers.addImageryProvider(
					new Cesium.ArcGisMapServerImageryProvider({
						url: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
					})
				);
				//   初始化场景位置
				viewer.scene.camera.flyTo({
					// 初始化相机经纬度
					destination: new Cesium.Cartesian3.fromDegrees(
						121.54035,
						38.92146,
						2000
					),
					orientation: {
						heading: Cesium.Math.toRadians(0.0),
						pitch: Cesium.Math.toRadians(-25.0), //从上往下看为-90
						roll: 0,
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
</style> -->

<!-- <template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
var viewer, camera;
export default {
  data() {
    return {};
  },
  mounted() {
    this.init(); // 一
  },
  methods: {
    init() {
      viewer = new Cesium.Viewer("cesiumContainer", {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style> -->

<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
var viewer, camera, handler;
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      viewer = new Cesium.Viewer("cesiumContainer", {});
      var layer = viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        })
      );
      //   初始化场景位置
      viewer.scene.camera.flyTo({
        // 初始化相机经纬度
        destination: new Cesium.Cartesian3.fromDegrees(
          121.54035,
          38.92146,
          2000
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-25.0), //从上往下看为-90
          roll: 0,
        },
      });

      handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction((e) => {
        var pick = viewer.scene.pick(e.position);
        console.log(e, pick);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      this.addBillboard();
      this.addPolyline();
      this.addPolygon();
    }, // 三
    addBillboard() {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(121.54035, 38.92146, 50),
        billboard: {
          image: require("../assets/image/blueCamera.png"), // default: undefined
          // show: true, // default
          // pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
          // eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          // horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
          // verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
          // scale: 2.0, // default: 1.0
          // color: Cesium.Color.LIME, // default: WHITE
          // rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
          // alignedAxis: Cesium.Cartesian3.ZERO, // default
          // width: 100, // default: undefined
          // height: 25, // default: undefined
        },
      });
    },
    addPolyline() {
      viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            121.534575, 38.926131, 121.537579, 38.92543, 121.541784, 38.924578,
            121.543973, 38.924144, 121.545947, 38.923944,
          ]),
          width: 4,
          material: Cesium.Color.DARKORANGE.withAlpha(0.3),
          // clampToGround: true,
          // show: true,
        },
      });
      viewer.entities.add({
        // name:entity.name,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            121.534575, 38.926131, 121.537579, 38.92543, 121.541784, 38.924578,
            121.543973, 38.924144, 121.545947, 38.923944,
          ]),
          width: 4, // 线的宽度，像素为单位
          material: new Cesium.PolylineTrailMaterialProperty({
            // 尾迹线材质
            color: Cesium.Color.GOLD,
            trailLength: 0.4,
            period: 3.0,
          }),
          // clampToGround: true,
          // show: true,
        },
      });
    },
    addPolygon() {
      viewer.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            121.539208, 38.924962, 121.539176, 38.924737, 121.540195, 38.924486,
            121.540281, 38.924737,
          ]),
          extrudedHeight: 50,
          material: Cesium.Color.WHITESMOKE,
          // closeTop: false,
          // closeBottom: false,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
