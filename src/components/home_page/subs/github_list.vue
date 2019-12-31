<template>
  <ul
    class="list"
    v-infinite-scroll="load"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance="50"
    infinite-scroll-immediate="false"
  >
    <GithubItem v-for="(item,index) in list" :item="item" :key="index+item.id" />
    <ListAttention :loading="loading" :no_more="no_more" />
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import GithubItem from './github_item'
import ListAttention from '@/components/common/list_attention'
export default {
  components: {
    GithubItem,
    ListAttention
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('resources', {
      list: state => state.github
    }),
    no_more() {
      return this.list.length % 30 > 0
    },
    disabled() {
      return this.loading || this.no_more
    }
  },
  methods: {
    load() {
      this.loading = true
      this.$store.dispatch('resources/fetchGithub').then(more => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  height: auto;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  background-color: rgba($color: #000000, $alpha: 0);
}
/*定义滚动条轨道内阴影+圆角*/
::-webkit-scrollbar-track {
  background-color: rgba($color: #000000, $alpha: 0);
}
/*定义滑块内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba($color: #000000, $alpha: 0.05);
}
</style>