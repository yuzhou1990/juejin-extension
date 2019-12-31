<template>
  <div class="main">
    <Gold class="source"></Gold>
    <Github class="source other-source"></Github>
  </div>
</template>

<script>
import Gold from '@/components/home_page/gold'
import Github from '@/components/home_page/github'
export default {
  components: {
    Gold,
    Github
  },
  asyncData({ store }) {
    return store
      .dispatch('resources/fetchGold')
      .then(() => store.dispatch('resources/fetchGithub'))
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
.source {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &.other-source {
    flex: 1 1 auto;
    margin-left: 1.2rem;
  }
}
</style>