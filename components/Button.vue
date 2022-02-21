<script setup lang="ts">
import type { ButtonHTMLAttributes } from '@vue/runtime-dom'

defineProps<{
  type?: ButtonHTMLAttributes['type']
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button :type="type" class="button" @click="emit('click', $event)">
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
