<template>
  <div>
    <div id="map"></div>
    <button id="startButton">开始动画</button>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "MapBoxAnime",
  data() {
    return {};
  },
  mounted() {
    // 初始化Mapbox地图
    mapboxgl.accessToken = `pk.eyJ1IjoibHVrYXNtYXJ0aW5lbGxpIiwiYSI6ImNpem85dmhwazAyajIyd284dGxhN2VxYnYifQ.HQCmyhEXZUTz3S98FMrVAQ`;
    const map = new mapboxgl.Map({
      container: "map", // 对应于模板中的<div id="map">的容器
      style: "mapbox://styles/mapbox/streets-v11", // 使用默认样式，也可以替换为自定义样式URL
      center: [119, 34],
      zoom: 9,
    });
    this.init(map);
  },
  methods: {
    init(map) {
      // 轨迹数据
      const trackData = [
        [119.0, 34.0],
        // [119.2, 34.1],
        // [119.4, 34.2],
        [119.8, 34.4],
        [112.16, 34.8],
        [113.32, 35.16],
        [114.64, 36.32],
        // 更多坐标...
      ];
      // 自定义函数，用于比较两个坐标数组是否相等
      function areCoordinatesEqual(coord1, coord2) {
        return JSON.stringify(coord1) === JSON.stringify(coord2);
      }

      // 使用Turf.js along 方法计算每段路线上的多个点
      const interpolatedTrackData = trackData.reduce((acc, coord, i) => {
        if (i === 0) {
          acc.push(coord);
        } else {
          const line = turf.lineString([acc[acc.length - 1], coord]);
          let distance = 0;
          let lastPoint = line.geometry.coordinates[0];
          while (distance < turf.length(line)) {
            const nextPoint = turf.along(line, distance);
            acc.push(nextPoint.geometry.coordinates);
            distance += 1;
            lastPoint = nextPoint.geometry.coordinates;
          }
          // 添加线段的最后一个点
          if (
            !areCoordinatesEqual(
              turf.along(line, distance).geometry.coordinates,
              lastPoint
            )
          ) {
            acc.push(coord);
          }
        }
        return acc;
      }, []);
      console.log(interpolatedTrackData);
      // 在地图加载完成后执行
      map.on("load", () => {
        // 添加轨迹数据源
        map.addSource("track", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: interpolatedTrackData,
            },
          },
        });

        // 添加轨迹图层
        map.addLayer({
          id: "track-layer",
          source: "track",
          type: "line",
          layout: {},
          paint: {
            "line-color": "#0A0",
            "line-width": 3,
            "line-opacity": 0.5,
          },
        });

        // 加载车辆图标
        let imageUrl = require('@/assets/image/骑车.jpg');
        map.loadImage(imageUrl, function(error, image) {
          map.addImage("ride", image);
        });
        let vehiclePosition = interpolatedTrackData[0];

        // 添加车辆数据源
        map.addSource("vehicle", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: vehiclePosition,
            },
          },
        });

        // 添加车辆图层
        map.addLayer({
          id: "vehicle-layer",
          source: "vehicle",
          type: "symbol",
          layout: {
            "icon-image": "ride",
            "icon-size": 0.5,
            "icon-rotate": ["get", "bearing"],
            "icon-rotation-alignment": "map",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
        });
        map.setLayoutProperty("vehicle-layer", "icon-rotate", 103);
        let animationRequestId = null;
        let startTime = 0; // 用于记录动画开始的时间
        let animationIndex = 0;
        let totalTime = 170000; // 总动画时间，例如5秒
        let isAnimationRunning = false;
        const animateVehicle = (timestamp = performance.now()) => {
          if (isAnimationRunning) {
            if (startTime === 0) {
              startTime = timestamp; // 如果是第一次调用，设置初始时间戳
            }

            // 计算自动画开始以来经过的时间
            const elapsed = timestamp - startTime;

            // 根据总动画时间和当前时间计算动画进度
            const progress = Math.min(Number(elapsed) / totalTime, 1);

            // 计算当前应处于的点位置
            const pointIndex = Math.min(
              Math.floor(progress * (interpolatedTrackData.length - 1)),
              interpolatedTrackData.length - 2
            );
            // 如果点索引发生变化，更新车辆位置和旋转角度
            if (pointIndex !== animationIndex) {
              const nextPosition = interpolatedTrackData[pointIndex + 1];
              const bearing = turf.bearing(
                turf.point(vehiclePosition),
                turf.point(nextPosition)
              );
              // 更新车辆位置和旋转角度
              map.getSource("vehicle").setData({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: nextPosition,
                },
              });
              map.setLayoutProperty(
                "vehicle-layer",
                "icon-rotate",
                bearing + 44
              );
              vehiclePosition = nextPosition;
              animationIndex = pointIndex;
            }

            // 如果动画没有完成，请求下一帧
            if (elapsed < totalTime) {
              animationRequestId = requestAnimationFrame(animateVehicle);
            }
          }
        };

        // 添加按钮点击事件监听器
        document.getElementById("startButton").addEventListener("click", () => {
          if (!isAnimationRunning) {
            isAnimationRunning = true;
            startTime = 0; // 重置开始时间
            animationIndex = 0;
            animateVehicle(); // 开始动画
          } else {
            isAnimationRunning = false;
            cancelAnimationFrame(animationRequestId); // 停止动画
            map.getSource("vehicle").setData({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: interpolatedTrackData[0],
              },
            });
            map.setLayoutProperty("vehicle-layer", "icon-rotate", 103);
          }
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#map {
  position: absolute;
  top: 200px;
  bottom: 0;
  width: 100%;
}
.mapboxgl-ctrl {
  display: none !important;
}
#startButton {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 1;
      }
</style>
