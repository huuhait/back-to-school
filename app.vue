<script setup lang="ts">
import '@/assets/styles/index.less'
import config from './config'
import { usePublicStore } from '~/stores/public'

const route = useRoute()
const publicStore = usePublicStore()
const pathName = computed(() => {
  const path = route.matched[route.matched.length - 1].path
  const path_splited = path.substring(1).split('/')
  if (path_splited[path_splited.length - 1][0] === ':') {
    path_splited.splice(path_splited.length - 1, 1)
  }
  return path_splited.join('-') || 'home'
})

const layoutCls = computed(() => {
  return ['page', pathName.value].join('-')
})
const pageRule = computed(() => {
  let page_rule = config.page_rules.find((p) => {
    if (p.name.includes('-*')) {
      return pathName.value.includes(p.name.replace('*', ''))
    }

    return p.name === pathName.value
  })
  if (!page_rule) page_rule = config.page_rules.find(p => p.name === '*')
  return page_rule
})
useAsyncData('fetch_data', async() => {
  await Promise.all([
    publicStore.FetchSlideShow(),
    publicStore.FetchCategories(),
    publicStore.FetchProducts(),
  ])
})
</script>

<template>
  <Layout :class="layoutCls">
    <Header v-if="pageRule?.header" />
    <NuxtPage />
    <Footer v-if="pageRule?.footer" />
    <ZNotificationGroup />
  </Layout>
</template>
