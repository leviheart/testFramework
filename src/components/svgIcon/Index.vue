<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    // 定义iconClass属性，类型为String，必填
    iconClass: {
      type: String,
      required: true,
    },
    // 定义className属性，类型为String，默认为空
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 根据iconClass属性生成iconName
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    // 根据className属性生成svgClass
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
