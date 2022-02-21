<script setup lang="ts">
import type { Product } from '~/types'
import { usePublicStore } from '~/stores/public'
import ZNotification from '~/library/z-notification'

const route = useRoute()
const { data: slideshow } = useAsyncData('fetch_slideshow', async() => {
  const { data } = await useBetterFetch<Product>(`/660/slideshow/${route.params.id}`)

  return data
})

const update_slideshow = () => {
  try {
    useBetterFetch(`/660/slideshow/${route.params.id}`, {
      method: 'PUT',
      body: {
        image: slideshow.value.image,
        created_at: slideshow.value.created_at,
        updated_at: new Date().toISOString(),
      },
    })
    ZNotification.success({
      title: 'Success',
      description: 'Update slideshow successfully',
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
    slideshow.value.image = url
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
          <div>Update Slideshow</div>
          <div class="text-gray-500 text-sm">Last update: {{ slideshow.updated_at }}</div>
        </span>
      </div>
    </div>

    <form class="grid px-4 grid-cols-1 gap-8" @submit.prevent="update_slideshow">
      <FormRow class="col-span-2">
        <FormRowLabel>
          Image
        </FormRowLabel>
        <div class="grid gap-4">
          <input type="file" class="mt-4" @change="onImageUpload">
          <img :src="slideshow.image">
        </div>
      </FormRow>

      <FormRow class="col-span-4 flex justify-end mt-4">
        <Button class="bold-text rounded px-3 py-1" type="submit">
          Update
        </Button>
      </FormRow>
    </form>
  </Card>
</template>
