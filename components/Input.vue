<script setup lang="ts">
defineProps<{
  placeholder?: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <input :placeholder="placeholder" @input="($event) => emit('update:modelValue', ($event?.target as any).value)">
  </div>
</template>

<style lang="less">
.input {
  input {
    width: 100%;
    height: 100%;
    padding: 0 8px;
  }
}
</style>
