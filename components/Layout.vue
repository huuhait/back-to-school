<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style lang="less">
.layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 100vh;
  font-family: URWDIN-Regular,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-weight: 400;
  &, * {
    box-sizing: border-box;
  }
}
</style>
