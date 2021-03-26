class Right<L, R> {
  constructor(_: L, private _value: R) {}

  getRight = (): R => this._value

  getLeft = (): L => null

  isRight(): boolean {
    return true
  }

  fold<T>(leftFn: (_: L) => T, rightFn: (_: R) => T): T {
    return rightFn(this._value)
  }
}

class Left<L, R> {
  constructor(private _value: L, _: R) {}

  getLeft = (): L => this._value

  getRight = (): R => null

  isRight = (): boolean => {
    return false
  }

  fold<T>(leftFn: (_: L) => T, rightFn: (_: R) => T): T {
    return leftFn(this._value)
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export type EitherP<L, R> = Promise<Either<L, R>>

export const right = <L, R>(value: R) => new Right<L, R>(null, value)

export const left = <L, R>(value: L) => new Left<L, R>(value, null)
