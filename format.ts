export type FormatBracketKeys<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | FormatBracketKeys<Rest>
    : never;

type A = FormatBracketKeys<"Hello World!">; // never
type B = FormatBracketKeys<"Hello World!, {polee}">; // polee
type C = FormatBracketKeys<"Hello World!, {po}{lee}">; // po | lee

function format<T extends string, K extends Record<FormatBracketKeys<T>, any>>(
  originalString: T,
  params: K
): string {
  let result: string = originalString;

  for (let keyword in params) {
    result = result.replace(`{${keyword}}`, params[keyword]);
  }

  return result;
}

const original = "Hello World!, {po}{lee}";
const formattedString = format(original, { po: "sang", lee: "min" }); // Hello World!, sangmin
