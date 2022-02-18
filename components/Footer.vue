<script setup lang="ts">
import { AtSymbolIcon, LocationMarkerIcon, PhoneIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div class="footer">
    <div class="footer-body block w-full border-b border-gray-500">
      <Container class="flex">
        <div class="footer-nav flex-1">
          <div class="footer-nav-title bold-text">
            THÔNG TIN LIÊN HỆ
          </div>
          <div class="footer-nav-item text-sm flex">
            <LocationMarkerIcon class="w-4 h-4 mr-1" /> 319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
          </div>
          <div class="footer-nav-item text-sm flex">
            <PhoneIcon class="w-4 h-4 mr-1" /> 1900.12548
          </div>
          <div class="footer-nav-item text-sm flex">
            <AtSymbolIcon class="w-4 h-4 mr-1" /> fake@fake.com
          </div>
        </div>
        <div class="footer-nav flex-1">
          <div class="footer-nav-title bold-text">
            LIÊN KẾT
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Giới thiệu</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Đồng hồ nam</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Đồng hồ nữ</a>
          </div>
        </div>
        <div class="footer-nav flex-1">
          <div class="footer-nav-title bold-text">
            HỖ TRỢ
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
        </div>
        <div class="footer-nav flex-1">
          <div class="footer-nav-title bold-text">
            TẢI ỨNG DỤNG TRÊN
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
          <div class="footer-nav-item text-sm flex">
            <a href="#">Example</a>
          </div>
        </div>
      </Container>
    </div>

    <Container class="footer-credit">
      © I ĐÔN NÔ
    </Container>
  </div>
</template>

<style lang="less">
.footer {
  background-color: #333;
  color: #fff;

  &-body {
    padding: 40px 0;
  }

  &-credit {
    padding: 12px 0;
  }

  &-nav {
    &-title {
      font-size: 18px;
      margin-bottom: 20px;
    }

    &-item {
      margin-right: 8px;
      padding: 6px 0;

      a:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
