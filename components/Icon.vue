<script setup lang="ts">
defineProps<{
  type: string
}>()
const emit = defineEmits(['click'])
</script>

<template>
  <i :class="`z-icon-${type}`" @click="event => emit('click', event)" />
</template>
