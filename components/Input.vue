<script setup lang="ts">
defineProps<{
  placeholder?: string
  modelValue: string | number
  type?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <input :placeholder="placeholder" :value="modelValue" :type="type" @input="($event) => emit('update:modelValue', ($event?.target as any).value)">
  </div>
</template>

<style lang="less">
.input {
  line-height: 35px;

  input {
    width: 100%;
    height: 100%;
    padding: 0 8px;
  }
}
</style>
