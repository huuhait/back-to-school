<script setup lang="ts">
import moment from 'moment'
import type { TableColumn } from '~/types'
import { ParseType, SortType } from '~/types'

enum SortKind {
  Up = 'up',
  Down = 'down',
  None = 'none',
}

const props = withDefaults(defineProps<{
  title?: string
  loading?: boolean
  columns: TableColumn[]
  headEnabled?: boolean
  dataSource: any[]
  border?: boolean
  pagination?: boolean
  page?: number
  pageSize?: number
  scroll?: boolean
  hover?: boolean
  isRouterLink?: boolean
  routerBuilder?: string
  selectedIndex?: number
}>(), {
  columns: () => [] as TableColumn[],
  dataSource: () => [] as any[],
  selectedIndex: -1,
  headEnabled: true,
})
const emit = defineEmits(['click', 'scroll-bottom'])
const instance = getCurrentInstance()

const state = reactive({
  sort_key: ref<string>(),
  sort_type: ref<SortKind>(),
  sort_by: ref<SortType>(),
})

const isSort = computed(() => {
  for (const column of props.columns) {
    if (column.sort) return true
  }

  return false
})

const isEmpty = computed(() => {
  return props.dataSource.length === 0
})

const dataFilter = computed(() => {
  if (!state.sort_key) return props.dataSource
  if (state.sort_type === SortKind.None) return props.dataSource

  const data = [...props.dataSource]
  const sort_key = state.sort_key

  data.sort((a: any, b: any) => {
    const a_value = getValueByKey(sort_key, a)
    const b_value = getValueByKey(sort_key, b)

    if (state.sort_by === SortType.Number) {
      return parseFloat(a_value) - parseFloat(b_value)
    }
    else {
      return a_value.localeCompare(b_value)
    }
  })

  return state.sort_type === SortKind.Down ? data.reverse() : data
})

const indexSelected = computed(() => {
  if (props.selectedIndex === -1) return -1

  const item_selected = props.dataSource[props.selectedIndex]

  for (let index = 0; index < dataFilter.value.length; index++) {
    const item = dataFilter.value[index]

    const eq = Object.is(item_selected, item)

    if (eq) return index
  }
})

function routerLink(item: any) {
  if (!props.isRouterLink) return
  if (!props.routerBuilder) return
  let routerBuilder = props.routerBuilder

  let start_index = 0
  for (let i = 0; i < routerBuilder.length; i++) {
    const str = routerBuilder[i]
    if (str === '#') {
      start_index = i
      continue
    }
    if (str === '}') {
      const param = routerBuilder.slice(start_index, i + 1)
      let param_key = param.replace(/#\{|\}/gi, '')

      const toUpper = param_key.includes('toUpper')
      const toLower = param_key.includes('toLower')

      if (toUpper) {
        param_key = param_key.replace('.toUpper', '')
      }
      else if (toLower) {
        param_key = param_key.replace('.toLower', '')
      }

      let value = getValueByKey(param_key, item)
      if (toUpper) {
        value = value.toUpperCase()
      }
      else if (toLower) {
        value = value.toLowerCase()
      }

      routerBuilder = routerBuilder.replace(param, value)
      i = 0
      continue
    }
  }

  return routerBuilder
}

function setSortKey(key: string, sort_by: SortType = SortType.String) {
  const column = props.columns.find(column => column.key === key)
  if (!column?.sort) {
    return
  }

  const current_key = state.sort_key
  state.sort_key = key
  state.sort_by = sort_by

  if (current_key !== key) {
    state.sort_type = SortKind.Up

    return
  }

  if (state.sort_type === SortKind.None) {
    state.sort_type = SortKind.Up
  }
  else if (state.sort_type === SortKind.Up) {
    state.sort_type = SortKind.Down
  }
  else {
    state.sort_key = undefined
    state.sort_type = SortKind.None
  }
}

function getValueByKey(key: string, item: any, parse?: ParseType, precision?: TableColumn['precision']) {
  const column = props.columns.find(column => column.key === key)

  let value

  if (key.includes('.')) {
    const keys = key.split('.')
    let inv: any = null

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]

      if (index === 0) {
        inv = item[key]
      }
      else {
        inv = inv[key]
      }
    }

    value = inv
  }
  else {
    value = item[key]
  }

  if (parse === ParseType.Decimal) {
    const vprecision = typeof precision === 'function' ? precision(item) : precision

    value = Number(value)
    if (value === 0) {
      value = '--'
    } else if (vprecision !== undefined && vprecision !== null) {
      value = value.toLocaleString(undefined, { minimumFractionDigits: vprecision, maximumFractionDigits: vprecision })
    }
  } else if (parse === ParseType.Time || parse === ParseType.DateTime) {
    switch (typeof value) {
      case 'number':
        value = moment.unix(value)
        break
      case 'string':
        value = moment(value)
        break
      default:
        break
    }
  }

  if (column?.prefix) {
    const vprefix = typeof column.prefix === 'function' ? column.prefix(item) : column.prefix

    value = `${vprefix} ${value}`
  }

  if (column?.suffix) {
    const vsuffix = typeof column.suffix === 'function' ? column.suffix(item) : column.suffix

    value = `${value} ${vsuffix}`
  }

  return value
}

onMounted(() => {
  const content = instance?.proxy?.$refs.content as HTMLElement

  content.addEventListener('scroll', () => {
    if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
      emit('scroll-bottom')
    }
  })
})
</script>

<template>
  <div
    :class="[
      'table',
      {
        'table-loading': loading,
        'table-scrollable': scroll,
        'table-hoverable': hover,
        'table-headable': headEnabled,
        'table-sortable': isSort
      }
    ]"
  >
    <div v-if="title" class="table-title">
      {{ title }}
    </div>
    <div v-if="headEnabled" class="table-head">
      <template v-for="column in columns">
        <span v-if="!column.hideColumn" :key="column.key" :class="[column.key, column.class, `text-${column.align || 'left'}`]">
          <span :class="{ 'table-head-sortable': column.sort }" @click="setSortKey(column.key, column.sortBy)">
            <template v-if="column.headScopedSlots">
              <slot :name="`head.${column.key}`" />
            </template>
            <template v-else>
              {{ column.title }}
              <div v-if="column.sort" class="table-head-sort-caret">
                <Icon type="caret-up" :class="['up', { active: state.sort_key == column.key && state.sort_type == 'up' }]" />
                <Icon type="caret-down" :class="['down', { active: state.sort_key == column.key && state.sort_type == 'down' }]" />
              </div>
            </template>
          </span>
        </span>
      </template>
    </div>
    <div ref="content" class="table-content">
      <div v-if="loading" />
      <div v-else-if="isEmpty" class="table-empty w-full h-full flex flex-col items-center justify-center">
        <Icon type="print" />
        Empty
      </div>
      <TableRow v-for="(item, index) in dataFilter" :key="index" :selected="indexSelected == index" :is-router-link="isRouterLink" :to="routerLink(item)" @click="emit('click', item)">
        <template v-for="(column) in columns" :key="column.key">
          <span
            :class="[
              'table-row-col',
              `table-row-col-align-${column.align || 'left'}`,
              column.key.split('.')[column.key.split('.').length - 1],
              column.class
            ]"
          >
            <slot
              v-if="column.scopedSlots"
              :name="column.key"
              :item="item"
              :column="column"
            />
            <span v-else class="table-row-col-content">
              <template v-if="column.formatBy == 'datetime'">
                {{ getValueByKey(column.key, item, column.parse).format("YYYY-MM-DD hh:mm:ss") }}
              </template>
              <template v-else-if="column.formatBy == 'time'">
                {{ getValueByKey(column.key, item, column.parse).format("hh:mm:ss") }}
              </template>
              <template v-else-if="column.toUpper">
                {{ getValueByKey(column.key, item, column.parse).toUpperCase() }}
              </template>
              <template v-else-if="column.toLower">
                {{ getValueByKey(column.key, item, column.parse).toLowerCase() }}
              </template>
              <template v-else>
                {{ getValueByKey(column.key, item, column.parse, column.precision) }}
              </template>
            </span>
          </span>
        </template>
      </TableRow>
    </div>
  </div>
</template>

<style lang="less">
@gray-color: rgb(144, 147, 151);
@action-color: rgb(168, 165, 165);
@border-color: #e9e9e9;

.table {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  background-color: #fff;
  border: 1px solid @border-color;
  padding-bottom: 24px;

  &-title {
    position: relative;
    padding: 12px 16px;
    font-size: 20px;

    &::after {
      position: absolute;
      content: "";
      background-color: rgb(138, 143, 150);
      width: 100px;
      height: 3px;
      left: 16px;
      bottom: 8px;
    }
  }

  &-empty {
    color: @gray-color;
    font-size: 16px;

    i {
      font-size: 100px;
    }
  }

  &-hoverable &-row {
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &-scrollable {
    .table-head {
      position: absolute;

      & + .table-content {
        top: 32px;
        height: calc(100% - 32px);
      }
    }

    .table-content {
      position: absolute;
      top: 0;
      overflow-y: auto;
      height: 100%;
    }
  }

  &-headable &-content {
    height: calc(100% - 32px);
  }

  &-head {
    position: relative;
    color: @gray-color;
    user-select: none;

    &-sortable {
      position: relative;
      padding-right: 16px;
      cursor: pointer;
    }

    &-sort-caret {
      position: absolute;
      right: 0;
      top: 0;
      height: 32px;
      font-size: 9px;

      > i {
        position: absolute;
        transform: translateX(-100%) scale(.5);
        opacity: 0.5;

        &.active {
          opacity: 1;
          color: @action-color;
        }
      }

      .up {
        top: 2px;
      }

      .down {
        bottom: 15px;
      }
    }
  }

  &-content {
    position: relative;
    width: 100%;
  }

  &-head, &-row {
    display: flex;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid @border-color;

    > span {
      flex: 1;
    }
  }

  &-row {
    position: relative;

    &-col {
      display: flex;
      align-items: center;

      &-align-left {
        justify-content: start;
      }

      &-align-center {
        justify-content: center;
      }

      &-align-right {
        justify-content: end;
      }

      &-content {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }

  a.table-row {
    color: inherit;

    &:hover {
      color: inherit;
    }
  }
}
</style>
