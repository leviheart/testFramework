/**
 * 动态加载options目录下所有以index.js结尾的模块，并合并它们的default导出对象
 * 
 * @returns {Object} 合并后的模块对象
 */
const modulesFiles = require.context("./options", true, /index.js$/); // 使用require.context动态加载符合条件的模块

let modules = {}; // 初始化一个空对象，用于存储加载的模块

// 遍历所有加载的模块，使用Object.assign动态合并至modules对象
modulesFiles.keys().forEach((item) => {
  modules = Object.assign({}, modules, modulesFiles(item).default);
});

export default modules; // 导出合并后的模块对象