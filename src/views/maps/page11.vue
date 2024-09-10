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
    this.init();
  },
  methods: {
    init() {
      var polygon1 = turf.polygon(
        [
          [
            [128, -26],
            [141, -26],
            [141, -21],
            [128, -21],
            [128, -26],
          ],
        ],
        {
          fill: "#F00",
          "fill-opacity": 0.1,
        }
      );
      var polygon2 = turf.polygon(
        [
          [
            [126, -28],
            [140, -28],
            [140, -20],
            [126, -20],
            [126, -28],
          ],
        ],
        {
          fill: "#00F",
          "fill-opacity": 0.1,
        }
      );

      var difference = turf.difference(
        turf.featureCollection([polygon1, polygon2])
      );
      console.log(difference,"difference");
      
    },
  },
}

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
