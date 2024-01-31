import { randomUUID } from "node:crypto"
import { describe, expect, test } from "vitest"

import { Id } from "./id"

describe("Id value object", () => {
  test("Should be able to instantiate a id value-object", async () => {
    const input = randomUUID()

    const id = new Id(input)

    expect(id.value).toBe(input)
    expect(id.isEqual(new Id(input))).toBe(true)
    expect(Id.isValid(input)).toBe(true)
  })

  test("Should be able to generate a id value-object", async () => {
    const id = Id.generate()

    expect(id).toBeInstanceOf(Id)
    expect(id.value).toBeDefined()
  })

  test("Should be able to create a id value-object", async () => {
    const input = randomUUID()

    const id = Id.create(input).value

    expect(id).toBeInstanceOf(Id)
    expect(id.value).toBe(input)
  })

  test("Should not be able to create a id value-object with invalid input", async () => {
    const input = "invalid"

    const id = Id.create(input).error

    expect(id).toBe(Id.errorMessage)
    expect(Id.isValid(input)).toBe(false)
  })
})
