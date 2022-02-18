<script setup lang="ts">
import type { SwiperOptions } from 'swiper'
import Swiper from 'swiper'
import 'swiper/css'

const props = defineProps<{
  options: SwiperOptions
}>()

const instance = getCurrentInstance()
let swiper: Swiper

onMounted(() => {
  swiper = new Swiper(instance?.proxy?.$el, {
    direction: 'horizontal',
    ...props.options,
  })
})

onBeforeUnmount(() => {
  swiper.destroy()
})
</script>

<template>
  <div class="swiper">
    <div class="swiper-wrapper swiper-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.swiper {
  &-wrapper {
    display: flex;
  }
}
</style>
