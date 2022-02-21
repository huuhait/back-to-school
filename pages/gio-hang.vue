<script setup lang="ts">
import { usePublicStore } from '~/stores/public'
import type { Product, TableColumn } from '~/types'
import { Align } from '~/types'

const publicStore = usePublicStore()
const columns: TableColumn[] = [
  {
    key: 'sanpham',
    title: 'SẢN PHẨM',
    scopedSlots: true,
  },
  {
    key: 'gia',
    title: 'GIÁ',
    scopedSlots: true,
  },
  {
    key: 'soluong',
    title: 'SỐ LƯỢNG',
    align: Align.Center,
    scopedSlots: true,
  },
  {
    key: 'tong',
    title: 'TỔNG',
    align: Align.Right,
    scopedSlots: true,
  },
]

const { data: products } = useAsyncData('fetch_products', async() => {
  const { data } = await useBetterFetch<Product[]>('/664/products')

  return data
}, {
  default: () => ([] as Product[]),
})

function getProduct(productId: number) {
  return products.value.find(p => p.id === productId)
}

const total = computed(() => {
  let v = 0

  publicStore.carts.forEach((c) => {
    const product = getProduct(c.productId)

    v += c.quantity * (Number(product?.price) - Number(product?.price) * Number(product?.discount))
  })

  return v
})
</script>

<template>
  <LayoutContent>
    <Container>
      <div class="flex my-10">
        <Table class="cart-table" :data-source="publicStore.carts" :columns="columns">
          <template #sanpham="{ item }">
            <Icon type="close" class="text-xl cursor-pointer" @click="publicStore.RemoveFromCart(item.productId)" />
            <NuxtLink class="h-full" :to="`/product/${item.productId}`">
              <img class="h-full" :src="getProduct(item.productId)?.image">
            </NuxtLink>
          </template>
          <template #gia="{ item }">
            <span class="line-through text-gray-500 mr-2">
              {{ Number(getProduct(item.productId)?.price).toLocaleString() }}đ
            </span>
            {{ Number(Number(getProduct(item.productId)?.price) - Number(getProduct(item.productId)?.price) * Number(getProduct(item.productId)?.discount)).toLocaleString() }}đ
          </template>
          <template #soluong="{ item }">
            <div class="product-quantity flex mr-10 border-2">
              <span class="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" type="button" @click="() => {if (item.quantity > 1) item.quantity--}">-</span>
              <input v-model="item.quantity" class="text-center h-10 border-t-[2px] border-b-[2px] m-0 w-10" type="text">
              <span class="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" type="button" @click="item.quantity++">+</span>
            </div>
          </template>
          <template #tong="{ item }">
            {{ Number(Number(Number(getProduct(item.productId)?.price) - Number(getProduct(item.productId)?.price) * Number(getProduct(item.productId)?.discount)) * item.quantity).toLocaleString() }}đ
          </template>
        </Table>

        <div class="cart-info ml-8">
          <div class="bold-text pb-3 border-b w-full">
            TỔNG SẢN PHẨM
          </div>
          <div class="flex w-full justify-between mt-5">
            <span>
              Tổng phụ
            </span>
            <span class="bold-text">
              {{ total.toLocaleString() }}đ
            </span>
          </div>
          <Button class="block w-full rounded px-4 py-2 mt-8 text-center" @click="publicStore.DatHang">
            ĐẶT HÀNG
          </Button>
        </div>
      </div>
    </Container>
  </LayoutContent>
</template>

<style lang="less">
.page-gio-hang {
  .table {
    &-row {
      height: 105px;
      line-height: 105px;
    }
  }

  .cart-table {
    width: 848px;
  }

  .cart-info {
    width: calc(100% - 848px);
  }
}
</style>
