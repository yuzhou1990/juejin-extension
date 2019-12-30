<template>
  <div class="scroll-area">
    <ul
      class="list"
      :class="{'no-more':no_more}"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="20"
    >
      <GoldItem v-for="(item,index) in list" :item="item" :key="index+item.id" />
      <ListAttention :loading="loading" :no_more="no_more" />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GoldItem from './gold_item'
import ListAttention from '@/components/common/list_attention'
export default {
  components: {
    GoldItem,
    ListAttention
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('resources', {
      list: state => state.gold
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
      this.$store.dispatch('resources/fetchGold').then(more => {
        this.loading = false
        console.log(this.list.length)
        console.log('load', this.no_more)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-area {
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.scroll-area::-webkit-scrollbar {
  width: 0;
}
.list {
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 6rem;
  &.no-more {
    padding-bottom: 0;
  }
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