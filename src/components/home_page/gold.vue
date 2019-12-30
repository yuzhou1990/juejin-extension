<template>
  <div class="gold">
    <Nav>
      <template #left>
        <Source></Source>
      </template>
      <template>
        <Selector :list="gold_category_list" v-model="gold_category"></Selector>
      </template>
    </Nav>
    <Main></Main>
  </div>
</template>

<script>
import Nav from '@/components/common/nav'
import Source from '@/components/common/source'
import Selector from '@/components/common/selector'
import Main from './subs/gold_list'
export default {
  components: {
    Nav,
    Source,
    Selector,
    Main
  },
  data() {
    return {
      gold_category_list: [
        {
          title: '首页',
          value: 'all'
        },
        {
          title: '前端',
          value: 'frontend'
        }
      ]
    }
  },
  computed: {
    gold_category: {
      get() {
        return this.$store.state.resources.gold_category
      },
      set(value) {
        if (this.$store.state.resources.gold_category) {
          this.$store.commit('resources/set_gold_category', value)
          this.$store.dispatch('resources/fetchGold')
        } else {
          this.$store.commit('resources/set_gold_category', value)
        }
      }
    }
  }
  // asyncData({ store }) {
  //   return store.dispatch('resources/fetchGold')
  // },
  // mounted() {
  //   this.$store.dispatch('resources/fetchGold')
  // }
}
</script>

<style lang="scss" scoped>
.gold {
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 33.97rem;
  display: flex;
  flex-direction: column;
}
</style>