import { Result } from "../result/result"

export class Numeric {
  static readonly errorMessage = "Invalid input for Numeric"
  readonly value: number

  constructor(input: number) {
    this.value = input
  }

  static isNumber(input: any): input is number {
    return typeof input === "number" && !isNaN(input) && isFinite(input)
  }

  static create(input: number): Result<Numeric> {
    if (isNaN(input) || !isFinite(input)) {
      return Result.fail(Numeric.errorMessage)
    }
    return Result.ok(new Numeric(input))
  }

  isEqual(other: Numeric): boolean {
    return this.value === other.value
  }

  isGreaterThan(other: Numeric): boolean {
    return this.value > other.value
  }

  isLessThan(other: Numeric): boolean {
    return this.value < other.value
  }
}
