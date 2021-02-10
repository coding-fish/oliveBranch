<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    // 每次刷新之后初始化用户信息
    this.$store.commit('initUser')
  }
}
</script>
<style lang="scss">
</style>
