import { Result } from "../result/result"

export class Name {
  static readonly errorMessage = "Name must be at least 3 characters long"
  static readonly regex: RegExp = /^.{3,}$/
  readonly value: string

  constructor(value: string) {
    this.value = value
  }

  equals(other: Name): boolean {
    return this.value === other.value
  }

  static isValid(value: string): boolean {
    return Name.regex.test(value)
  }

  static create(value: string): Result<Name> {
    if (!Name.isValid(value)) {
      return Result.fail(Name.errorMessage)
    }
    return Result.ok(new Name(value))
  }
}
