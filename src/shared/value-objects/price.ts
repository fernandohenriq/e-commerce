import { Result } from "../result/result"

export class Price {
  static readonly errorMessage = "Invalid input for price"
  readonly value: number

  constructor(input: number) {
    this.value = input
  }

  isEqual(other: Price): boolean {
    return this.value === other.value
  }

  isGreaterThan(other: Price): boolean {
    return this.value > other.value
  }

  isLessThan(other: Price): boolean {
    return this.value < other.value
  }

  static isNumber(input: any): input is number {
    return typeof input === "number" && !isNaN(input) && isFinite(input)
  }

  static create(input: number): Result<Price> {
    if (!input || isNaN(input) || !isFinite(input) || input <= 0) {
      return Result.fail(Price.errorMessage)
    }
    return Result.ok(new Price(input))
  }
}
