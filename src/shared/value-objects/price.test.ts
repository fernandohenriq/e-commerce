import { describe, expect, test } from "vitest"

import { Price } from "./price"

describe("Price", () => {
  test("Should be able to instantiate a price value-object", async () => {
    const input = 1

    const result = new Price(input)

    expect(result.value).toBe(input)
    expect(Price.isNumber(input)).toBe(true)
    expect(result.isEqual(new Price(input))).toBe(true)
    expect(result.isGreaterThan(new Price(0))).toBe(true)
    expect(result.isLessThan(new Price(2))).toBe(true)
  })

  test("Should be able to create a price value-object", async () => {
    const input = 1

    const price = Price.create(input).value

    expect(price.value).toBe(input)
    expect(Price.isNumber(input)).toBe(true)
    expect(price.isEqual(new Price(input))).toBe(true)
    expect(price.isGreaterThan(new Price(0))).toBe(true)
    expect(price.isLessThan(new Price(2))).toBe(true)
  })

  test("Should not be able to create a price value-object from a invalid input", async () => {
    const input = "abc123" as any

    const result = Price.create(input)

    expect(result.isFailure()).toBe(true)
    expect(result.error).toBe("Invalid input for price")
  })
})
