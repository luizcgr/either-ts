export class Left<L, R> {
  constructor(private _value: L, _: R) {}

  getLeft = (): L => this._value;

  getRight = (): R => null;

  isRight = (): boolean => {
    return false;
  };

  fold<T>(leftFn: (_: L) => T, rightFn: (_: R) => T): T {
    return leftFn(this._value);
  }
}
