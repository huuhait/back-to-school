<script setup lang="ts">
const products = useState('products')
</script>

<template>
  <Container class="sale-products mt-10">
    <div class="bold-text text-3xl">
      Sản phẩm giảm giá
    </div>
    <div class="sale-products-content">
      <Swiper
        class="slide-show"
        :options="{
          slidesPerView: 4,
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
.sale-products-content {
  display: flex;
  margin: 0 -12px;

  .product-item {
    padding: 0 12px;
    margin-top: 20px;
  }
}
</style>
