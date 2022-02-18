<script setup lang="ts">
import ProductTypes from '~/layouts/danh-muc/ProductTypes.vue'

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
  <LayoutContent>
    <Container class="flex my-10">
      <ProductTypes class="mr-8" />

      <div class="grid grid-cols-4 gap-8">
        <ProductItem v-for="(product, index) of [...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products]" :key="index" :product="product" />
      </div>
    </Container>
  </LayoutContent>
</template>

<style lang="less">
.page-danh-muc {
  .product-types {
    width: 300px;
  }
}
</style>
