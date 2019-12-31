<template>
  <div class="source">
    <div v-if="title" class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.source {
  color: rgb(0, 0, 0);
  position: relative;
  height: 100%;
  font-size: 1.35rem;
  font-family: Verdana, Geneva, Microsoft YaHei, Microsoft JhengHei,
    Helvetica Neue, sans-serif;
}
.title {
  margin: 0 1rem;
}
</style>