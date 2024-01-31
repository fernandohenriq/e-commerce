import { AppError } from "./app.error"

export class ForbiddenError extends AppError {
  constructor(message: string, err?: any) {
    super({
      statusCode: 403,
      statusMessage: "forbidden",
      message,
      error: err,
    })
  }
}
