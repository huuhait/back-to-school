<template>
  <Container class="trending-watch flex">
    <NuxtLink to="/" class="trending-watch-item relative flex-1 mr-4 nam">
      <div class="trending-watch-title bold-text">
        ĐỒNG HỒ NAM
      </div>
      <div class="bg" />
    </NuxtLink>
    <NuxtLink to="/" class="trending-watch-item relative flex-1 ml-4 nu">
      <div class="trending-watch-title bold-text">
        ĐỒNG HỒ NỮ
      </div>
      <div class="bg" />
    </NuxtLink>
  </Container>
</template>

<style lang="less">
.trending-watch {
  height: 300px;
  margin-top: 40px;
  color: #fff;

  &-item {
    cursor: pointer;
    overflow: hidden;

    &:hover {
      .bg {
        transform: scale(1.1);
      }
    }
  }

  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    transition: filter .6s, opacity .6s, transform .6s, box-shadow .3s;
  }

  .nam {
    .bg {
      background-position: 88% 0%;
      background-image: url("~/assets/img/trend-1.jpg");
    }
  }

  .nu {
    .bg {
      background-position: 88% 0%;
      background-image: url("~/assets/img/trend-2.jpg");
    }
  }

  &-title {
    position: absolute;
    z-index: 1;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 28px;

    &:after {
      position: absolute;
      content: "";
      left: 0;
      top: -8px;
      width: 75px;
      height: 2px;
      background-color: @primary-color;
    }
  }
}
</style>
