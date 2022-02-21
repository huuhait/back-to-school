<script setup lang="ts">
import type { SlideShow, TableColumn } from '~/types'
import { Align, Format, ParseType } from '~/types'
import ZNotification from '~/library/z-notification'
import { usePublicStore } from '~/stores/public'

const columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'image',
    title: 'Image',
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

        router.push('/admin/slideshow/create')
      },
    },
  ]
})

onBeforeUnmount(() => {
  publicStore.admin_action_headers = []
})

const { data: slideshow } = useAsyncData('fetch_slideshow', async() => {
  const { data } = await useBetterFetch<SlideShow[]>('/660/slideshow')

  return data
}, {
  default: () => ([] as SlideShow[]),
})
const delete_slideshow = async(user: SlideShow) => {
  try {
    await useBetterFetch<SlideShow[]>(`/660/slideshow/${user.id}`, {
      method: 'DELETE',
    })

    const index = slideshow.value.findIndex(u => u.id === user.id)
    if (index >= 0) {
      slideshow.value.splice(index, 1)
    }

    ZNotification.success({
      title: 'Success',
      description: 'Deleted user successfully',
    })
  } catch (error) {
    return error
  }
}
</script>

<template>
  <div>
    <Table title="Users" :data-source="slideshow" :columns="columns">
      <template #image="{ item }">
        <img :src="item.image" class="h-full">
      </template>
      <template #action="{ item }">
        <a :href="`/admin/slideshow/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
        <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" @click="delete_slideshow(item)">Delete</a>
      </template>
    </Table>
  </div>
</template>

<style lang="less">
.page-admin-slideshow {
  .id {
    flex: 0 0 50px;
  }

  .table-row {
    height: 82px;
    line-height: 82px;
    padding: 16px !important;
  }
}
</style>
