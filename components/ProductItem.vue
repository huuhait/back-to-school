<script setup lang="ts">
defineProps<{
  product: any
}>()
</script>

<template>
  <div class="product-item">
    <NuxtLink :to="`/product/${product.id}`" class="block border border-gray-300">
      <div class="product-image">
        <img :src="product.image">
      </div>

      <div class="product-item-content border-t border-gray-300">
        <div class="product-item-title bold-text">
          {{ product.name }}
        </div>
        <div class="product-item-price">
          <span v-if="product.discount > 0" class="product-item-price-old">
            {{ Number(product.price).toLocaleString() }}đ
          </span>
          <span class="product-item-price-now bold-text">
            {{ (Number(product.price) - (Number(product.price) * product.discount)).toLocaleString() }} đ
          </span>
        </div>

        <span class="product-item-link" :to="`/product/${product.id}`">
          XEM CHI TIẾT
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="less">
.product-item {
  &-image {
    width: 100%;

    img {
      width: 100%;
    }
  }

  &-content {
    padding: 16px 0;
    text-align: center;
  }

  &-title {
    font-size: 18px;
  }

  &-price {
    color: @primary-color;
    font-size: 16px;
    margin-top: 4px;

    &-old {
      font-size: 14px;
      text-decoration: line-through;
    }
  }

  &-link {
    display: inline-block;
    background-color: @primary-color;
    color: #fff;
    font-size: 14px;
    padding: 4px 8px;
    margin-top: 12px;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(@primary-color, 0.75)
    }
  }
}
</style>
