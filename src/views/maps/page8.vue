<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import geoData from "@/assets/geoData/320000.json";
export default {
  name: "MapBoxJiangsu",
  data() {
    return {};
  },
  mounted() {
    // 初始化Mapbox地图
    mapboxgl.accessToken = `pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ`;
    const map = new mapboxgl.Map({
      container: "map", // 对应于模板中的<div id="map">的容器
      style: "mapbox://styles/mapbox/streets-v11", // 使用默认样式，也可以替换为自定义样式URL
      center: [118.791036, 32.065599], // 江苏省大致中心点坐标
      zoom: 6, // 初始缩放级别
    });

    // 加载江苏省GeoJSON数据
    // 假设您的GeoJSON数据已经通过某种方式获取并存储在this.jiangsuGeojsonData变量中
    // map.on("load", () => {
    //   this.loadGeojsonData(geoData, map);
    // });
    // 使用bind方法确保this指向Vue组件实例
    map.on(
      "load",
      function() {
        this.loadGeojsonData(geoData, map);
        this.reverseGeocode([118.791036, 32.065599], mapboxgl.accessToken);
      }.bind(this)
    );
  },
  methods: {
    loadGeojsonData(geojsonData, map) {
      // 将GeoJSON数据添加到地图
      if (map && geojsonData) {
        map.addSource("jiangsu", {
          type: "geojson",
          data: geojsonData,
        });

        // 在地图上绘制多边形
        map.addLayer({
          id: "jiangsu-polygon",
          type: "fill",
          source: "jiangsu", // 使用之前定义的source
          layout: {},
          paint: {
            "fill-color": "#8888ff", // 多边形填充颜色
            "fill-opacity": 0.5, // 多边形透明度
          },
        });
      } else {
        console.error("Map or GeoJSON data is not available.");
      }
    },
    async reverseGeocode(coordinates, accessToken) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.join(
          ","
        )}.json?access_token=${accessToken}`
      );
      const data = await response.json();

      if (data.features.length > 0) {
        const feature = data.features[0];
        this.address = `${feature.place_name}, ${feature.context[1].text}, ${feature.context[2].text}`;
      } else {
        this.address = "未能找到对应地址";
      }
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
