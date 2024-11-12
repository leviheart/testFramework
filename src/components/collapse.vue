<template>
    <div>
      <el-input v-model="searchQuery" placeholder="请输入查询内容" @input="handleSearch"></el-input>
      <el-scrollbar>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item v-for="(item, index) in items" :key="index" :name="index" :title="item.title">
            <div v-for="(child, childIndex) in item.children" :key="childIndex" :id="`child-item-${index}-${childIndex}`" v-html="highlightText(child.content)"></div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        activeNames: [0],
        items: []
      };
    },
    mounted() {
      // 初始化时，滚动到第一个匹配项
      setTimeout(() => {
        this.items = [
          {
            title: '父级1',
            children: [
              { content: '这是子级1-1的内容' },
              { content: '这是子级1-2的内容' }
            ]
          },
          {
            title: '父级2',
            children: [
              { content: '这是子级2-1的内容' },
              { content: '这是子级2-2的内容' }
            ]
          }
        ]
      }, 3000);
    },
    methods: {
      handleSearch() {
        this.activeNames = [];
        let found = false;
  
        this.items.forEach((item, index) => {
          if (item.children.some(child => child.content.includes(this.searchQuery))) {
            this.activeNames.push(index);
            if (!found) {
              const childIndex = item.children.findIndex(child => child.content.includes(this.searchQuery));
              this.scrollToItem(index, childIndex);
              found = true;
            }
          }
        });
      },
      highlightText(text) {
        if (!this.searchQuery) return text;
        const regex = new RegExp(this.searchQuery, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
      },
      scrollToItem(parentIndex, childIndex) {
        const element = document.getElementById(`child-item-${parentIndex}-${childIndex}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  </script>
  <style>
  .highlight {
    background-color: yellow;
  }
  </style>