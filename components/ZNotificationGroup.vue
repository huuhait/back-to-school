<script setup lang="ts">
import ZEventBus from '~/library/ZEventBus'
import { Placement } from '~/types'
const childrens = ref<any[]>([])
const lstNotificationTopCenter = computed(() => {
  return childrens.value.filter(child => child.key.includes(Placement.TopCenter))
})
const lstNotificationTopRight = computed(() => {
  return childrens.value.filter(child => child.key.includes(Placement.TopRight))
})
onMounted(() => {
  ZEventBus.on('z-new-notification', appendNewNotification)
  ZEventBus.on('z-remove-notification', removeNotification)
})
onBeforeUnmount(() => {
  ZEventBus.off('z-new-notification', appendNewNotification)
  ZEventBus.off('z-remove-notification', removeNotification)
})
function removeNotification(key: any) {
  const index = childrens.value.findIndex(child => child.key === key)
  if (index === -1) return
  childrens.value.splice(index, 1)
}
function appendNewNotification(notification: any) {
  childrens.value.push(notification)
}
</script>

<template>
  <div class="z-notification-group">
    <div class="z-notification-group-topCenter">
      <transition-group name="z-notification-group-topCenter" tag="div">
        <template v-for="child in lstNotificationTopCenter" :key="child.key">
          <component :is="child" />
        </template>
      </transition-group>
    </div>
    <div class="z-notification-group-topRight">
      <transition-group name="z-notification-group-topRight" tag="div">
        <template v-for="child in lstNotificationTopRight" :key="child.key">
          <component :is="child" />
        </template>
      </transition-group>
    </div>
  </div>
</template>

<style lang="less">
@white-color: #fff;
@action-color: rgb(77, 89, 100);
@gray-color: rgb(77, 89, 100);

.z-notification {
  position: relative;
  display: flex;
  background-color: @white-color;
  padding: 16px 24px;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 12px #45566d6e;
  transition: all 0.3s;
  &-icon {
    margin-right: 12px;
    font-size: 20px;
  }
  &-group {
    &-topCenter {
      width: 384px;
      position: fixed;
      top: 55px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;
      &-enter-active, &-leave-active {
        transition: all 0.3s;
      }
      &-enter-active, &-leave-to {
        opacity: 0;
        transform: translateY(-100%);
      }
    }
    &-topRight {
      width: 384px;
      position: fixed;
      top: 55px;
      right: 16px;
      opacity: 1;
      &-enter-active, &-leave-active {
        transition: all 0.3s;
      }
      &-enter-active, &-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  }
  &-content {
    display: flex;
    justify-content: center;
    flex-flow: column;
    flex-direction: column;
  }
  &-title {
    display: inline-block;
    padding-right: 24px;
    font-size: 16px;
    line-height: 24px;
  }
  &-title + &-description {
    margin-top: 8px;
  }
  &-description {
    font-size: 14px;
    font-weight: normal;
  }
  &-close {
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    right: 14px;
    color: @gray-color;
    transition: all 0.3s;
    &:hover {
      color: @action-color;
    }
  }
}
</style>
