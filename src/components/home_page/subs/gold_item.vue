<template>
  <li class="item">
    <a class="item-content" :href="item.url" target="_blank">
      <div class="badge" :title="'至少已有 '+item.collectionCount+' 人喜欢'">
        <i class="el-icon-caret-top"></i>
        <div class="text">{{item.collectionCount}}</div>
      </div>
      <div class="info">
        <div class="title" :title="item.title">{{item.title}}</div>
        <div class="meta">
          <div class="meta-list">
            <div class="meta-item">
              <span class="text">{{item.time}}</span>
            </div>
            <div class="meta-item" @click.stop="checkAuthor">
              <span class="text">{{item.user.username}}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    checkAuthor() {
      window.open(this.item.user.url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}
.item {
  cursor: pointer;
  .item-content {
    display: -ms-flexbox;
    display: flex;
    padding: 0.4rem 1.25rem 0.4rem 0.4rem;
    margin-bottom: 0.8rem;
    background-color: #fff;
    border-radius: 2px;
  }
  .badge {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 2.834rem;
    height: 3.667rem;
    border-radius: 2px;
    transition: all 0.2s ease;
    color: #e8f1ff;
    background-color: #007fff;
    overflow: hidden;
    .text {
      font-family: Helvetica Neue;
      font-size: 1rem;
      font-weight: 700;
    }
  }
  &:hover {
    .badge {
      color: #007fff;
      background-color: #e8f1ff;
    }
  }
}
.info {
  -ms-flex-positive: 1;
  flex-grow: 1;
  position: relative;
  margin-left: 1.2rem;
  height: 3.667rem;
  min-width: 0;
  cursor: pointer;
  .title {
    max-width: 100%;
    font-size: 1.25rem;
    line-height: 1.8;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .meta {
    display: -ms-flexbox;
    display: flex;
    font-size: 1rem;
    line-height: 1;
    color: #c2c5cd;
    white-space: nowrap;
    opacity: 0.8;
    .meta-list {
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      display: -ms-flexbox;
      display: flex;
      padding: 0;
      min-width: 0;
      overflow: hidden;
      .meta-item {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        margin-right: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>