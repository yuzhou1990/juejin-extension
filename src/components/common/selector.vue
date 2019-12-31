<template>
  <div
    class="selector"
    :class="{'active':isActive}"
    @blur="isActive=false"
    @click="isActive=!isActive"
  >
    <div class="title">{{title}}</div>
    <div class="arrow">
      <i :class="arrow_class"></i>
    </div>
    <ul class="list">
      <li
        class="item"
        :class="{'active':selected===item.value}"
        v-for="(item,index) in list"
        :key="item.value"
        @click.stop="handleSelect(item)"
      >
        <span class="title">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isActive: false,
      selected: '',
      title: ''
    }
  },
  computed: {
    arrow_class() {
      return this.isActive ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    }
  },
  watch: {
    value(newValue) {
      this.selected = newValue
    },
    selected(newValue) {
      this.$emit('input', newValue)
    },
    list(newValue) {
      this.defaultSelected(newValue)
    },
    isActive(newValue) {
      if (newValue) {
        this.$parent.$emit('selector-multiple')
        this.isActive = true
      }
    }
  },
  mounted() {
    this.defaultSelected(this.list)
  },
  methods: {
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
      } else {
        this.title = ''
        this.selected = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selector {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 8rem;
  height: 2.5rem;
  border-radius: 2px;
  color: #646c7b;
  background-color: #f8f9fb;
  cursor: pointer;
  margin-right: 0.8rem;
  .title {
    -ms-flex-positive: 1;
    flex-grow: 1;
    margin: 0 0 0 1rem;
    opacity: 0.8;
  }
  .arrow {
    flex-basis: 2.5rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #f8f9fb;
    box-shadow: 0 1px 2px 0 rgba(34, 42, 48, 0.1);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    z-index: 750;
    overflow: hidden;
    display: none;
    .item {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      height: 2.5rem;
      .title {
        margin: 0 0 0 1rem;
      }
    }
    .item.active {
      color: #646c7b;
      background-color: #e9f3fd;
    }
    .item:hover {
      color: #fff;
      background-color: #007fff;
      .title {
        opacity: 1;
      }
    }
  }
}
.selector.active .list {
  display: block;
}
</style>