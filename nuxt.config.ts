import { defineNuxtConfig } from 'nuxt3'
import colors from './colors'

export default defineNuxtConfig({
  build: {
    transpile: ['moment'],
  },
  meta: {
    title: 'Vitesse Nuxt 3',
  },
  buildModules: [
    '@vueuse/nuxt',
    'nuxt-windicss',
    '@pinia/nuxt',
  ],
  vueuse: {
    ssrHandlers: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: (function() {
            let variables = ''

            for (const key in colors) {
              const variable = `@${key}`
              const color = colors[key]

              variables += `${variable}: ${color};\n`
            }

            return variables
          }()),
        },
      },
    },
    server: {
      watch: {
        ignored: ['!**/public/**', '!**/node_modules/**'],
      },
      proxy: {},
      host: '0.0.0.0',
    },
  },
})
