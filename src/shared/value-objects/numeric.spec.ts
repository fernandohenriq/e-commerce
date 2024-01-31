import { describe, expect, test } from "vitest"

import { Numeric } from "./numeric"

describe("Numeric", () => {
  test("Should be able to instantiate a numeric value-object", async () => {
    const input = 1

    const result = new Numeric(input)

    expect(result.value).toBe(input)
    expect(Numeric.isNumber(input)).toBe(true)
    expect(result.isEqual(new Numeric(input))).toBe(true)
    expect(result.isGreaterThan(new Numeric(0))).toBe(true)
    expect(result.isLessThan(new Numeric(2))).toBe(true)
  })

  test("Should be able to create a numeric value-object", async () => {
    const input = 1

    const numeric = Numeric.create(input).value

    expect(numeric.value).toBe(input)
    expect(Numeric.isNumber(input)).toBe(true)
    expect(numeric.isEqual(new Numeric(input))).toBe(true)
    expect(numeric.isGreaterThan(new Numeric(0))).toBe(true)
    expect(numeric.isLessThan(new Numeric(2))).toBe(true)
  })

  test("Should not be able to create a numeric value-object from a invalid input", async () => {
    const input = "abc123" as any

    const result = Numeric.create(input)

    expect(result.isFailure()).toBe(true)
    expect(result.error).toBe("Invalid input for Numeric")
  })
})
