<script setup lang="ts">
const user = {
  id: 1,
  email: 'abc@gmail.com',
  username: 'test1@',
  password: 'abcxyz',
  fullname: 'Nguyễn Văn A',
  address: 'My Dinh, Nam Tu Liem, Ha Noi',
  created_at: '2022-02-18T04:07:52.391Z',
  updated_at: '2022-02-18T04:07:52.391Z',
}
</script>

<template>
  <Card>
    <div class="text-2xl bold-text">
      {{ user.email }}
    </div>
  </Card>
</template>
