import { AppError } from "./app.error"

export class UnauthorizedError extends AppError {
  constructor(message: string, err?: any) {
    super({
      statusCode: 401,
      statusMessage: "unauthorized",
      message,
      error: err,
    })
  }
}
