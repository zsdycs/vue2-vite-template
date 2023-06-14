<template>
  <div class="example">
    <h3>example page</h3>
    <el-button
      @click="
        $router.push({
          name: 'homePage',
          query: {},
        })
      "
      >to homePage</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.example {
  color: #ffffff;
}
</style>
