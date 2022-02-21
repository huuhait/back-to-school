<script setup lang="ts">
import { useUserStore } from '~/stores/user'

definePageMeta({
  middleware: ['guest-only'],
})

const userStore = useUserStore()
const fullname = useState('fullname', () => '')
const email = useState('email', () => '')
const password = useState('password', () => '')
const address = useState('address', () => '')

const register = () => {
  userStore.Register(fullname.value, email.value, password.value, address.value)
}
</script>

<template>
  <LayoutContent>
    <Container class="flex !w-full !h-full items-center justify-center">
      <form class="w-120 mx-auto mt-72" @submit.prevent="register">
        <div class="bold-text mb-4 text-xl text-center">
          Register
        </div>
        <Input v-model="fullname" class="border border-gray-300 rounded mb-3" placeholder="Full Name" />
        <Input v-model="email" class="border border-gray-300 rounded mb-3" placeholder="Email" />
        <Input v-model="password" class="border border-gray-300 rounded mb-3" type="password" placeholder="Password" />
        <Input v-model="address" class="border border-gray-300 rounded mb-3" placeholder="Address" />
        <Button class="w-full px-4 py-2 rounded" type="submit">
          Register
        </Button>
      </form>
    </Container>
  </LayoutContent>
</template>
