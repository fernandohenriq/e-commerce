export type Req<T = unknown> = T & {
  body?: any
  params?: any
  query?: any
  auth?: {
    userId: string
    role: string
    token: string
  }
}

export type Res<T = unknown> = T & {
  send: (data: any) => void
  status: (code: number) => Res<T>
  json: (data: any) => void
}
