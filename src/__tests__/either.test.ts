import { Either, left, right } from "../either";

describe("Either", () => {
  test("dado um left, então verifica isLeft", () => {
    let result: Either<Error, string>;
    result = left(new Error("teste"));
    expect(result.isRight()).toBeFalsy();
  });

  test("dada um right, então verifica isRight", () => {
    const result: Either<Error, boolean> = right(true);
    expect(result.isRight()).toBeTruthy();
  });

  test("dado um right, então verifica valor contido", () => {
    const result: Either<Error, number> = right(12345);
    expect(result.getRight()).toBe(12345);
    expect(result.getLeft()).toBeNull();
  });

  test("dado um left, então verifica erro", () => {
    const result: Either<Error, number> = left(new Error("erro pje"));
    expect(result.getLeft()).toBeInstanceOf(Error);
    expect(result.getRight()).toBeNull();
  });

  test("dado um left, então verifica mensagem de erro", () => {
    const result: Either<Error, number> = left(new Error("erro pje"));
    expect(result.getLeft().message).toBe("erro pje");
  });

  test("dado um fold right, então verifica callback chamado", () => {
    const rightFn = jest.fn();
    const leftFn = jest.fn();
    const result: Either<Error, number> = right(1);
    result.fold(leftFn, rightFn);
    expect(rightFn).toBeCalledTimes(1);
  });

  test("dado um fold left, então verifica callback chamado", () => {
    const rightFn = jest.fn();
    const leftFn = jest.fn();
    const result: Either<Error, number> = left(new Error("error"));
    result.fold(leftFn, rightFn);
    expect(leftFn).toBeCalledTimes(1);
  });

  test("dado um fold right que retorna um número, então verifica retorno do fold", async () => {
    const f = (): Either<Error, number> => right(1);
    const result: Either<Error, number> = f();
    const n = result.fold<number>(
      (err) => 0,
      (num) => 100
    );
    expect(n).toBe(100);
  });

  test("dado um fold left que retorna um número, então verifica retorno do fold", async () => {
    const f = (): Either<Error, number> => left(new Error());
    const result: Either<Error, number> = f();
    const n = result.fold<number>(
      (err) => 0,
      (num) => 100
    );
    expect(n).toBe(0);
  });
});
