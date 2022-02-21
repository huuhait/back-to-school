<script setup lang="ts">
import type { Product } from '~/types'

const { data: products } = useAsyncData('fetch_same_products', async() => {
  const { data } = await useBetterFetch<Product[]>('/products')

  return data
})
</script>

<template>
  <Container class="same-products mt-10">
    <div class="bold-text text-3xl">
      Sản phẩm giảm giá
    </div>
    <div class="same-products-content">
      <Swiper
        class="slide-show"
        :options="{
          slidesPerView: 5,
          loop: true,
        }"
      >
        <SwiperSlide v-for="(product, index) in products" :key="index">
          <ProductItem class="flex-1" :product="product" />
        </SwiperSlide>
      </Swiper>
    </div>
  </Container>
</template>

<style lang="less">
.same-products-content {
  display: flex;
  margin: 0 -12px;

  .product-item {
    padding: 0 12px;
    margin-top: 20px;
  }
}
</style>
