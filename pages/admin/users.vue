<script setup lang="ts">
import type { TableColumn } from '~/types'
import { Align, Format, ParseType } from '~/types'

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

const users = [
  {
    id: 1,
    email: 'abc@gmail.com',
    username: 'test1@',
    password: 'abcxyz',
    fullname: 'Nguyễn Văn A',
    address: 'My Dinh, Nam Tu Liem, Ha Noi',
    created_at: '2022-02-18T04:07:52.391Z',
    updated_at: '2022-02-18T04:07:52.391Z',
  },
  {
    id: 2,
    email: 'abc@gmail.com',
    fullname: 'Nguyễn Văn B',
    username: 'test2@',
    password: 'abcxyz',
    address: 'My Dinh, Nam Tu Liem, Ha Noi',
    created_at: '2022-02-18T04:07:52.391Z',
    updated_at: '2022-02-18T04:07:52.391Z',
  },
  {
    id: 3,
    email: 'abc@gmail.com',
    fullname: 'Nguyễn Văn C',
    username: 'test3@',
    password: 'abcxyz',
    address: 'My Dinh, Nam Tu Liem, Ha Noi',
    created_at: '2022-02-18T04:07:52.391Z',
    updated_at: '2022-02-18T04:07:52.391Z',
  },
]
</script>

<template>
  <NuxtNestedPage v-if="$route.params['id']" />
  <Table v-else title="Users" :data-source="users" :columns="columns">
    <template #action="{ item }">
      <NuxtLink :to="`/admin/users/${item.id}`" class="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</NuxtLink>
      <a class="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300">Delete</a>
    </template>
  </Table>
</template>

<style lang="less">
.page-admin-users {
  .id {
    flex: 0 0 50px;
  }
}
</style>
