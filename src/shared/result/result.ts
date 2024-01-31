export class Result<T, E = any> {
  private _isSuccess: boolean
  private _isFailure: boolean
  private _error: T | string
  private _value: T

  constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error")
    }
    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message")
    }
    this._isSuccess = isSuccess
    this._isFailure = !isSuccess
    this._error = error
    this._value = value
    Object.freeze(this)
  }

  isSuccess(): boolean {
    return this._isSuccess
  }

  isFailure(): boolean {
    return this._isFailure
  }

  get value(): T {
    // if (!this._isSuccess) {
    //   throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    // }
    return this._value
  }

  get error(): E {
    return this._error as E
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error)
  }

  static combine(results: Result<any>[]): Result<any> {
    const errors: any[] = []
    for (const result of results) {
      if (result?.isFailure()) {
        errors.push(result.error)
      }
    }
    if (errors.length > 0) {
      return Result.fail(errors)
    }
    return Result.ok()
  }
}

export type Either<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isFailure(): this is Failure<L, A> {
    return true
  }

  isSuccess(): this is Success<L, A> {
    return false
  }
}

export class Success<L, A> {
  readonly value: A

  constructor(value: A) {
    this.value = value
  }

  isFailure(): this is Failure<L, A> {
    return false
  }

  isSuccess(): this is Success<L, A> {
    return true
  }
}

export const failure = <L, A>(l: L): Either<L, A> => {
  return new Failure(l)
}

export const success = <L, A>(a: A): Either<L, A> => {
  return new Success<L, A>(a)
}
