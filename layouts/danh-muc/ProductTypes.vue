<script setup lang="ts">
const product_types = useState('product_types', () => ([{
  key: 'dong-ho-nam',
  name: 'ĐỒNG HỒ NAM',
},
{
  key: 'dong-ho-nu',
  name: 'ĐỒNG HỒ NỮ',
}]))
</script>

<template>
  <div class="product-types">
    <div class="product-types-title">
      DANH MỤC SẢN PHẨM
    </div>

    <div class="product-types-content">
      <NuxtLink v-for="(product_type, index) in product_types" :key="index" :to="`/danh-muc/${product_type.key}`" class="product-types-item">
        {{ product_type.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="less">
.product-types {
  &-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  &-content {
    border: 1px solid #ddd;
    padding: 12px;
    background-color: rgba(221, 221, 221, 0.1);
  }

  &-item {
    display: block;
    font-size: 14px;
    line-height: 35px;
    color: #334862;

    &:hover {
      color: #000;
    }
  }
}
</style>
