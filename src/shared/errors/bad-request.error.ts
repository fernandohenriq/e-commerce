import { AppError } from "./app.error"

export class BadRequestError extends AppError {
  constructor(message: string, err?: any) {
    super({
      statusCode: 400,
      statusMessage: "bad_request",
      message,
      error: err,
    })
  }
}
