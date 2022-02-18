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
