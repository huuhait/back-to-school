<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="less">
.button {
  background-color: @primary-color;
  color: #fff;
  transition: all 0.3s;

  &:hover {
    background-color: #a1785c;
  }
}
</style>
