<script setup lang="ts">
import type { TableColumn, User } from '~/types'
import { Align, Format, ParseType } from '~/types'
import ZNotification from '~/library/z-notification'
import { usePublicStore } from '~~/stores/public'

const columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'email',
    title: 'Email',
  },
  {
    key: 'fullname',
    title: 'Full Name',
  },
  {
    key: 'address',
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

        router.push('/admin/users/create')
      },
    },
  ]
})

onBeforeUnmount(() => {
  publicStore.admin_action_headers = []
})

const { data: users } = useAsyncData('fetch_users', async() => {
  const { data } = await useBetterFetch<User[]>('/660/users')

  return data
}, {
  default: () => ([] as User[]),
})

const delete_user = async(user: User) => {
  try {
    await useBetterFetch<User[]>(`/660/users/${user.id}`, {
      method: 'DELETE',
    })

    const index = users.value.findIndex(u => u.id === user.id)
    if (index >= 0) {
      users.value.splice(index, 1)
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
    <Table title="Users" :data-source="users" :columns="columns">
      <template #action="{ item }">
        <a :href="`/admin/users/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
        <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" @click="delete_user(item)">Delete</a>
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
