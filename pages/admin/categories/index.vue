<script setup lang="ts">
import type { Category, TableColumn } from '~/types'
import { Align, Format, ParseType } from '~/types'
import ZNotification from '~/library/z-notification'

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

const { data: categories } = useAsyncData('fetch_categories', async() => {
  const { data } = await useBetterFetch<Category[]>('/660/categories')

  return data
}, {
  default: () => ([] as Category[]),
})

const delete_category = async(product: Category) => {
  try {
    await useBetterFetch<Category[]>(`/660/categories/${product.id}`, {
      method: 'DELETE',
    })

    const index = categories.value.findIndex(u => u.id === product.id)
    if (index >= 0) {
      categories.value.splice(index, 1)
    }

    ZNotification.success({
      title: 'Success',
      description: 'Deleted category successfully',
    })
  } catch (error) {
    return error
  }
}
</script>

<template>
  <div>
    <Table title="Categories" :data-source="categories" :columns="columns">
      <template #action="{ item }">
        <a :href="`/admin/categories/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
        <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" @click="delete_category(item)">Delete</a>
      </template>
    </Table>
  </div>
</template>

<style lang="less">
.page-admin-categories {
  .id {
    flex: 0 0 50px;
  }
}
</style>
