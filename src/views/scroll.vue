<template>
  <div>
    <div class="container">
      <div class="row" v-for="(group, index) in displayedGroups" :key="index">
        <div v-for="(item, innerIndex) in group" :key="innerIndex">
          {{ item }}
        </div>
      </div>
    </div>
    <!-- <button v-if="showDropdownButton" @click="toggleDropdown">
      {{ dropdownOpen ? "收起" : "展开" }}
    </button> -->
    <svg-icon
      className="svg-icon-18"
      :iconClass="dropdownOpen ? 'email' : 'phone'"
      @click="toggleDropdown"
    ></svg-icon>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.row {
  display: flex;
  width: 100%;
}
.row > div {
  flex: 1 1 50%; /* 每行显示两个元素 */
}
</style>
<script>
export default {
  data() {
    return {
      items: [], // 存储下拉菜单的所有元素
      displayedGroups: [], // 存储要显示的分组
      dropdownOpen: false, // 标记下拉菜单是否展开
    };
  },
  computed: {
    showDropdownButton() {
      return this.items.length > 2; // 根据下拉菜单元素数量判断是否显示按钮
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
      if (this.dropdownOpen) {
        this.displayedGroups = [...this.groupedItems]; // 展开时显示所有分组
      } else {
        this.displayedGroups = this.groupedItems.slice(0, 1); // 收起时只显示第一行分组
      }
    },
  },
  destroyed() {
    console.log("Component destroyed");
  },
  beforeDestroy() {
    console.log("Component beforeDestroy");
  },
  activated() {
    console.log("Component activated");
  },
  deactivated() {
    console.log("Component deactivated");
  },
  mounted() {
    console.log("Component mounted");
    // 通过异步请求或其他方式获取下拉菜单的元素数据，并将数据存储在items数组中
    // 示例数据:
    this.items = ["元素1", "元素2", "元素3", "元素4", "元素5", "元素6"];
    // 分组处理数据
    this.groupedItems = this.items.reduce((result, item, index) => {
      if (index % 2 === 0) {
        result.push([item]);
      } else {
        result[Math.floor(index / 2)].push(item);
      }
      return result;
    }, []);
    this.displayedGroups = this.groupedItems.slice(0, 1); // 默认只显示第一行分组
  },
};
</script>
