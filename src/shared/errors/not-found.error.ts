import { AppError } from "./app.error"

export class NotFoundError extends AppError {
  constructor(message: string, err?: any) {
    super({
      statusCode: 404,
      statusMessage: "not_found",
      message,
      error: err,
    })
  }
}
