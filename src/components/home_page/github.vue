<template>
  <div class="gitbub">
    <Nav>
      <template #left>
        <Source title="Github"></Source>
      </template>
      <template>
        <Selector :list="github_category_list" v-model="github_category"></Selector>
        <Selector :list="period_list" v-model="github_period"></Selector>
      </template>
      <template #right>
        <LangSelector :hots="lang_hots" :all="lang_all" v-model="github_lang"></LangSelector>
      </template>
    </Nav>
    <Main></Main>
  </div>
</template>

<script>
import Nav from '@/components/common/nav'
import Source from '@/components/common/source'
import Selector from '@/components/common/selector'
import LangSelector from '@/components/common/lang_selector'
import Main from './subs/github_list'
export default {
  components: {
    Nav,
    Source,
    Selector,
    LangSelector,
    Main
  },
  data() {
    return {
      github_category_list: [
        {
          title: '热门',
          value: 'trending'
        },
        {
          title: '新生',
          value: 'upcome'
        }
      ],
      period_list: [
        {
          title: '今日',
          value: 'day'
        },
        {
          title: '本周',
          value: 'week'
        },
        {
          title: '本月',
          value: 'month'
        }
      ],
      lang_hots: [
        {
          title: 'JavaScript',
          value: 'javascript'
        },
        {
          title: 'CSS',
          value: 'css'
        },
        {
          title: 'HTML',
          value: 'html'
        },
        {
          title: 'TypeScript',
          value: 'typescript'
        },
        {
          title: 'Vue',
          value: 'vue'
        }
      ],
      lang_all: [
        {
          title: '所有语言',
          value: 'all'
        },
        {
          title: 'C',
          value: 'c'
        },
        {
          title: 'C#',
          value: 'csharp'
        },
        {
          title: 'Nginx',
          value: 'nginx'
        },
        {
          title: 'Java',
          value: 'java'
        }
      ]
    }
  },
  computed: {
    github_category: {
      get() {
        return this.$store.state.resources.github_category
      },
      set(value) {
        this.$store.commit('resources/set_github_category', value)
        this.$store.dispatch('resources/fetchGithub')
      }
    },
    github_period: {
      get() {
        return this.$store.state.resources.github_period
      },
      set(value) {
        this.$store.commit('resources/set_github_period', value)
        this.$store.dispatch('resources/fetchGithub')
      }
    },
    github_lang: {
      get() {
        return this.$store.state.resources.github_lang
      },
      set(value) {
        this.$store.commit('resources/set_github_lang', value)
        this.$store.dispatch('resources/fetchGithub')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gold {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}
</style>