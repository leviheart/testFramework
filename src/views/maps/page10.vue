<template>
    <div id="app">
      <div v-for="thread in threads" :key="thread.id">
        <div class="timeline">
          <div
            v-for="(status, index) in thread.statuses.slice(-30)"
            :key="index"
            :style="{
              width: `${(1 / 30) * 100}%`,
              backgroundColor: status.color,
            }"
            @click="toggleDetails(thread.id, index)"
          >
            {{ status.name }}
          </div>
        </div>
        <div class="details">
          <div
            v-for="(status, index) in thread.statuses"
            :key="index + 'detail'"
            @click="toggleDetails(thread.id, index)"
          >
            {{ status.name }}
            <transition name="fade">
              <div v-if="thread.detailsVisible[index]">
                <!-- 显示详细信息 -->
                <p>{{ status.details }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        threads: [],
        currentTime: 0,
        timerId: null,
      };
    },
    methods: {
      fetchData() {
        this.currentTime++;
        const newData = this.generateMockData(this.currentTime);
        this.updateThreads(newData);
        this.pruneOldStatuses();
      },
      updateThreads(newData) {
        newData.forEach((thread) => {
          let existingThread = this.threads.find((t) => t.id === thread.id);
          if (!existingThread) {
            existingThread = {
              id: thread.id,
              statuses: [],
              detailsVisible: [],
            };
            this.threads.push(existingThread);
          }
          thread.statuses.forEach((status) => {
            if (status.time > existingThread.statuses.length) {
              // 补充缺失状态
              for (let i = existingThread.statuses.length; i < status.time; i++) {
                existingThread.statuses.push({ name: "停止", color: "#ccc" });
                existingThread.detailsVisible.push(false);
              }
            }
            existingThread.statuses.push(status);
            existingThread.detailsVisible.push(false);
          });
        });
      },
      pruneOldStatuses() {
        this.threads.forEach((thread) => {
          if (thread.statuses.length > 30) {
            thread.statuses.shift();
            thread.detailsVisible.shift();
          }
        });
      },
      toggleDetails(threadId, index) {
        const thread = this.threads.find((t) => t.id === threadId);
        thread.detailsVisible[index] = !thread.detailsVisible[index];
      },
      generateMockData(currentTime) {
        // 模拟数据生成逻辑
        return [
          { id: 1, statuses: [{ name: "运行", color: "green", time: currentTime, details: "正在运行..." }] },
          { id: 2, statuses: [{ name: "等待", color: "yellow", time: currentTime, details: "等待中..." }] },
          { id: 3, statuses: [{ name: "错误", color: "red", time: currentTime, details: "出现错误..." }] },
          { id: 4, statuses: [{ name: "暂停", color: "orange", time: currentTime, details: "暂停中..." }] },
          { id: 5, statuses: [{ name: "完成", color: "blue", time: currentTime, details: "已完成..." }] },
          { id: 6, statuses: [{ name: "运行", color: "green", time: currentTime, details: "正在运行..." }] },
        ];
      },
    },
    mounted() {
      this.timerId = setInterval(this.fetchData, 1000); // 每秒请求数据
    },
    beforeDestroy() {
      clearInterval(this.timerId); // 组件销毁时清除定时器
    },
  };
  </script>
  
  <style scoped>
  .timeline div {
    display: inline-block;
    cursor: pointer;
  }
  
  .details .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .details .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
<!-- 需求：
          1、如视频所示，有多个线程，线程内有多种状态（6种状态 6种颜色区别）；每个线程内的状态点击有手风琴效果，展示详情信息
          2、初始时：线程内是没有状态的，每秒请求一次后台，获取线程和相应的状态；
          3、如果进入页面获取到5个线程，无论在后续的请求返回中，有没有该线程都需要往线程中添加状态，没有返回则添加 停止状态（灰色）；有则添加对应状态。
          4、如果进入页面没有这个线程，在第5s请求来一个新线程，则需要将该线程前4s 添加 停止状态（灰色） 以对应时间；
          5、每个页面内线程上显示的秒数 需动态设置，如：按30s ，展示，每个线程的宽度/30 就是每个状态需要展示的宽度；
          6、接第5点，显示30s, 第31s状态和线程来时，则需要将第一秒删除
          7、前端模拟json用于每s请求
          8、使用vue框架
          9、时间 越快越好；每月绩效考评会参考，尤其是不在我组内的（不了解工作情况，以此摸底）；
       -->
