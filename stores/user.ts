import { acceptHMRUpdate, defineStore } from 'pinia'
import ZNotification from '~/library/z-notification'

function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
  }).join(''))

  return JSON.parse(jsonPayload)
}

export const useUserStore = defineStore({
  id: 'user',
  state() {
    return {
      token: useState('token', () => ''),
    }
  },
  getters: {
    logged(): boolean {
      return !!this.email
    },
    email(): string {
      if (!this.token) return ''

      const jwt = parseJwt(this.token)
      return jwt.email
    },
  },
  actions: {
    async Login(email: string, password: string) {
      const router = useRouter()
      try {
        const { data } = await useBetterFetch<{ accessToken: string }>('/login', {
          method: 'POST',
          body: {
            email,
            password,
          },
        })

        this.token = data.accessToken
        ZNotification.success({
          title: 'Success',
          description: 'Đăng nhập thành công',
        })
        router.push('/')
      } catch (error) {
        return error
      }
    },
    async Register(fullname: string, email: string, password: string, address: string) {
      const router = useRouter()
      try {
        const { data } = await useBetterFetch<{ accessToken: string }>('/register', {
          method: 'POST',
          body: {
            fullname,
            email,
            password,
            address,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        })

        this.token = data.accessToken
        ZNotification.success({
          title: 'Success',
          description: 'Đăng ký thành công',
        })
        router.push('/')
      } catch (error) {
        return error
      }
    },
  },
  persist: {
    paths: ['token'],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
