export class Right<L, R> {
  constructor(_: L, private _value: R) {}

  getRight = (): R => this._value;

  getLeft = (): L => null;

  isRight(): boolean {
    return true;
  }

  fold<T>(leftFn: (_: L) => T, rightFn: (_: R) => T): T {
    return rightFn(this._value);
  }
}
