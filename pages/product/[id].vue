<script setup lang="ts">
import SameProducts from '~/layouts/product/SameProducts.vue'

const product = {
  id: 1,
  name: 'Đồng hồ giá rẻ 2k 1 cái',
  image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
  price: '150000',
  description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less',
  discount: 0.2,
}
</script>

<template>
  <LayoutContent class="page-product">
    <Container class="flex">
      <div class="w-6/12">
        <img class="" :src="product.image">
      </div>
      <div class="w-6/12 pt-16">
        <h2 class="pt-6 text-3xl font-bold pb-4 border-b-[3px] inline-block">{{ product.name }}</h2>
        <p class="pt-4 pb-4 font-bold text-red-600">Sale: {{ product.discount * 100 }}%</p>
        <span class="line-through text-2xl text-amber-700 opacity-40 mr-4">{{ Number(product.price).toLocaleString() }}đ</span>
        <span class="font-bold text-2xl text-amber-700">{{ (Number(product.price) - (Number(product.price) * product.discount)).toLocaleString() }}đ</span>
        <p class="pt-8">{{product.description}}</p>
        <div class="pt-12 flex items-center">
          <div class="product-quantity flex mr-10 border-2">
            <input class="border-2 cursor-pointer h-10 w-6 hover:bg-slate-100" type="button" value="-">
            <input class="text-center h-10 border-t-[2px] border-b-[2px] m-0 w-10" type="text" value="1">
            <input class="border-2 cursor-pointer h-10 w-6 hover:bg-slate-100" type="button" value="+">
          </div>
          <Button class="text-base w-44 h-10">
            THÊM VÀO GIỎ
          </Button>
        </div>
      </div>
    </Container>

    <SameProducts class="mb-10" />
  </LayoutContent>
</template>

<style lang="less">
.page-product {

}
</style>
