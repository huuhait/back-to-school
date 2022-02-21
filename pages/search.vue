<script setup lang="ts">
import type { Product } from '~/types'

const route = useRoute()
const searchContent = computed(() => route.query.name as string)

const products = computed(() => {
  const products = useState<Product[]>('products')

  return products.value.filter((p) => {
    return p.name.toLowerCase().includes(searchContent.value.toLowerCase())
  })
})
</script>

<template>
  <LayoutContent class="my-10">
    <Container>
      <div class="bold-text text-2xl">
        KẾT QUẢ TÌM KIẾM CHO: "{{ searchContent.toUpperCase() }}"
      </div>
    </Container>

    <Container class="flex my-10">
      <div class="grid grid-cols-4 gap-8">
        <ProductItem v-for="(product, index) of products" :key="index" :product="product" />
      </div>
    </Container>
  </LayoutContent>
</template>
