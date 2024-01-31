import { beforeAll, beforeEach, describe, expect, test } from "vitest"

import { Timestamp } from "./timestamp"

describe("timestamp", () => {
  test("Should be able to instantiate a timestamp value-object", async () => {
    const input = 1704067200000 // 2024-01-01 00:00:00

    const timestamp = new Timestamp(input)

    expect(timestamp.value).toBe(input)
    expect(timestamp.format()).toBe("2024-01-01 00:00:00")
    expect(timestamp.format("dd/MM/yyyy HH:mm:ss")).toBe("01/01/2024 00:00:00")
  })

  test("Should be able to create a timestamp value-object", async () => {
    const input = 1704067200000

    const timestamp = Timestamp.create(input).value

    expect(timestamp.value).toBe(input)
    expect(timestamp.format()).toBe("2024-01-01 00:00:00")
    expect(timestamp.format("dd/MM/yyyy HH:mm:ss")).toBe("01/01/2024 00:00:00")
  })
})
