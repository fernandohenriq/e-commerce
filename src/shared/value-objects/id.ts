import { randomUUID } from "node:crypto"

import { Result } from "../result/result"

export class Id {
  static readonly errorMessage = "Invalid UUID"
  static readonly regex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  readonly value: string

  constructor(value: string) {
    this.value = value
  }

  isEqual(other: Id): boolean {
    return this.value === other.value
  }

  static isValid(input: string): boolean {
    if (typeof input !== "string") return false
    return Id.regex.test(input)
  }

  static generate(): Id {
    return new Id(randomUUID())
  }

  static create(input: string = randomUUID()): Result<Id> {
    if (!Id.isValid(input)) {
      return Result.fail(Id.errorMessage)
    }
    return Result.ok(new Id(input))
  }
}
