import config from '~/config'
import ZNotification from '~/library/z-notification'
// import { UserState } from '~/types'
// import { useUserStore } from '~/stores/user'
// import { usePublicStore } from '~/stores/public'

function jsonToParam(json: { [key: string]: any }, first_str = '?') {
  const parts: string[] = []
  for (const i in json) {
    if (Object.prototype.hasOwnProperty.call(json, i) && json[i]) {
      const part = `${encodeURIComponent(i)}=${encodeURIComponent(json[i])}`
      parts.push(part)
    }
  }
  return parts.length ? first_str + parts.join('&') : ''
}

const formatError = (error: any) => {
  if (process.server) return

  const response = error.response
  const errors: string[] = response.data.errors
  // const userStore = useUserStore()
  // const router = useRouter()

  // if (userStore.state === UserState.Active && response.status === 401 && !response.data?.errors?.includes('authz.invalid_permission')) {
  //   router.push('/')
  //   userStore.auth_error()
  // }

  for (const error of errors) {
    switch (error) {
      default:
        ZNotification.error({
          title: 'Error',
          description: error,
        })
        break
    }
  }
}

const csrf_headers = () => {
  if (process.server) return {}

  const csrf_token = localStorage.getItem('csrf_token')
  const headers = { 'X-CSRF-Token': csrf_token }

  return csrf_token ? headers : {}
}

interface BetterFetchBody {
  [key: string]: any
}

interface BetterFetchHeaders {
  [key: string]: string | number | string[]
}

interface BetterFetchOptions {
  method?: 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'DELETE'
  body?: BetterFetchBody
  params?: { [key: string]: string | number }
  headers?: BetterFetchHeaders
}

export const useBetterFetch = async <T>(url: string, options?: BetterFetchOptions) => {
  try {
    // const publicStore = usePublicStore()
    // const headers = publicStore.headers
    const headers = {}

    let params = ''
    if (options?.params) {
      params = jsonToParam(options?.params)
    }

    const res = await fetch(config.api.url + url + params, {
      method: options?.method || 'GET',
      body: JSON.stringify(options?.body),
      headers: {
        ...options?.headers,
        ...csrf_headers,
        ...headers,
        'Content-Type': 'application/json',
        'host': 'test.zsmartex.tech',
      },
    })

    if (!res.ok) {
      const response: any = res.clone()
      const error: any = new Error(response.statusText)

      response.data = await response.clone().json()
      error.response = response
      throw error
    }

    const data = await res.json() as T

    return Promise.resolve({
      status: res.status,
      headers: res.headers,
      data,
    })
  } catch (error) {
    formatError(error)

    return Promise.reject(error)
  }
}
