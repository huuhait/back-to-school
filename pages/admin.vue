<script setup lang="ts">
import { usePublicStore } from '~/stores/public'

definePageMeta({
  middleware: ['auth-only'],
})

const publicStore = usePublicStore()
</script>

<template>
  <div class="admin-layout flex h-screen w-screen overflow-hidden">
    <div class="admin-layout-menu w-74 bg-dark-500-400 h-full">
      <div class="admin-layout-menu-logo">
        <img src="~/assets/img/logo.png">
      </div>

      <div class="admin-layout-menu-nav">
        <a href="/admin/users" class="admin-layout-menu-nav-item bold-text">
          Users
        </a>
        <a href="/admin/carts" class="admin-layout-menu-nav-item bold-text">
          Carts
        </a>
        <a href="/admin/categories" class="admin-layout-menu-nav-item bold-text">
          Categories
        </a>
        <a href="/admin/products" class="admin-layout-menu-nav-item bold-text">
          Products
        </a>
        <a href="/admin/slideshow" class="admin-layout-menu-nav-item bold-text">
          Slideshow
        </a>
      </div>
    </div>
    <div class="w-full">
      <div class="flex justify-end h-16 items-center">
        <Button v-for="(action, index) in publicStore.admin_action_headers" :key="index" class="h-10 mr-8 px-4 py-2 rounded" @click="action.callback">
          {{ action.name }}
        </Button>
      </div>
      <div class="admin-layout-content">
        <NuxtNestedPage />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.admin-layout {
  &-menu {
    background-color: #353535;
    color: #fff;

    &-logo {
      padding: 20px 16px;
    }

    &-nav {
      &-item {
        position: relative;
        display: block;
        width: 100%;
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 32px;
        font-size: 18px;
        transition: all 0.3s;

        &.router-link-exact-active, &:hover {
          color: @primary-color;
        }
      }
    }
  }

  &-content {
    width: 100%;
    padding: 12px 24px;
    background-color: #eff3f4;
  }
}
</style>
