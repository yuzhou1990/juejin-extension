<template>
  <div></div>
</template>

<script>
export default {
  asyncData({ store }) {
    return store.dispatch('resources/fetchGold')
  },
  mounted() {
    this.$store.dispatch('resources/fetchGold')
  }
}
</script>

<style lang="scss" scoped>
h1 {
  background: antiquewhite;
}
</style>