import type { RemoveArray } from "./remove";

export type Overloads<A extends any[]> = A extends [infer A, ...infer L]
  ? [A] | [A, ...Overloads<L>] | []
  : [];

export type Curried<A extends any[], R extends any> = A extends [
  infer F,
  ...infer L
]
  ? <K extends Overloads<L>>(
      arg: F,
      ...args: K
    ) => Curried<RemoveArray<L, K>, R>
  : R;

function curriedFunction<A extends any[], R>(
  fn: (...args: A) => R
): Curried<A, R> {
  const curried = (...args: any[]): any => {
    if (args.length >= fn.length) {
      return fn(...(args as A));
    } else {
      return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    }
  };

  return curried as Curried<A, R>;
}

const exampleFunction = (a: number, b: string, c: boolean) =>
  `${a}, ${b}, ${c}`;

const curried = curriedFunction(exampleFunction);

const result1 = curried(42)("hello")(true); // "42, hello, true"
const result2 = curried(42, "hello")(true); // "42, hello, true"
const result3 = curried(42)("hello", true); // "42, hello, true"
const result4 = curried(42, "hello", true); // "42, hello, true"
