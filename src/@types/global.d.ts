export global {
  export type PropsOf<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
  }

  export type Search<T> = {
    page?: number
    limit?: number
    sort?: 'asc' | 'desc'
    orderBy?: keyof T
    where?: Partial<Record<keyof T, any>> & Record<string, any>
  }
}