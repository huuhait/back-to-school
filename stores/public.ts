import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePublicStore = defineStore({
  id: 'public',
  state() {
    return {
      first_route: useState('first_route', () => false),
    }
  },
  actions: {
    async FetchSlideShow() {

    },
    async FetchProducts(payload) {

    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePublicStore, import.meta.hot))
