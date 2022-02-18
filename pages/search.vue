<script setup lang="ts">
import ProductTypes from '~/layouts/danh-muc/ProductTypes.vue'

const route = useRoute()
const searchContent = computed(() => route.query.name as string)
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
  <LayoutContent class="my-10">
    <Container>
      <div class="bold-text text-2xl">
        KẾT QUẢ TÌM KIẾM CHO: "{{ searchContent.toUpperCase() }}"
      </div>
    </Container>

    <Container class="flex my-10">
      <ProductTypes class="mr-8 w-80" />

      <div class="grid grid-cols-4 gap-8">
        <ProductItem v-for="(product, index) of [...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products]" :key="index" :product="product" />
      </div>
    </Container>
  </LayoutContent>
</template>
