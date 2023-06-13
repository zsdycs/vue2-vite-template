<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #090a0a;
}

[v-cloak] {
  display: none;
}
</style>
