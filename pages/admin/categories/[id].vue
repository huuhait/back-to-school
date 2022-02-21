<script setup lang="ts">
import type { Category } from '~/types'
import ZNotification from '~/library/z-notification'

const route = useRoute()

const { data: category } = await useAsyncData('fetch_category', async() => {
  const { data: category } = await useBetterFetch<Category>(`/660/categories/${route.params.id}`)

  return category
}, {
  default: () => ({} as Category),
})

const update_category = async() => {
  try {
    await useBetterFetch(`/660/users/${route.params.id}`, {
      method: 'PUT',
      body: {
        name: category.value.name,
        created_at: category.value.created_at,
        updated_at: new Date().toISOString(),
      },
    })
    ZNotification.success({
      title: 'Success',
      description: 'Update category successfully',
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
        <span class="ml-3">
          <div>Update Category</div>
          <div class="text-gray-500 text-sm">Last update: {{ category.updated_at }}</div>
        </span>
      </div>
    </div>
    <form class="grid px-4 grid-cols-2 gap-8" @submit.prevent="update_category">
      <FormRow>
        <FormRowLabel>
          Name
        </FormRowLabel>
        <Input v-model="category.name" />
      </FormRow>

      <FormRow class="col-span-4 flex justify-end">
        <Button class="bold-text rounded px-3 py-1" type="submit">
          Update
        </Button>
      </FormRow>
    </form>
  </Card>
</template>
