import { acceptHMRUpdate, defineStore } from 'pinia'
import { useUserStore } from './user'
import type { Cart, CartStore, Category, Product, User } from '~/types'
import ZNotification from '~/library/z-notification'

export const usePublicStore = defineStore({
  id: 'public',
  state() {
    return {
      first_route: useState('first_route', () => false),
      carts: useState('store_carts', () => [] as CartStore[]),
      categories: useState('categories', () => [] as Category[]),
      products: useState('products', () => [] as Product[]),
    }
  },
  actions: {
    async FetchSlideShow() {

    },
    async FetchCategories() {
      try {
        const { data } = await useBetterFetch<Category[]>('/categories')

        this.categories = data
      } catch (error) {
        return error
      }
    },
    async FetchProducts() {
      try {
        const { data } = await useBetterFetch<Product[]>('/products')

        this.products = data
      } catch (error) {
        return error
      }
    },
    AddToCart(productId: number, quantity: number) {
      const index = this.carts.findIndex(cart => cart.productId === productId)

      if (index >= 0) {
        this.carts[index].quantity += quantity
      } else {
        this.carts.push({
          productId,
          quantity,
        })
      }
    },
    RemoveFromCart(productId: number) {
      const index = this.carts.findIndex(cart => cart.productId === productId)

      if (index >= 0) {
        this.carts.splice(index, 1)
      }
    },
    async DatHang() {
      const router = useRouter()
      const userStore = useUserStore()

      if (!userStore.logged) {
        router.push('/login')
        ZNotification.error({
          title: 'Error',
          description: 'Bạn chưa đăng nhập',
        })
      }

      try {
        const { data: users } = await useBetterFetch<User[]>(`/users?email=${userStore.email}`)
        const user = users[0]

        const { data: cart } = await useBetterFetch<Cart>('/carts', {
          method: 'POST',
          body: {
            userId: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        })

        for (const c of this.carts) {
          const product = this.products.find(p => p.id === c.productId)

          if (!product) return

          await useBetterFetch<Cart>('/products_cart', {
            method: 'POST',
            body: {
              cartId: cart.id,
              productId: c.productId,
              quantity: c.quantity,
              price: Number(Number(product.price) - Number(product.price) * product.discount).toString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          })
        }

        router.push('/')
        this.carts = []
        ZNotification.success({
          title: 'Success',
          description: 'Đặt hàng thành công',
        })
      } catch (error) {
        ZNotification.error({
          title: 'Failed',
          description: 'Đặt hàng thất bại',
        })
        return error
      }
    },
  },
  persist: {
    paths: ['carts'],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePublicStore, import.meta.hot))
