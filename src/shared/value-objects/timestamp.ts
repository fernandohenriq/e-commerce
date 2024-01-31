import { format, isValid, parse } from "date-fns"

import { Result } from "../result/result"

const invalidDateFormats = [
  "yyyy/MM/dd",
  "dd/MM/yyyy",
  "dd/MM/yy",
  "dd-MM-yy",
  "dd-MM-yy HH:mm",
  "dd-MM-yy HH:mm:ss",
  "dd-MM-yyyy",
  "yyyy-MM-dd",
  "yyyy-MM-dd HH:mm",
  "yyyy/MM/dd HH:mm",
  "yyyy/MM/dd HH:mm:ss",
  "yyyy-MM-ddTHH:mm:ss",
]

export class Timestamp {
  readonly value: number

  constructor(input: number) {
    this.value = input
  }

  static isValid(input: number | string | Date): boolean {
    if (input instanceof Date) {
      return !!input.getTime()
    }
    if (typeof input === "string") {
      try {
        const formatted = format(input, "yyyy-MM-dd HH:mm:ss")
        const timestamp = new Date(formatted).getTime()
        input = timestamp
      } catch (error) {
        const dateParsed = Timestamp.parse(input as string)
        if (dateParsed === null) {
          return false
        }
        const timestamp = dateParsed.getTime()
        input = timestamp
      }
    }
    if (isNaN(new Date(input).getTime())) {
      return false
    }
    return true
  }

  static create(input: number | string): Result<Timestamp> {
    if (!this.isValid(input)) {
      return Result.fail("Invalid Timestamp")
    }
    return Result.ok(new Timestamp(Number(input)))
  }

  static parse(dateString: string): Date | null {
    for (const invalidDateFormat of invalidDateFormats) {
      const parsedDate = parse(dateString, invalidDateFormat, new Date())
      if (isValid(parsedDate)) {
        return parsedDate
      }
    }
    return null
  }

  toDate(): Date {
    return new Date(this.value)
  }

  format(formatString: string = "yyyy-MM-dd HH:mm:ss"): string {
    const date = this.toDate()
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const second = date.getUTCSeconds()
    const millisecond = date.getUTCMilliseconds()
    const dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}:${millisecond}`
    return format(dateString, formatString)
  }

  isEqual(other: Timestamp): boolean {
    return this.value === other.value
  }

  isBefore(other: Timestamp): boolean {
    return this.value < other.value
  }

  isAfter(other: Timestamp): boolean {
    return this.value > other.value
  }
}
