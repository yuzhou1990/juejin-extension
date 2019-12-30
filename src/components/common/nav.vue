<template>
  <nav class="navbar">
    <div>
      <slot name="left"></slot>
    </div>
    <div class="navbar-main">
      <slot></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar {
  min-height: 3.5rem;
  background-color: #fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
  -ms-flex-align: center;
  margin-bottom: 1.2rem;
}
.navbar-main {
  flex: 1;
}
</style>