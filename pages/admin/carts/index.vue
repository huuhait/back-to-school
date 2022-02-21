<script setup lang="ts">
import type { Cart, TableColumn } from '~/types'
import { Align, Format, ParseType } from '~/types'
import ZNotification from '~/library/z-notification'
import { usePublicStore } from '~/stores/public'

const columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'user.email',
    title: 'Email',
  },
  {
    key: 'user.fullname',
    title: 'Full Name',
  },
  {
    key: 'user.address',
    title: 'Address',
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

        router.push('/admin/carts/create')
      },
    },
  ]
})

onBeforeUnmount(() => {
  publicStore.admin_action_headers = []
})

const { data: carts } = useAsyncData('fetch_carts', async() => {
  const { data } = await useBetterFetch<Cart[]>('/660/carts?_expand=user')

  return data
}, {
  default: () => ([] as Cart[]),
})

const delete_cart = async(cart: Cart) => {
  try {
    await useBetterFetch<Cart[]>(`/660/carts/${cart.id}`, {
      method: 'DELETE',
    })

    const index = carts.value.findIndex(u => u.id === cart.id)
    if (index >= 0) {
      carts.value.splice(index, 1)
    }

    ZNotification.success({
      title: 'Success',
      description: 'Deleted cart successfully',
    })
  } catch (error) {
    return error
  }
}
</script>

<template>
  <div>
    <Table title="Carts" :data-source="carts" :columns="columns">
      <template #action="{ item }">
        <a :href="`/admin/carts/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
        <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" @click="delete_cart(item)">Delete</a>
      </template>
    </Table>
  </div>
</template>

<style lang="less">
.page-admin-users {
  .id {
    flex: 0 0 50px;
  }
}
</style>
