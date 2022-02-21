<script setup lang="ts">
import type { Product, TableColumn } from '~/types'
import { Align, Format, ParseType } from '~/types'
import ZNotification from '~/library/z-notification'
import { usePublicStore } from '~/stores/public'

const columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'price',
    title: 'Price',
    scopedSlots: true,
  },
  {
    key: 'discount',
    title: 'Discount',
    scopedSlots: true,
  },
  {
    key: 'created_at',
    title: 'Created At',
    parse: ParseType.DateTime,
    formatBy: Format.DateTime,
  },
  {
    key: 'action',
    align: Align.Right,
    scopedSlots: true,
  },
]

const publicStore = usePublicStore()

onMounted(() => {
  publicStore.admin_action_headers = [
    {
      name: 'Create',
      callback: () => {
        const router = useRouter()

        router.push('/admin/products/create')
      },
    },
  ]
})

onBeforeUnmount(() => {
  publicStore.admin_action_headers = []
})

const { data: products } = useAsyncData('fetch_products', async() => {
  const { data } = await useBetterFetch<Product[]>('/660/products')

  return data
}, {
  default: () => ([] as Product[]),
})

const delete_product = async(product: Product) => {
  try {
    await useBetterFetch<Product[]>(`/660/products/${product.id}`, {
      method: 'DELETE',
    })

    const index = products.value.findIndex(u => u.id === product.id)
    if (index >= 0) {
      products.value.splice(index, 1)
    }

    ZNotification.success({
      title: 'Success',
      description: 'Deleted product successfully',
    })
  } catch (error) {
    return error
  }
}
</script>

<template>
  <div>
    <Table title="Products" :data-source="products" :columns="columns">
      <template #price="{ item }">
        {{ Number(item.price).toLocaleString() }}đ
      </template>
      <template #discount="{ item }">
        {{ item.discount * 100 }}%
      </template>
      <template #action="{ item }">
        <a :href="`/admin/products/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
        <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" @click="delete_product(item)">Delete</a>
      </template>
    </Table>
  </div>
</template>

<style lang="less">
.page-admin-products {
  .id {
    flex: 0 0 50px;
  }
}
</style>
