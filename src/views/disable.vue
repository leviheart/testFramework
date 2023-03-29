<template>
  <div :disabled="isDisabled" @click="handleClick">
    Click me
  </div>
</template>

<script>
export default {
  data() {
    return {
      condition: true,
    };
  },
  computed: {
    isDisabled() {
      return this.condition;
    },
  },
  methods: {
    handleClick() {
      console.log("Clicked");
    },
  },
};
</script>
