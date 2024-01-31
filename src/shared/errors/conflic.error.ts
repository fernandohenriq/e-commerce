import { AppError } from "./app.error"

export class ConflictError extends AppError {
  constructor(message: string, err?: any) {
    super({
      statusCode: 409,
      statusMessage: "conflict",
      message,
      error: err,
    })
  }
}
