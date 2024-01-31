import { describe, expect, test } from "vitest"

import { AppError } from "./app.error"

describe("AppError", () => {
  test("Should be able to instantiate a AppError value-object", async () => {
    const input = {
      statusCode: 400,
      statusMessage: "bad_request",
      message: "You shall not pass!",
      error: null,
    }

    const appError = new AppError(input)

    expect(appError.name).toBe("AppError")
    expect(appError.statusCode).toBe(input.statusCode)
    expect(appError.statusMessage).toBe(input.statusMessage)
    expect(appError.message).toBe(input.message)
    expect(appError.error).toBe(input.error)

    expect(() => {
      throw new AppError(input)
    }).toThrow("You shall not pass!")
  })
})
