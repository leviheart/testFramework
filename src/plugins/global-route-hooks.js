export default {
  install(Vue, options) {
    const pagesToOperate = options.pagesToOperate;
    Vue.mixin({
      beforeRouteEnter(to, from, next) {
        console.log(to, from);
        if (pagesToOperate.includes(to.name)) {
          next((vm) => {
            // 在这里可以访问组件实例 vm
            // 也可以访问组件内的 DOM 元素 vm.$el
            // 进行需要的操作
            vm.$nextTick(() => {
              if (window.tpmap) {
                for (let i = 1; i <= 6; i++) {
                  const mapContainer = document.getElementById(`map${i}`);
                  mapContainer?.appendChild(window.tpmap.getCanvas());
                }
              } else {
                vm.init();
              }
            });
          });
        } else {
          next();
        }
      },
      beforeRouteLeave(to, from, next) {
        if (pagesToOperate.includes(from.name)) {
          // 获取之前页面中的地图容器
          if (window.tpmap && window.tpmap.getCanvas()) {
            // 获取 canvas 元素
            const canvas = window.tpmap.getCanvas();

            // 获取 canvas 的父元素，即地图容器
            const parent = canvas.parentNode;

            // 从父元素中移除 canvas 元素
            parent.removeChild(canvas);
            // 解绑地图事件
            window.tpmap.off();
            console.log("llllllllllllllll");
          }
        }
        next();
      },
    });
  },
};
