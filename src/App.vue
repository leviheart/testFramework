<template>
  <div id="apptop">
    <!-- <el-menu :default-active="$route.path" mode="horizontal" router>
      <el-menu-item index="/">Measure</el-menu-item>
      <el-menu-item index="/maps/page1?key1=1">Page 1</el-menu-item>
      <el-menu-item index="/maps/page2">Page 2</el-menu-item>
      <el-menu-item index="/maps/page3">Page 3</el-menu-item>
      <el-menu-item index="/maps/page4">Page 4</el-menu-item>
      <el-menu-item index="/maps/page5">Page 5</el-menu-item>
      <el-menu-item index="/maps/page6">Page 6</el-menu-item>
    </el-menu> -->

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
body {
  background: #ccc;
}
</style>
