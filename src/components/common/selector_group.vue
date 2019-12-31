<template>
  <div class="selector-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide: {
    multiple: true
  },
  mounted() {
    this.$on('selector-multiple', () => {
      console.log('on multiple')

      this.$children.forEach(c => (c.isActive = false))
    })
  }
}
</script>

<style lang="scss" scoped>
.selector-box {
  display: flex;
  flex-direction: row;
}
</style>