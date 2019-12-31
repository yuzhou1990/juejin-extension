<template>
  <li class="item-row">
    <div class="item-box">
      <div class="item" @click="checkUrl">
        <div class="repo-content">
          <div class="repo-header">
            <h2 class="title">
              <a :href="item.url" target="_blank" class="title-text">
                <span class="author">{{item.username}}</span>
                <span class="divider">/</span>
                <span class="name">{{item.reponame}}</span>
              </a>
            </h2>
          </div>
          <div class="repo-desc">
            <div
              class="desc"
              :title="item.description"
            >{{item.description||'No description provided.'}}</div>
          </div>
          <div class="repo-meta">
            <span class="star">
              <i class="el-icon-star-on"></i>
              {{item.starCount}}
            </span>
            <span class="fork">
              <i class="el-icon-s-operation"></i>
              {{item.forkCount}}
            </span>
            <span class="lang">
              <i class="el-icon-s-opportunity" :style="{'color':item.langColor}"></i>
              {{item.lang}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    checkUrl() {
      window.open(this.item.url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.item-row {
  position: relative;
  margin: 0 0.8rem 0.8rem 0;
  width: calc((100% - 0.8rem * 1) / 2);
  &:nth-child(2n) {
    margin-right: 0;
  }
  .item-box {
    position: relative;
    border-radius: 2px;
    background-color: #fff;
    .item {
      display: -ms-flexbox;
      display: flex;
      position: relative;
      padding: 24px 30px;
      font-family: PingFang SC, -apple-system, Arial, Microsoft YaHei,
        Microsoft JhengHei, Helvetica Neue, sans-serif;
      box-sizing: border-box;
      cursor: pointer;
      .repo-content {
        -ms-flex-positive: 1;
        flex-grow: 1;
        width: 0;
        overflow: hidden;
        .repo-header {
          margin-bottom: 8px;
          .title {
            display: -ms-flexbox;
            display: flex;
            margin: 0;
            padding: 0;
            font-size: 1.334rem;
            font-weight: 600;
            line-height: 1.2;
            color: #0366d6;
            overflow: hidden;
            margin-right: 20px;
            .title-text {
              color: inherit;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .repo-desc {
          color: #2e3135;
          font-size: 14px;
          line-height: 20px;
          height: 60px;
          margin-right: 20px;
          color: #333;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .repo-meta {
          margin-top: 15px;
          font-size: 1.167rem;
          font-weight: 700;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          > span:not(:last-child) {
            margin-right: 25px;
          }
        }
      }
    }
  }
}
</style>