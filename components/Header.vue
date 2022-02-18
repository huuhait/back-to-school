<script setup lang="ts">
import { ShoppingBagIcon } from '@heroicons/vue/outline'

const router = useRouter()
const search = useState('search', () => '')

const SearchProducts = () => {
  router.push({
    path: '/search',
    query: {
      name: search.value,
    },
  })
}
</script>

<template>
  <div class="header">
    <div class="block w-full border-solid border-b border-gray-500">
      <Container class="!h-24 flex justify-between items-center">
        <NuxtLink to="/" class="header-logo">
          <img src="~/assets/img/logo.png">
        </NuxtLink>
        <form class="header-search" @submit.prevent="SearchProducts">
          <Input v-model="search" placeholder="Tìm kiếm" />
          <Button>
            <Icon type="search" />
          </Button>
        </form>
        <div class="header-cart">
          <ShoppingBagIcon class="w-10 h-10" />
          <span class="header-cart-info">8</span>
        </div>
      </Container>
    </div>
    <div class="block w-full">
      <Container class="!h-12">
        <div class="header-nav h-full flex justify-center items-center">
          <NuxtLink to="/" class="header-nav-item bold-text">
            TRANG CHỦ
          </NuxtLink>
          <NuxtLink to="/danh-muc/dong-ho-nam" class="header-nav-item bold-text">
            ĐỒNG HỒ NAM
          </NuxtLink>
          <NuxtLink to="/danh-muc/dong-ho-nu" class="header-nav-item bold-text">
            ĐỒNG HỒ NỮ
          </NuxtLink>
        </div>
      </Container>
    </div>
  </div>
</template>

<style lang="less">
.header {
  background-color: #333;

  &-logo {
    width: 200px;
  }

  &-search {
    display: flex;
    height: 40px;
    width: 450px;
    align-items: center;

    .input {
      height: 40px;
      width: 100%;

      input {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }
    }

    .button {
      height: 40px;
      width: 65px;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }

  &-cart {
    position: relative;
    color: #fff;
    cursor: pointer;

    &-info {
      position: absolute;
      left: 50%;
      top: (50% + 5px);
      transform: translate(-50%, -50%);
      font-size: 12px;
    }
  }

  &-nav {
    font-size: 14px;
    font-weight: 500;

    &-item {
      position: relative;
      color: #fff;
      margin: 0 30px;
      transition: all 0.3s;

      &.router-link-exact-active, &:hover {
        color: @primary-color;

        &:after {
          position: absolute;
          content: "";
          background-color: @primary-color;
          width: 100%;
          height: 1px;
          left: 0;
          top: 22px;
        }
      }
    }
  }
}
</style>
