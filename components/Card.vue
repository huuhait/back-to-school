<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="less">
@border-color: #e9e9e9;

.card {
  position: relative;
  background-color: #fff;
  border: 1px solid @border-color;
  padding: 24px 12px;
}
</style>
