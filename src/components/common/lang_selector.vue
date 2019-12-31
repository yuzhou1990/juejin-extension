<template>
  <div class="lang-selector" :class="{'active':isActive}">
    <div class="curr" @click="isActive=!isActive">
      <div class="title">{{title}}</div>
      <div class="arrow">
        <i :class="arrow_class"></i>
      </div>
    </div>
    <div class="lang-panel">
      <div class="filter-field-holder">
        <input
          :value="keyword"
          @input="handleInput"
          type="text"
          placeholder="筛选语言"
          class="filter-field"
        />
      </div>
      <ul class="lang-list">
        <li
          class="lang-item"
          :class="{'selected':highlight===item.value}"
          v-for="(item,index) in filterHots"
          :key="item.value"
          @click.stop="handleSelect(item)"
          @mouseover="highlight=item.value"
        >{{item.title}}</li>
        <li class="divider"></li>
        <li
          class="lang-item"
          :class="{'selected':highlight===item.value}"
          v-for="(item,index) in filterAll"
          :key="item.value"
          @click.stop="handleSelect(item)"
          @mouseover="highlight=item.value"
        >{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    hots: {
      type: Array,
      default: []
    },
    all: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isActive: false,
      selected: '',
      highlight: '',
      title: '',
      keyword: ''
    }
  },
  computed: {
    arrow_class() {
      return this.isActive ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },
    filterHots() {
      return this.hots.filter(
        ele => ele.title.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
      )
    },
    filterAll() {
      return this.all.filter(
        ele => ele.title.toLowerCase().indexOf(this.keyword.toLowerCase()) > -1
      )
    }
  },
  watch: {
    value(newValue) {
      this.selected = newValue
    },
    selected(newValue) {
      this.$emit('input', newValue)
    },
    hots(newValue) {
      this.defaultSelected(newValue)
    },
    isActive(newValue) {
      if (newValue) {
        this.keyword = ''
        this.highlight = this.hots[0].value
      }
    }
  },
  mounted() {
    this.defaultSelected(this.hots)
  },
  methods: {
    handleInput({ target }) {
      this.keyword = target.value
      this.highlight = this.filterHots[0].value || this.filterAll[0].value
    },
    handleSelect({ title, value }) {
      this.selected = value
      this.title = title
      this.isActive = false
    },
    defaultSelected(list) {
      if (list.length) {
        const { title, value } = list[0]
        this.title = title
        this.selected = value
        this.highlight = value
      } else {
        this.title = ''
        this.selected = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-selector {
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  margin-left: 0.5rem;
  height: 3.5rem;
  font-size: 1.15rem;
  color: #646c7b;
  &:hover {
    .title {
      opacity: 1;
    }
  }
  .curr {
    height: 100%;
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .title {
    margin: 0 0.5rem;
    opacity: 0.8;
  }
  .arrow {
    margin: 0 0.8rem 0 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #000;
  }
  .lang-panel {
    position: absolute;
    top: 100%;
    right: 0;
    width: 20rem;
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 1px 2px 0 rgba(34, 42, 48, 0.1);
    overflow: hidden;
    display: none;
    z-index: 999;
    .filter-field-holder {
      border-bottom: 1px solid #e6edf4;
      .filter-field {
        padding: 1rem 1.5rem;
        width: 100%;
        font-size: 1.15rem;
        border: none;
        outline: 0;
      }
    }
    .lang-list {
      max-height: 30rem;
      overflow-y: auto;
    }
    .divider {
      height: 0;
      border-bottom: 1px solid #e6edf4;
    }
    .lang-item {
      padding: 1rem 1.5rem;
      cursor: pointer;
      &.selected {
        color: #fff;
        background-color: #007fff;
      }
    }
  }
}
.lang-selector.active .lang-panel {
  display: flex;
  flex-direction: column;
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