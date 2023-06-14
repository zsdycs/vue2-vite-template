<template>
  <div class="home">
    <h3>home page</h3>

    <el-button
      @click="
        $router.push({
          name: 'examplePage',
          query: {},
        })
      "
      >to examplePage</el-button
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
.home {
  color: #ffffff;
}
</style>
