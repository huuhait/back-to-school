<script setup lang="ts">
definePageMeta({
  middleware: ['auth-only'],
})
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
      </div>
    </div>
    <div class="admin-layout-content">
      <NuxtNestedPage />
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
