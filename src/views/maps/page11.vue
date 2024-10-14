<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "jiangxi",
  data() {
    return {};
  },
  mounted() {
    mapboxgl.accessToken = `pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ`;
    const map = new mapboxgl.Map({
      container: "map", // 对应于模板中的<div id="map">的容器
      style: "mapbox://styles/mapbox/streets-v11", // 使用默认样式，也可以替换为自定义样式URL
      center: [118.791036, 32.065599], // 江苏省大致中心点坐标
      zoom: 6, // 初始缩放级别
    });
    const self = this;
    map.on("load", function() {
      self.init(map);
    });
  },
  methods: {
    init(map) {
      var line = turf.lineString([
        [0, 0],
        [22, 6],
        [123, 7],
        [124, 38],
        [124, 69],
      ]);

      var bbox = turf.bbox(line);
      var center = turf.point([(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2]);
      var closestPoint = turf.nearestPointOnLine(line, center, { units: "miles" });
      console.log(bbox,line,center,closestPoint,(bbox[0] + bbox[2]) / 2);

      // 将线要素添加到地图上
      map.addSource("line-source", {
        type: "geojson",
        data: line,
      });

      map.addLayer({
        id: "line-layer",
        source: "line-source",
        type: "line",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 3,
        },
      });

      // 将中心点要素添加到地图上
      map.addSource("center-source", {
        type: "geojson",
        data: closestPoint,
      });
      // 加载车辆图标
      let imageUrl = require("@/assets/image/骑车.jpg");
      map.loadImage(imageUrl, function(error, image) {
        map.addImage("ride", image);
      });
      map.addLayer({
        id: "center-layer",
        source: "center-source",
        type: "symbol",
        layout: {
          "icon-image": "ride", // 替换为你的图标
          "icon-size": 0.5,
        },
      });
    },
  },
};
</script>

<style scoped>
#map {
  position: absolute;
  top: 120px;
  bottom: 0;
  width: 100%;
}
.mapboxgl-ctrl {
  display: none !important;
}
</style>
