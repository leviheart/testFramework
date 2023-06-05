<template>
  <div>
    <div class="wrap" v-for="item in b">
      {{ item }}
      {{ item }}
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import page1 from "@/views/maps/page1";
export default {
  name: "addMarker",
  data() {
    return {
      b: {
        a: 1,
        c: 3
      }
    };
  },
  components: {
    page1,
  },
  mounted() {
    // mapboxgl.accessToken = `pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ`;
    // let that = this;
    // const map = new mapboxgl.Map({
    //   container: "map2",
    //   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   center: [118.79, 32.06],
    //   zoom: 18,
    // });
    // map.on("load", function() {
    //   that.init(map);
    // });
  },
  methods: {
    init(map) {
      map.addSource("lines", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                id: 1,
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [118.79, 32.06],
                  [118.81, 32.06],
                ],
              },
            },
            {
              type: "Feature",
              properties: {
                id: 2,
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [118.79, 32.06],
                  [118.79, 32.08],
                ],
              },
            },
            {
              type: "Feature",
              properties: {
                id: 3,
              },
              geometry: {
                type: "LineString",
                coordinates: [
                  [118.79, 32.06],
                  [118.81, 32.08],
                ],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: "linesLayer",
        type: "line",
        source: "lines",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "blue",
          "line-width": 5,
        },
      });
      // var a = map.queryRenderedFeatures({ layers: ["linesLayer"] });
      // var b =map.getLayer("linesLayer")
      // console.log(a,b);
      map.on("click", "linesLayer", function (e) {
        //变色
        var features = map.queryRenderedFeatures({ layers: ["linesLayer"] });
        console.log("features", features);
        var targetFeature = features.find(function (feature) {
          return feature.properties.id === 1;
        });
        if (targetFeature) {
          // map.setPaintProperty("linesLayer", "line-color", {
          //   property: "id",
          //   type: "categorical",
          //   stops: [[targetFeature.properties.id, "red"], [2, "red"]],
          // });
          map.setLayoutProperty("linesLayer", "line-cap", [
            "case",
            ["==", ["get", "id"], targetFeature.properties.id],
            "butt",
            "round",
          ]);
        }
      });
    },
  },
};
</script>
<style scoped>
#map {
  margin-top: 100px;
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
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