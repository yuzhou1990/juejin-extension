<template>
  <div class="main">
    <Gold></Gold>
  </div>
</template>

<script>
import Gold from '@/components/home_page/gold'
export default {
  components: {
    Gold
  }
}
</script>

<style lang="scss" scoped>
.main {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  margin: 1.8rem 1.2rem 0 1.8rem;
  overflow: hidden;
}
</style>