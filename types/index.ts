export enum Placement {
  BottomLeft = 'bottomLeft',
  BottomCenter = 'bottomCenter',
  BottomRight = 'bottomRight',
  TopLeft = 'topLeft',
  TopCenter = 'topCenter',
  TopRight = 'topRight',
}

export interface NoticeOptions {
  placement?: Placement
  duration?: number
}

export interface MessageOptions extends NoticeOptions {
  message: string
}

export interface NotificationOptions extends NoticeOptions {
  title?: string
  description?: string
}

export enum NoticeType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

export enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum Format {
  DateTime = 'datetime',
  Time = 'time',
  Price = 'price',
}

export enum SortType {
  Number = 'Number',
  String = 'String',
}

export enum ParseType {
  DateTime = 'datetime',
  Time = 'time',
  Decimal = 'decimal',
}

export interface TableColumn {
  key: string
  title?: string
  class?: string
  align?: Align
  sort?: boolean
  sortBy?: SortType
  scopedSlots?: boolean
  headScopedSlots?: boolean
  formatBy?: Format
  sideKey?: string
  toUpper?: boolean
  toLower?: boolean
  hideColumn?: boolean
  parse?: ParseType
  precision?: number | ((item: any) => number)
  prefix?: string | ((item: any) => string)
  suffix?: string | ((item: any) => string)
}

export type User = {
  id: number
  email: string
  password: string
  fullname: string
  address: string
  created_at: Date
  updated_at: Date
  carts?: Cart[]
}

export type Cart = {
  id: number
  userId: number
  created_at: Date
  updated_at: Date
  products_cart?: ProductCart[]
  user: User
}

export type ProductCart = {
  id: number
  cartId: number
  productId: number
  quantity: number
  price: number
  created_at: Date
  updated_at: Date
  product?: Product
}

export type Category = {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export type Product = {
  id: number
  categoryId: number
  name: string
  price: number
  discount: number
  description: string
  image: string
  created_at: Date
  updated_at: Date
}

export interface CartStore {
  productId: number
  quantity: number
}

export type StorageLike = Pick<Storage, 'getItem' | 'removeItem' | 'setItem'>

export interface PersistedStateOptions {
  /**
   * Storage key to use.
   * @default $store.id
   */
  key?: string

  /**
   * Where to store persisted state.
   * @default localStorage
   */
  storage?: StorageLike

  /**
   * Dot-notation paths to partially save state.
   * @default undefined
   */
  paths?: Array<string>

  /**
   * Overwrite initial state (patch otherwise).
   * @default false
   */
  overwrite?: boolean
}
