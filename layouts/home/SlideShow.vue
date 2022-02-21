<script setup lang="ts">
import { usePublicStore } from '~/stores/public'

const publicStore = usePublicStore()
</script>

<template>
  <Swiper
    class="slide-show"
    :options="{
      slidesPerView: 1,
      loop: true,
    }"
  >
    <SwiperSlide v-for="slide in publicStore.slideshow" :key="slide.id">
      <img :src="slide.image">
    </SwiperSlide>
  </Swiper>
</template>

<style lang="less">
.slide-show {
  img {
    width: 100%;
  }
}
</style>
