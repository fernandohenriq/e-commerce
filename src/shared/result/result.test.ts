import { beforeAll, beforeEach, describe, expect, test } from "vitest"

import { AppError } from "../errors/app.error"
import { BadRequestError } from "../errors/bad-request.error"
import { Result } from "./result"

describe("Result", () => {
  test("Should be able to instantiate a result value-object", async () => {
    const input = 1

    const result = Result.ok(input)

    expect(result.value).toBe(input)
    expect(result.isSuccess()).toBe(true)
    expect(result.isFailure()).toBe(false)
    expect(result.error).toBe(null)
  })

  test("Should not be able to instantiate a result value-object from a invalid input", async () => {
    const sut = (): Result<true> => {
      return Result.fail("You shall not pass!")
    }

    const result = sut()

    expect(result.value).toBe(undefined)
    expect(result.isSuccess()).toBe(false)
    expect(result.isFailure()).toBe(true)
    expect(result.error).toBe("You shall not pass!")
  })

  test("Should be able to combine errors from results", async () => {
    const result1 = Result.fail("Error 1")
    const result2 = Result.fail("Error 2")
    const result3 = Result.fail("Error 3")

    const result = Result.combine([result1, result2, result3])

    expect(result).toBeInstanceOf(Result)
    expect(result.isFailure()).toBe(true)
    expect(result.isSuccess()).toBe(false)
    expect(result.value).toBe(undefined)
    expect(result.error).toEqual(["Error 1", "Error 2", "Error 3"])
  })
})
