<script setup lang="ts">
import type { Cart, TableColumn, User } from '~/types'
import { Align } from '~/types'
import ZNotification from '~/library/z-notification'

const route = useRoute()
const carts_columns: TableColumn[] = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'total',
    title: 'Total',
    scopedSlots: true,
  },
  {
    key: 'created_at',
    title: 'Created At',
  },
  {
    key: 'action',
    align: Align.Right,
    scopedSlots: true,
  },
]

const { data: user } = await useAsyncData('fetch_user', async() => {
  const { data: user } = await useBetterFetch<User>(`/660/users/${route.params.id}?_embed=carts`)
  if (user.carts) {
    for (let index = 0; index < user.carts.length; index++) {
      const cart = user.carts[index]

      const { data } = await useBetterFetch<Cart>(`/660/carts/${cart.id}?_embed=products_cart`)
      user.carts[index] = data
    }
  }

  return user
}, {
  default: () => ({} as User),
})

const update_user = async() => {
  try {
    await useBetterFetch(`/660/users/${route.params.id}`, {
      method: 'PUT',
      body: {
        email: user.value.email,
        password: user.value.password,
        fullname: user.value.fullname,
        address: user.value.address,
        created_at: user.value.created_at,
        updated_at: new Date().toISOString(),
      },
    })
    ZNotification.success({
      title: 'Success',
      description: 'Update user successfully',
    })
  } catch (error) {
    return error
  }
}

const getTotalFromCart = (cart: Cart) => {
  let amount = 0

  cart.products_cart?.forEach((product_cart) => {
    amount += Number(product_cart.price) * Number(product_cart.quantity)
  })

  return amount.toLocaleString()
}
</script>

<template>
  <div>
    <Card>
      <div class="text-2xl bold-text mb-8">
        <div class="flex items-center">
          <div class="flex items-center justify-center w-12 h-12 rounded-1 bg-gray-400">
            <Icon class="text-white" type="person" />
          </div>
          <span class="ml-3">
            <div>{{ user.email }}</div>
            <div class="text-gray-500 text-sm">Last update: {{ user.updated_at }}</div>
          </span>
        </div>
      </div>
      <form class="grid px-4 grid-cols-4 gap-8" @submit.prevent="update_user">
        <FormRow>
          <FormRowLabel>
            Email
          </FormRowLabel>
          <Input v-model="user.email" />
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Password
          </FormRowLabel>
          <Input v-model="user.password" type="password" />
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Full Name
          </FormRowLabel>
          <Input v-model="user.fullname" />
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Address
          </FormRowLabel>
          <Input v-model="user.address" />
        </FormRow>

        <FormRow class="col-span-4 flex justify-end">
          <Button class="bold-text rounded px-3 py-1" type="submit">
            Update
          </Button>
        </FormRow>
      </form>
    </Card>

    <Table class="mt-10" title="Carts" :data-source="user.carts" :columns="carts_columns">
      <template #total="{ item }">
        {{ getTotalFromCart(item) }} đ
      </template>
      <template #action="{ item }">
        <a :href="`/admin/carts/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</a>
      </template>
    </Table>
  </div>
</template>

<style lang="less">
.page-admin-users {

}
</style>
