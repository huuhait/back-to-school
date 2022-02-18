<script setup lang="ts">
const products = useState('products', () => ([
  {
    id: 1,
    name: 'Đồng hồ giá rẻ 2k 1 cái',
    image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-01-300x300.png',
    price: '150000',
    discount: 0.2,
  },
]))
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
        <SwiperSlide v-for="(product, index) in [...products,...products,...products,...products]" :key="index">
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
