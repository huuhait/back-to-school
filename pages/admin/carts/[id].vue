<script setup lang="ts">
import type { Cart, Product, ProductCart, TableColumn } from '~/types'
import { Align } from '~/types'
import ZNotification from '~/library/z-notification'

const columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'product.name',
    title: 'Product',
  },
  {
    key: 'price',
    title: 'Price',
  },
  {
    key: 'quantity',
    title: 'Quantity',
  },
  {
    key: 'action',
    align: Align.Right,
    scopedSlots: true,
  },
]

const route = useRoute()
const { data: cart } = useAsyncData('fetch_cart', async() => {
  const { data } = await useBetterFetch<Cart>(`/660/carts/${route.params.id}?_embed=products_cart&_expand=user`)

  if (data.products_cart) {
    for (let index = 0; index < data.products_cart.length; index++) {
      const product_cart = data.products_cart[index]
      const { data: product } = await useBetterFetch<Product>(`/660/products/${product_cart.productId}`)

      product_cart.product = product
    }
  }

  return data
}, {
  default: () => ({} as Cart),
})

const delete_product_cart = async(product_cart: ProductCart) => {
  try {
    await useBetterFetch<Cart[]>(`/660/carts/${product_cart.id}`, {
      method: 'DELETE',
    })

    if (!cart.value.products_cart) return

    const index = cart.value.products_cart.findIndex(u => u.id === product_cart.id)
    if (index >= 0) {
      cart.value.products_cart.splice(index, 1)
    }

    ZNotification.success({
      title: 'Success',
      description: 'Deleted product cart successfully',
    })
  } catch (error) {
    return error
  }
}
</script>

<template>
  <div>
    <Card>
      <div class="text-2xl bold-text mb-8">
        <div class="flex items-center">
          <span class="ml-3">
            <div>Update Cart</div>
            <div class="text-gray-500 text-sm">Last update: {{ cart.updated_at }}</div>
          </span>
        </div>
      </div>
      <div class="grid px-4 grid-cols-3 gap-8">
        <FormRow v-if="cart.user">
          <FormRowLabel>
            Fullname
          </FormRowLabel>
          <div>
            {{ cart.user.fullname }}
          </div>
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Email
          </FormRowLabel>
          <div>
            {{ cart.user.email }}
          </div>
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Address
          </FormRowLabel>
          <div>
            {{ cart.user.address }}
          </div>
        </FormRow>
      </div>
    </Card>

    <Table class="mt-10" title="Products Cart" :data-source="cart.products_cart" :columns="columns">
      <template #action="{ item }">
        <a :href="`/admin/carts/${route.params.id}/products_cart/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
        <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300">Delete</a>
      </template>
    </Table>
  </div>
</template>
