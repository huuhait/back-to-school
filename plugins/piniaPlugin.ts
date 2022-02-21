import type { PiniaPluginContext } from 'pinia'
import * as shvl from 'shvl'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export default function({ $pinia, ssrContext }) {
  function createPersistedStatePlugin(context: PiniaPluginContext) {
    const { options: { persist }, store } = context

    if (!persist) return

    const {
      key = store.$id,
      paths = null,
      overwrite = false,
    } = typeof persist != 'boolean' ? persist : {}

    const storage = {
      getItem(key) {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          let headerCookie = ssrContext.req.headers.cookie

          if (typeof headerCookie !== 'string') {
            headerCookie = ''
          }

          const parsedCookies = cookie.parse(headerCookie)
          return parsedCookies[key]
        } else {
          return Cookies.get(key)
        }
      },
      setItem(key, value) {
        Cookies.set(key, value, { expires: 365, secure: false })
      },
      removeItem(key) {
        Cookies.remove(key)
      },
    }

    try {
      const fromStorage = storage.getItem(key)
      if (fromStorage) {
        if (overwrite) store.$state = JSON.parse(fromStorage)
        else store.$patch(JSON.parse(fromStorage))
      }
    } catch (_error) {}

    store.$subscribe((_mutation: unknown, state: unknown) => {
      try {
        const toStore = Array.isArray(paths)
          ? paths.reduce((substate, path) => {
            return shvl.set(
              substate,
              path,
              shvl.get(state as Record<string, unknown>, path),
            )
          }, {})
          : state

        storage.setItem(key, JSON.stringify(toStore))
      } catch (_error) {}
    })
  }

  $pinia.use(createPersistedStatePlugin)
}
