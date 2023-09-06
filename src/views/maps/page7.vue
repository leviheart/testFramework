<template>
  <div class="app" ref="appRef">
    <div id="map"></div>
    <div class="bottom">一些文字 bottom</div>
    <button @click="changeStyle">按钮</button>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

// 设置 Mapbox access token
mapboxgl.accessToken =
  // `pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ`
  // "pk.eyJ1Ijoid2FuZ3Rvbmd4dWUiLCJhIjoiY2pzY3E2M2k0MDk3NzN5dDA0Nmtia2h0cCJ9.oP9fEJxOgVzm0dWGvL6tGg";
  "pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ";
var map;
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    isMapLoaded() {
      return map && map.loaded();
    },
  },
  watch: {
    isMapLoaded(newValue) {
      console.log(newValue);
      if (newValue) {
        this.addLayers();
      }
    },
  },
  mounted() {
    this.addLayers();
  },
  methods: {
    addLayers() {
      const lineData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "1",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [-122.45, 37.78],
                [-122.45, 37.79],
                [-122.46, 37.79],
              ],
            },
          },
          {
            type: "Feature",
            properties: {
              name: "2",
            },
            geometry: {
              type: "LineString",
              coordinates: [
                [-122.47, 37.78],
                [-122.47, 37.79],
                [-122.48, 37.79],
              ],
            },
          },
        ],
      };
      console.log(map);
      // 创建地图
      map = new mapboxgl.Map({
        container: "map", // 地图容器的 DOM 元素的 ID
        style: "mapbox://styles/mapbox/streets-v11", // 地图样式
        center: [-122.45, 37.78], // 地图的中心位置
        zoom: 12, // 地图的缩放级别
      });
      console.log(map);
      // 添加数据到地图中
      map.on("load", function() {
        // 将数据添加到地图中
        map.addSource("road-source", {
          type: "geojson",
          data: lineData,
        });
        map.addLayer({
          id: "road-line",
          type: "line",
          source: "road-source",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
        console.log(
          "1111111",
          map.getLayer("road-label"),
          map.getLayer("road-label1"),
          map.getLayer("road-label2")
        );
        // 添加文本图层
        map.addLayer({
          id: "road-label1",
          type: "symbol",
          source: "road-source",
          layout: {
            "text-field": "{name}",
            "text-rotation-alignment": "map",
            "symbol-placement": "line",
          },
          paint: {
            "text-color": "#000",
          },
        });
      });
      console.log(map);
    },
    changeStyle() {
      var features = map.queryRenderedFeatures({ layers: ["road-line"] });
      var targetFeature = features.find(function(feature) {
        return feature.properties.name === "1";
      });
      if (targetFeature) {
        map.setPaintProperty("road-line", "line-color", {
          property: "name",
          type: "categorical",
          stops: [[targetFeature.properties.name, "blue"]],
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100vh;
}

.bottom {
  position: absolute;
  bottom: 0;
}
</style>
