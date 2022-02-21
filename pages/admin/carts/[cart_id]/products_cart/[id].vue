<script setup lang="ts">
import type { Product, ProductCart } from '~/types'
import ZNotification from '~/library/z-notification'

const route = useRoute()

const { data: products } = await useAsyncData('fetch_products', async() => {
  const { data: products } = await useBetterFetch<Product[]>('/660/products')

  return products
})

const { data: product_cart } = await useAsyncData('fetch_product_cart', async() => {
  const { data: product_cart } = await useBetterFetch<ProductCart>(`/660/products_cart/${route.params.id}`)

  return product_cart
}, {
  default: () => ({} as ProductCart),
})

const update_product_cart = async() => {
  try {
    const product = products.value.find(p => p.id === product_cart.value.productId)

    if (!product) return

    await useBetterFetch<ProductCart>(`/660/products_cart/${route.params.id}`, {
      method: 'PUT',
      body: {
        id: route.params.id,
        cartId: product_cart.value.cartId,
        productId: product.id,
        quantity: product_cart.value.quantity,
        price: Number(product.price) - (Number(product.price) * product.discount),
        created_at: product_cart.value.created_at,
        updated_at: new Date().toISOString(),
      },
    })
    ZNotification.success({
      title: 'Success',
      description: 'Update product cart successfully',
    })
  } catch (error) {
    return error
  }
}
</script>

<template>
  <Card>
    <div class="text-2xl bold-text mb-8">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-12 h-12 rounded-1 bg-gray-400">
          <Icon class="text-white" type="person" />
        </div>
        <span class="ml-3">
          <div>Update ProductCart</div>
          <div class="text-gray-500 text-sm">Last update: {{ product_cart.updated_at }}</div>
        </span>
      </div>
    </div>
    <form class="grid px-4 grid-cols-2 gap-8" @submit.prevent="update_product_cart">
      <FormRow>
        <FormRowLabel>
          Product
        </FormRowLabel>
        <select v-model.number="product_cart.productId">
          <option disabled value="">Please select one</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }} - {{ Number(product.price).toLocaleString() }}đ
          </option>
        </select>
      </FormRow>
      <FormRow>
        <FormRowLabel>
          Quantity
        </FormRowLabel>
        <Input v-model.number="product_cart.quantity" />
      </FormRow>

      <FormRow class="col-span-4 flex justify-end">
        <Button class="bold-text rounded px-3 py-1" type="submit">
          Update
        </Button>
      </FormRow>
    </form>
  </Card>
</template>
