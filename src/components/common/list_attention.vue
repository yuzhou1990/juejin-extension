<template>
  <div class="wrapper">
    <div v-if="loading" class="spinner">
      <div class="react-1"></div>
      <div class="react-2"></div>
      <div class="react-3"></div>
      <div class="react-4"></div>
      <div class="react-5"></div>
    </div>
    <div v-if="no_more" class="attention">
      <span>已显示全部内容</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading', 'no_more']
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
.spinner {
  padding: 2rem 0;
  width: 100%;
  height: 5rem;
  text-align: center;
  div {
    display: inline-block;
    margin: 0 3px;
    height: 100%;
    width: 4px;
    background-color: rgba(0, 0, 0, 0.15);
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    &.react-2 {
      animation-delay: -1.1s;
    }
    &.react-3 {
      animation-delay: -1s;
    }
    &.react-4 {
      animation-delay: -0.9s;
    }
    &.react-5 {
      animation-delay: -0.8s;
    }
  }
}
@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
.attention {
  width: 100%;
  height: 6rem;
  font-size: 1.2rem;
  line-height: 5rem;
  letter-spacing: 0;
  text-align: center;
  color: #c2c5cd;
  span {
    position: relative;
    line-height: 2rem;
  }
  span:before,
  span:after {
    content: '';
    position: absolute;
    height: 2px;
    width: 2.5rem;
    top: 0.75rem;
    background-color: #c2c5cd;
  }
  span:before {
    left: -3rem;
  }
  span:after {
    right: -3rem;
  }
}
</style>