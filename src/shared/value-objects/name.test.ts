import exp from "constants"
import { beforeAll, beforeEach, describe, expect, test } from "vitest"

import { Name } from "./name"

describe("Name", () => {
  test("Should be able to instantiate a name value-object", async () => {
    const input = "John Doe"

    const name = new Name(input)

    expect(name.value).toBe(input)
    expect(name.equals(new Name(input))).toBe(true)
  })

  test("Should be able to create a name value-object", async () => {
    const input = "John Doe"

    const name = Name.create(input).value

    expect(name.value).toBe(input)
    expect(name.equals(new Name(input))).toBe(true)
  })

  test("Should not be able to create a name value-object with invalid input", async () => {
    const input = "Jo" // too short

    const error = Name.create(input).error

    expect(error).toBeDefined()
    expect(error).toBe(Name.errorMessage)
  })
})
