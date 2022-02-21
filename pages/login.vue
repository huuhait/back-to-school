<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const email = useState('email', () => '')
const password = useState('password', () => '')

definePageMeta({
  middleware: ['guest-only'],
})

const login = () => {
  userStore.Login(email.value, password.value)
}
</script>

<template>
  <LayoutContent>
    <Container class="flex !w-full !h-full items-center justify-center">
      <form class="w-120 mx-auto mt-72" @submit.prevent="login">
        <div class="bold-text mb-4 text-xl text-center">
          Login
        </div>
        <Input v-model="email" class="border border-gray-300 rounded mb-3" placeholder="Email" />
        <Input v-model="password" class="border border-gray-300 rounded mb-3" type="password" placeholder="Password" />
        <Button class="w-full px-4 py-2 rounded" type="submit">
          Login
        </Button>
      </form>
    </Container>
  </LayoutContent>
</template>
