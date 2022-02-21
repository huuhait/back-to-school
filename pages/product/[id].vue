<script setup lang="ts">
import SameProducts from '~/layouts/product/SameProducts.vue'
import type { Product } from '~/types'
import { usePublicStore } from '~/stores/public'

const route = useRoute()
const publicStore = usePublicStore()
const { data: product } = useAsyncData('fetch_product', async() => {
  const { data } = await useBetterFetch<Product>(`/664/products/${route.params.id}`)

  return data
}, {
  default: () => ({} as Product),
})

const quantity = useState('quantity', () => 1)
</script>

<template>
  <LayoutContent class="page-product">
    <Container class="flex">
      <div class="w-6/12">
        <img :src="product.image">
      </div>
      <div class="w-6/12 pt-16">
        <h2 class="pt-6 text-3xl font-bold pb-4 border-b-[3px] inline-block">{{ product.name }}</h2>
        <p class="pt-4 pb-4 font-bold text-red-600">
          Sale: {{ product.discount * 100 }}%
        </p>
        <span class="line-through text-2xl text-amber-700 opacity-40 mr-4">{{ Number(product.price).toLocaleString() }}đ</span>
        <span class="font-bold text-2xl text-amber-700">{{ (Number(product.price) - (Number(product.price) * product.discount)).toLocaleString() }}đ</span>
        <p class="pt-8">
          {{ product.description }}
        </p>
        <div class="pt-12 flex items-center">
          <div class="product-quantity flex mr-10 border-2">
            <span class="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" type="button" @click="() => {if (quantity > 1) quantity--}">-</span>
            <input v-model="quantity" class="text-center h-10 border-t-[2px] border-b-[2px] m-0 w-10" type="text">
            <span class="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" type="button" @click="quantity++">+</span>
          </div>
          <Button class="text-base w-44 h-10" @click="publicStore.AddToCart(product.id, quantity)">
            THÊM VÀO GIỎ
          </Button>
        </div>
      </div>
    </Container>

    <SameProducts class="mb-10" />
  </LayoutContent>
</template>

<style lang="less">
.page-product {

}
</style>
