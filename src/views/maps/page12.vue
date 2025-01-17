<template>
    <div class="map-container">
      <!-- 添加坐标显示区域 -->
      <div class="coordinate-display">
        经度: {{ currentPosition.lng }} , 纬度: {{ currentPosition.lat }}
      </div>
      <div class="input-card">
        <h4 style="margin-bottom: 10px; font-weight: 600">利用mouseTool绘制覆盖物</h4>
        <el-button class="btn" @click="drawPolyline" style="margin-bottom: 5px">绘制线段</el-button> 
        <el-button class="btn" @click="drawPolygon" style="margin-bottom: 5px">绘制多边形</el-button> 
        <el-button class="btn" @click="drawRectangle" style="margin-bottom: 5px">绘制矩形</el-button> 
        <el-button class="btn" @click="drawCircle" style="margin-bottom: 5px">绘制圆形</el-button> 
       </div>
      <el-amap 
        vid="yangzhou" 
        :center="mapCenter"
        :zoom="mapZoom"
        :plugin="plugins"
        :events="events"
        class="amap-box"
      >
      </el-amap>
    </div>
  </template>
  
  <script>
  var mouseTool;
  export default {
    name: "Page12",
    data() {
      return {
        currentPosition: {
          lng: 119.421003,
          lat: 32.393159
        },
        mapCenter: [119.421003, 32.393159],
        mapZoom: 12,
        mapBounds: {
          southwest: [119.216, 32.243],  
          northeast: [119.626, 32.543]
        },
        plugins: [
          {
            pName: 'ToolBar',
            events: {
              init(instance) {
                console.log('工具条初始化成功');
              }
            }
          },
          {
            pName: 'Scale',
            events: {
              init(instance) {
                console.log('比例尺初始化成功');
              }
            }
          },
          {
            // 鼠标工具插件
            pName: 'MouseTool',
            events: {
              init(instance) {
                console.log('鼠标工具初始化成功');
              }
            }
          },
            {
                // 地图类型切换插件
                pName: 'MapType',
                events: {
                init(instance) {
                    console.log('地图类型切换插件初始化成功');
                }
                }
            }
        ],
        events: {
          // 添加mousemove事件监听
          mousemove: (e) => {
            // 更新当前坐标位置
            this.currentPosition = {
              lng: e.lnglat.getLng().toFixed(6),
              lat: e.lnglat.getLat().toFixed(6)
            }
          },
          init: (map) => {
            mouseTool = new AMap.MouseTool(map);
            mouseTool.on('draw', function(event) {
                console.log('绘制完成', event.obj.getPath());
            })
            this.setBoundary(map);
          }
        }
      }
    },
    methods: {
      setBoundary(map) {
        const bounds = new AMap.Bounds(
          new AMap.LngLat(this.mapBounds.southwest[0], this.mapBounds.southwest[1]),
          new AMap.LngLat(this.mapBounds.northeast[0], this.mapBounds.northeast[1])
        );
        map.setBounds(bounds);
        map.setLimitBounds(bounds);
      },
    drawPolyline () {
      mouseTool.polyline({
        strokeColor: "#3366FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [10, 5],
      })
    },

    drawPolygon () {
      mouseTool.polygon({
        strokeColor: "#FF33FF", 
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        // 线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [30,10],
      })
    },

    drawRectangle () {
      mouseTool.rectangle({
        strokeColor:'red',
        strokeOpacity:0.5,
        strokeWeight: 6,
        fillColor:'blue',
        fillOpacity:0.5,
        // strokeStyle还支持 solid
        strokeStyle: 'solid',
        // strokeDasharray: [30,10],
      })
    },

    drawCircle () {
      mouseTool.circle({
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillColor: '#1791fc',
        fillOpacity: 0.4,
        strokeStyle: 'solid',
        // 线样式还支持 'dashed'
        // strokeDasharray: [30,10],
      })
    },
    }
  }
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .coordinate-display {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100;
    background: rgba(255, 255, 255, 0.8);
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
  }
  .input-card{
    position: absolute;
    width: 200px;
    bottom: 10px;
    right: 10px;
    z-index: 100;
    background: rgba(255, 255, 255, 0.8);
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
  }
  .amap-box {
    width: 100%;
    height: calc(100vh - 121px);
  }
  </style>