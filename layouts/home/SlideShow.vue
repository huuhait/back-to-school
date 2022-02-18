<template>
  <Swiper
    class="slide-show"
    :options="{
      slidesPerView: 1,
      loop: true,
    }"
  >
    <SwiperSlide>
      <img src="~/assets/img/slide-bg-1.jpg">
    </SwiperSlide>
    <SwiperSlide>
      <img src="~/assets/img/slide-bg-1.jpg">
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
