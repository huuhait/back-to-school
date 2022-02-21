<script setup lang="ts">
import type { Product } from '~/types'
import { usePublicStore } from '~/stores/public'
import ZNotification from '~/library/z-notification'

const publicStore = usePublicStore()
const route = useRoute()
const { data: product } = useAsyncData('fetch_product', async() => {
  const { data } = await useBetterFetch<Product>(`/products/${route.params.id}`)

  return data
})

const update_product = () => {
  try {
    useBetterFetch(`/660/products/${route.params.id}`, {
      method: 'PUT',
      body: {
        categoryId: product.value.categoryId,
        name: product.value.name,
        price: product.value.price,
        discount: product.value.discount,
        description: product.value.description,
        image: product.value.image,
        created_at: product.value.created_at,
        updated_at: new Date().toISOString(),
      },
    })
    ZNotification.success({
      title: 'Success',
      description: 'Update product successfully',
    })
  } catch (error) {
    return error
  }
}

const onImageUpload = async(event: any) => {
  const files = event.target.files

  if (files?.length === 0) return

  const file = files[0]

  try {
    const url = await useUploadImage(file)
    product.value.image = url
  } catch (error) {
    return error
  }
}
</script>

<template>
  <Card class="!pb-10">
    <div class="text-2xl bold-text mb-8">
      <div class="flex items-center">
        <span class="ml-3">
          <div>Update Product</div>
          <div class="text-gray-500 text-sm">Last update: {{ product.updated_at }}</div>
        </span>
      </div>
    </div>

    <form class="grid px-4 grid-cols-4 gap-8" @submit.prevent="update_product">
      <FormRow>
        <FormRowLabel>
          Name
        </FormRowLabel>
        <Input v-model="product.name" />
      </FormRow>
      <FormRow>
        <FormRowLabel>
          Category
        </FormRowLabel>
        <select v-model.number="product.categoryId">
          <option disabled value="">
            Please select one
          </option>
          <option v-for="category in publicStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </FormRow>
      <FormRow>
        <FormRowLabel>
          Price
        </FormRowLabel>
        <Input v-model="product.price" />
      </FormRow>
      <FormRow>
        <FormRowLabel>
          Discount
        </FormRowLabel>
        <Input v-model.number="product.discount" />
      </FormRow>

      <FormRow class="col-span-2">
        <FormRowLabel>
          Image
        </FormRowLabel>
        <div class="grid grid-cols-2 gap-4">
          <input type="file" class="mt-4" @change="onImageUpload">
          <img :src="product.image">
        </div>
      </FormRow>

      <FormRow class="col-span-2">
        <FormRowLabel>
          Description
        </FormRowLabel>
        <textarea v-model="product.description" />
      </FormRow>

      <FormRow class="col-span-4 flex justify-end mt-4">
        <Button class="bold-text rounded px-3 py-1" type="submit">
          Update
        </Button>
      </FormRow>
    </form>
  </Card>
</template>
