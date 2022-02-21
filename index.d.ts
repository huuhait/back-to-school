/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PersistedStateOptions } from '~/types'

declare module 'pinia' {
  export interface DefineStoreOptions<Id extends string, S extends StateTree, G, A> {
    /**
     * Persist store in storage.
     * @docs https://github.com/prazdevs/pinia-plugin-persistedstate.
     */
    persist?: boolean | PersistedStateOptions
  }
}

export { }
