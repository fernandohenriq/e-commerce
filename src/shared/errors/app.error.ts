export class AppError extends Error {
  readonly name = "AppError"
  readonly statusCode: number = 500
  readonly statusMessage: string = "internal_server_error"
  readonly message: string = "An unexpected error occurred."
  readonly error: any

  constructor(props: PropsOf<Omit<Partial<AppError>, "name">>) {
    super()
    Object.assign(this, {
      ...props,
    })
  }
}
