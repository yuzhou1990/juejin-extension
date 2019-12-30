<template>
  <div class="layout">
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eceff1;
  overflow: hidden;
}
</style>
