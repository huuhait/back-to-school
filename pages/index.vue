<script setup lang="ts">
import SlideShow from '~/layouts/home/SlideShow.vue'
import SaleProducts from '~/layouts/home/SaleProducts.vue'
import Trending from '~/layouts/home/Trending.vue'
</script>

<template>
  <LayoutContent class="mb-10">
    <SlideShow />
    <Trending />
    <SaleProducts />
  </LayoutContent>
</template>
