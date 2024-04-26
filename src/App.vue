<template>
  <div id="apptop">
    <el-menu :default-active="$route.path" mode="horizontal" router>
      <el-menu-item index="/">Measure</el-menu-item>
      <el-menu-item index="/maps/page1?key1=1">Page 1</el-menu-item>
      <el-menu-item index="/maps/page2">Page 2</el-menu-item>
      <el-menu-item index="/leftTree">leftTree</el-menu-item>
      <el-menu-item index="/maps/page4">Page 4</el-menu-item>
      <el-menu-item index="/maps/page5">Page 5</el-menu-item>
      <el-menu-item index="/maps/page6">Page 6</el-menu-item>
      <el-menu-item index="/maps/page7">Page 7</el-menu-item>
      <el-menu-item index="/scroll">scroll</el-menu-item>
      <el-menu-item index="/AmapProject">AmapProject</el-menu-item>
      <el-menu-item index="/componentInput">componentInput</el-menu-item>
      <el-menu-item index="/DeepCopy">DeepCopy</el-menu-item>
      <el-menu-item index="/descriptions">descriptions</el-menu-item>
      <el-menu-item index="/HelloWorld">HelloWorld</el-menu-item>
      <el-menu-item index="/Label">Label</el-menu-item>
      <el-menu-item index="/Three">Three</el-menu-item>
      <el-menu-item index="/VtkState">VtkState</el-menu-item>
      <el-menu-item index="/mySharderCom">mySharderCom</el-menu-item>
    </el-menu>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss"></style>
