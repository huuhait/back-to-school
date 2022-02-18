<script setup lang="ts">
defineProps<{
  isRouterLink?: boolean
  to?: string
  selected: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <NuxtLink v-if="isRouterLink && to" :to="to" :class="['table-row']">
    <slot />
  </NuxtLink>
  <div v-else :class="['table-row']">
    <slot />
  </div>
</template>
