vue
<template>
  <div>
    <!-- <div class="wrap" v-for="item in b">
      {{ item }}
      {{ item }}
    </div> -->
    <!-- 在地图上显示的div -->
    <div id="map2"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import page1 from "@/views/maps/page1";
import lineData from "@/assets/geoData/lineData";
export default {
  name: "addMarker",
  data() {
    return {
      b: {
        a: 1,
        c: 3,
      },
    };
  },
  components: {
    page1,
  },
  mounted() {
    // 设置Mapbox的访问令牌
    mapboxgl.accessToken = `pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ`;
    let that = this;
    // 初始化地图
    const map = new mapboxgl.Map({
      container: "map2", // 地图容器ID
      style: "mapbox://styles/mapbox/streets-v11", // 地图样式
      center: [118.79, 32.06], // 地图初始中心点
      zoom: 18, // 地图初始缩放级别
    });
    window.map = map;
    // 地图加载完成后，调用init方法初始化
    map.on("load", function() {
      that.init(map);
    });
  },
  methods: {
    init(map) {
      // 添加地图数据源
      console.log(lineData.features.length);
      /* lineData.features.forEach((element, index) => {
        map.addSource(`lines${index}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [element],
          },
        });
        // 添加图层
        map.addLayer({
          id: `linesLayer${index}`,
          type: "line",
          source: `lines${index}`,
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "blue",
            "line-width": 5,
          },
        });
      }); */
      map.addSource(`lines`, {
        type: "geojson",
        data: lineData,
      });
      // 添加图层
      map.addLayer({
        id: `linesLayer`,
        type: "line",
        source: `lines`,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "blue",
          "line-width": 5,
        },
      });
      // 点击线条时，改变线条样式
      //在这段代码中，"butt"是用于设置地图上线条的线帽样式的一种选项。线帽是线条的终点样式，可以是不同的形状，比如平直的线帽（butt）、圆形线帽（round）等。
      //在这里，如果满足条件["==", ["get", "id"], targetFeature.properties.id]，则线条的线帽样式将被设置为"butt"，否则将设置为"round"。
      map.on("click", "linesLayer", function(e) {
        var features = map.queryRenderedFeatures({ layers: ["linesLayer"] });
        console.log("features", features);
        var targetFeature = features.find(function(feature) {
          return feature.properties.id === 1;
        });
        if (targetFeature) {
          //"line-cap" "line-color" "butt","round",
          map.setLayoutProperty("linesLayer", "line-cap", [
            "case",
            ["==", ["get", "id"], targetFeature.properties.id],
            "butt",
            "round",
          ]);
        }
      });
      //marker功能测试
      this.testMarker(map);
    },
    testMarker(map) {
      const markerData = [
        { lngLat: [118.79, 32.06], index: 0 },
        { lngLat: [119.79, 31.06], index: 1 },
        { lngLat: [121.79, 35.06], index: 2 },
        // ...其他marker数据
      ];
      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: markerData.map((marker, index) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: marker.lngLat,
            },
            properties: {
              index: marker.index, // 保留索引数据
            },
          })),
        },
      });
      const imageUrl = require("../../assets/image/blueCamera.png");
      map.loadImage(imageUrl, function(error, image) {
        if (error) throw error;
        console.log("加入图片");
        map.addImage("marker-icon", image);
        // 继续其他操作...
        map.addLayer({
          id: "markers",
          type: "symbol",
          source: "markers",
          layout: {
            "icon-image": "marker-icon", // 使用默认marker图标
            "icon-allow-overlap": true, // 允许重叠
            "icon-ignore-placement": true, // 忽略与标注文字的空间规则
            "text-field": ["get", "index"], // 从marker属性获取索引作为标注
            "text-offset": [0, 1.1],
            "text-anchor": "top",
          },
        });
      });
    },
  },
};
</script>
<style scoped>
#map2 {
  position: absolute;
  top: 120px;
  bottom: 0;
  width: 100%;
}
.mapboxgl-ctrl {
  display: none !important;
}
.wrap {
  margin-top: 100px;
  height: 200px;
  width: 200px;
}
</style>
