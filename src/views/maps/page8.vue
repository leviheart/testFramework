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
        // this.reverseGeocode([118.791036, 32.065599], mapboxgl.accessToken);
      }.bind(this)
    );
  },
  methods: {
    loadGeojsonData(geojsonData, map) {
      const geodata = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: "1",
            properties: {
              //图层颜色
              color: "#8888ff",
              //图层透明度
              opacity: 0.5,
              //图层填充颜色
              fillColor: "#0000ff",
              //图层填充透明度
              fillOpacity: 0.5,
              //图层边框颜色
              strokeColor: "#8888ff",
              //图层边框宽度
              strokeWidth: 1,
              originColor: "#0000ff",
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [139.5, 41.0],
                  [140.4, 42.0],
                  [143.4, 53.1],
                  [144.5, 64.1],
                  [159.5, 75.0],
                ],
              ],
            },
          },
          {
            type: "Feature",
            id: "2",
            properties: {
              //图层颜色
              color: "#0088ff",
              //图层透明度
              opacity: 0.5,
              //图层填充颜色
              fillColor: "#00ff00",
              //图层填充透明度
              fillOpacity: 0.5,
              //图层边框颜色
              strokeColor: "#8888ff",
              //图层边框宽度
              strokeWidth: 1,
              originColor: "#00ff00",
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [100, 40.0],
                  [113.5, 55.0],
                  [114.5, 67.1],
                  [117.6, 75.1],
                  [120.6, 80.0],
                ],
              ],
            },
          },
          {
            type: "Feature",
            id: "3",
            properties: {
              //图层颜色
              color: "#ff68ff",
              //图层透明度
              opacity: 0.5,
              //图层填充颜色
              fillColor: "#ff0000",
              //图层填充透明度
              fillOpacity: 0.5,
              //图层边框颜色
              strokeColor: "#8888ff",
              //图层边框宽度
              strokeWidth: 1,
              originColor: "#ff0000",
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [81.7, 41.0],
                  [84.6, 44.0],
                  [90.6, 49.1],
                  [93.7, 53.1],
                  [98.7, 60.0],
                ],
              ],
            },
          },
        ],
      };
      geojsonData = geodata;
      // 将GeoJSON数据添加到地图
      if (map && geojsonData) {
        console.log("进入面图层");

        map.addSource("jiangsu", {
          type: "geojson",
          data: geojsonData,
        });
        console.log(geojsonData);

        // 在地图上绘制多边形
        map.addLayer({
          id: "jiangsu-polygon",
          type: "fill",
          source: "jiangsu", // 使用之前定义的source
          layout: {},
          paint: {
            "fill-color": ["get", "fillColor"],
            "fill-opacity": 0.5,
          },
        });
        // 监听点击事件
        map.on("click", "jiangsu-polygon", function(e) {
          // 获取被点击的特征
          var feature = e.features[0];
          console.log(feature, "feature");

          if (!feature) return;

          var newColor = "#000000";
          console.log(map.getSource("jiangsu")._data, "map.getSource");
          console.log(map.querySourceFeatures("jiangsu"), "map.getSource");

          // 更新特征的 fillcolor 属性
          // 更新特征的属性
          map.getSource("jiangsu").setData({
            type: "FeatureCollection",
            features: map.getSource("jiangsu")._data.features.map((f) => {
              f.properties.fillColor = f.properties.originColor;
              if (f.id == feature.id) {
                f.properties.fillColor = newColor;
              }
              return f;
            }),
          });
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
